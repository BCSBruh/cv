var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameOver = true;
var level = 0;
var counter = 0;

function nextSequence() {
  if (!gameOver) {
    var randomChosenColor = buttonColors[Math.floor(Math.random() * 4)];
    gamePattern.push(randomChosenColor);
    level++;
    $("h1").text("Level " + level);
    animateSequence();
    counter = 0;
  }
}

async function animateSequence() {
  for (i = 0; i < gamePattern.length; i++) {
    await sleep(1000);
    pressButton(gamePattern[i]);
    playSound(gamePattern[i]);
  }
}

$(".btn").on("click", function (event) {
  if (userClickedPattern.length < gamePattern.length) {
    var userChosenColor = this.id;
    pressButton(userChosenColor);
    playSound(userChosenColor);
    userClickedPattern.push(userChosenColor);
    var isValid = checkAnswer(userClickedPattern, gamePattern, counter);
    if (isValid === false) {
      gameIsOver();
      console.log(isValid);
    }
    counter++;
  }

  if (userClickedPattern.length === gamePattern.length) {
    nextSequence();
    userClickedPattern = [];
  }
});

function playSound(name) {
  $("audio#" + name + "-audio")[0].play();
}

function pressButton(name) {
  $("#" + name)
    .fadeOut(100)
    .fadeIn(100);
}

$(document).on("keydown", function () {
  if (gameOver) {
    gameOver = false;
    nextSequence();
  }
});

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function checkAnswer(userArr, gameArr, counter) {
  if (userArr[counter] === gameArr[counter]) {
    return true;
  } else {
    return false;
  }
}

async function gameIsOver() {
  gameOver = true;
  gamePattern = [];
  userClickedPattern = [];
  playSound("wrong");

  $("#level-title").text("Game Over. Press any key to restart");

  $("body").addClass("game-over");
  await sleep(200);
  $("body").removeClass("game-over");
  level = 0;
  counter = 0;
}
