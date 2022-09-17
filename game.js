// ! OPTIMIZE CODE FOR MOBILE AND TABLET

var userClickedPatterns = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var started = false;
var level = 0;
var LastSequenceColor;

// *lISTEN FOR KEYPRESS FROM THE KEYBOARD AND ALSO TOUCH FROM TOUCHSCREEN DEVICES
// * This basically starts up the game
$("#level-title").on("click touchstart", function (event) {
  if (event.type == "touchstart") {
    $(this).off("keypress");
    console.log("Touch screen detected");
    if (!started) {
      $(".container").removeClass("invisible");
      $("h1").removeClass("blink");
      $(".rules").addClass("invisible");
      $("#dg").removeClass("grid");
      $(".help").removeClass("invisible");
      $(".btn").removeClass("clickable");
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  } else if (event.type == "click") {
    $(this).off("touchstart");
    console.log("Non-Touch screen detected");
    if (!started) {
      $(".container").removeClass("invisible");
      $("h1").removeClass("blink");
      $(".rules").addClass("invisible");
      $("#dg").removeClass("grid");
      $(".help").removeClass("invisible");
      $(".btn").removeClass("clickable");
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  }
});

//* LISTEN FOR CLICKS ON BUTTONS BY THE USERS
$(".btn").on("click", function () {
  var userChosenColor = $(this).attr("id");
  userClickedPatterns.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPatterns.length - 1);
});

//* CREATE RANDOM COLOUR PATTERNS (SIMON'S MOVES)
function nextSequence() {
  userClickedPatterns = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour)
    .fadeIn(300)
    .fadeOut(400)
    .fadeIn(300);
    playSound(randomChosenColour);
    LastSequenceColor = randomChosenColour;
}

// *VALIDATE CLICK SEQUENCE FROM USER
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPatterns[currentLevel]) {
    // console.log("success");
    if (userClickedPatterns.length === gamePattern.length) {
      setTimeout(function () {
        $("body").addClass("success");
      }, 100);
      setTimeout(function () {
        $("body").removeClass("success");
      }, 300);
      setTimeout(function () {
        nextSequence();
      }, 1100);
    }
  } else {
    console.log("WRONG");
    playSound("wrong");
    $("body").addClass("game-over");
    $("h1").removeClass("add-margin");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 300);
    $("#level-title").html(
      "Level " + level + "<br>" + "Game Over, Click Here to Restart"
    );
    $("h1").addClass("blink");
    showLastSequenceColor();
    gameOver();
  }
}

//* PLAY SOUND EFFECTS
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// * CREATE ANIMATION FOR CLICKS
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(() => {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

// * RESET GAME
function gameOver() {
  level = 0;
  gamePattern = [];
  started = false;
  $(".btn").addClass("clickable");
}
function showLastSequenceColor() {
  setTimeout(() => {
    $("#" + LastSequenceColor)
      .fadeIn(800)
      .fadeOut(600)
      .fadeIn(300)
      .fadeOut(300)
      .fadeIn(300)
      .fadeOut(300)
      .fadeIn(500);
  }, 600);
}
