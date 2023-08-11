let buttonColours = ["red", "blue", "green", "yellow"];

let gamePattern = [];
let userClickedPattern = [];

let level = 0;
let started = false;

const nextSequence = () => {
  userClickedPattern = [];
  level++;
  $("#level-title").text(`Level ${level} `);
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  playSound(randomChosenColour);
  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
};

const playSound = (name) => {
  let music = `sounds/${name}.mp3`;
  let audio = new Audio(music);
  audio.play();
};

const animatePress = (currentElement, className) => {
  let element = $(currentElement);
  element.addClass(className);
  setTimeout(() => {
    element.removeClass(className);
  }, 200);
};

const startOver = () => {
  $("#level-title").text("Game Over, Press Any Key to Restart");
  playSound("wrong");
  animatePress("body", "game-over");
  gamePattern = [];
  level = 0;
  started = false;
};

const checkAnswer = (currentLevel) => {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (JSON.stringify(userClickedPattern) === JSON.stringify(gamePattern)) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    startOver();
  }
};

$(document).on("keypress", function (event) {
  if (!started) {
    nextSequence();
    started = true;
  }
});

$(".btn").on("click", function () {
  let userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress("#" + userChosenColour, "pressed");

  checkAnswer(userClickedPattern.length - 1);
});
