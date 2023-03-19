var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameOver = true;
var level = 0;

function nextSequence() {
  var randomChosenColor = buttonColors[Math.floor(Math.random() * 4)];
  gamePattern.push(randomChosenColor);
  level++;
  $("h1").text("Level " + level);
  animateSequence();
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
    console.log(userClickedPattern);
  }

  if (userClickedPattern.length === gamePattern.length) {
    nextSequence();
    userClickedPattern = [];
    console.log(userClickedPattern);
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
    nextSequence();
    gameOver = false;
  }
});


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }