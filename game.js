// ! OPTIMIZE CODE FOR MOBILE AND TABLET
// ! DISPLAY LAST COLOUR OUTPUT WHEN USER FAILS

var userClickedPatterns = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var started = false;
var level = 0;
var LastSequenceColor;

// *lISTEN FOR KEYPRESS FROM THE KEYBOARD
// * This basically starts up the game

$(document).on("touchstart", function(e) {
  alert("YEP!");
});
$(document).keypress(function () {
  if (!started) {
    $("h1").removeClass("blink");
    $(".rules").addClass("invisible");
    $("#dg").removeClass("grid");
    $(".help").removeClass("invisible");
    $(".btn").removeClass("clickable");
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

//* LISTEN FOR CLICKS ON BUTTONS
$(".btn").on("click touchstart", function () {
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
      "Level " + level + "<br>" + "Game Over, Press Any Key to Restart"
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
