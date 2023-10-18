var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;
var levels = 0;

$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  console.log(levels);
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  console.log("current level: " + level);
  if (level > 10) {
    playSound("finish");
    $("body").addClass("game-finish");
    $("#level-title").text("Congratulations!, Press Any Key to Restart");

    setTimeout(function () {
      $("body").removeClass("game-finish");
    }, 1000);

    startOver();
  } else {
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);

    //check logic for duplicate
    for (i = 0; i < gamePattern.length; i++) {
      if (gamePattern[i] === buttonColours[randomNumber]) {
        console.log("gamepatern true");
      }
      console.log(`${i} rannum ` + randomNumber);
      console.log(`${i} button ` + buttonColours[randomNumber]);
      console.log(`${i} random ` + gamePattern[i]);
      console.log(gamePattern.length);
    }

    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour)
      .fadeIn(100)
      .fadeOut(100)
      .fadeIn(100);
    playSound(randomChosenColour);
  }
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".wav");
  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
