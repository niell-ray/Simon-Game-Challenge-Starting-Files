var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var toggleGame = true;
var level = 0;

//listen to keyboard presses for the 1st time to start game
$(document).keypress(function(){
  if (toggleGame === true){
    $("#level-title").text("level "+level);
    nextSequence();
    toggleGame = false;
  }
});

//will trigger the function only when "btn" is clicked
$(".btn").click(function(){

  //fetches the color of the button that is clicked
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  //plays  the sound of the button which is clicked
  playSound(userChosenColour);
  animatePress(userChosenColour);

  //calling checkPattern after user has clicked and chosen their answer and passing in the index of the last answer
  checkPattern(userClickedPattern.length-1);
});


function nextSequence(){

  //clearing the array after each level
  userClickedPattern = [];

  //increasing the level by 1 each time the user gets the sequence correct
  level++;
  $("#level-title").text("level " + level);

  //creating random numbers from 0 - 3
  var randomNumber = Math.floor(Math.random() * 4);

  //choosing colors according to the random number produced
  var randomChosenColor = buttonColors[randomNumber];

  //pushing the random color into gamePattern array
  gamePattern.push(randomChosenColor);

  //flash animation effect when clicked
  $("#"+randomChosenColor).fadeOut(100).fadeIn(100);

  //playing sound of the button which is randomly chosen
  playSound(randomChosenColor);
}


function playSound(name){
  //playing audio when btn is clicked
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}


//function to create animation
function animatePress(currentColor){

  //adding "pressed" class to the pressed button
  $("#"+currentColor).addClass("pressed");

  //function to trigger the function after a delay of 100 milisec
  setTimeout(function(){
    $("#"+currentColor).removeClass("pressed");}, 100);
}

// function to check the answer
function checkPattern(currentLevel){

  //checking the recent answer
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    console.log("success");

    //checking whether the length of the sequence is equal or not
    if (userClickedPattern.length === gamePattern.length){

    //running the nextSequence again when the recent clicked pattern and the number of clicks is ok
    setTimeout(function(){
      nextSequence();
    }, 1000);
    }

  }

  else {
    //playing the "wrong.mp3" each time the user presses a wrong button
    var wrongSound = new Audio("sounds/wrong.mp3");
    wrongSound.play();
    //changing the title when the user presses a wrong button
    $("#level-title").text("game-over, press any key to restart game.");

    //adding the game-over effect when user presses a wrong button
    $("body").addClass("game-over");

    //removing the game-over effect after 200 milisec when user presses a wrong button
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);

    console.log("wrong");
    startOver();
  }
}

//function to reset the variables 
function startOver(){
  level = 0;
  gamePattern = [];
  toggleGame = true;
}
