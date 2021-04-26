var questionArray = [
  {
    question: "Is Soccer the most popular sport in the world?",
    choices: ["True", "False", "maybe", "no"],
    answer: "True",
  },
  {
    question: "What is the number of players in 1 team?",
    choices: ["8", "10", "14", "11"],
    answer: "11",
  },
  {
    question: "Which is Worse?",
    choices: ["Red Card", "Yellow Card"],
    answer: "Red Card",
  },
  {
    question: "How long is each half of the game? (Minutes)",
    choices: ["30", "60", "45"],
    answer: "45",
  },
  {
    question: "What size ball is used in professional soccer matches",
    choices: ["6", "5", "1", "4"],
    answer: "5",
  },
];

var quizstart = document.getElementById("quiz-start");
var timer = document.getElementById("time");
var questionEl = document.getElementById("question");
var choicesEl = document.querySelectorAll(".choice");
var highscore = document.getElementById("high-score");
var score = document.getElementById("score");
var restart = document.getElementById("restart");
var timerInterval;

var correctQuestion = 0;
var name = [];
var countdown = 60;
var currentQ = 0;

function startQuiz() {
  // questions.textContent = questionArray;
  timerStarts();
  populateQuestion();
}
var choices = questionArray[0].answer[0];

function timerStarts() {
  var timeInterval = setInterval(function () {
    countdown--;
    timer.textContent = countdown;

    if (countdown <= 0) {
      clearInterval(timeInterval);
      countdown = 0;
      timer.textContent = countdown;
      gameOver();
    }
  }, 1000);
}
function gameOver() {
  restart.addEventListener("click", function () {
    location.reload();
  });
}

function populateQuestion() {
  questionEl.textContent = questionArray[currentQ].question;

  choicesEl.forEach((element, i) => {
    element.textContent = questionArray[currentQ].choices[i];
    element.addEventListener("click", checkAnswerAndIterate);
  });
}

function checkAnswerAndIterate(e) {
  console.log(e.target.textContent);
  if (e.target.textContent !== questionArray[currentQ].answer) {
    countdown -= 10;
    console.log("WRONG");
  } else {
    clearInterval(timerInterval);
    var name = prompt("enter name");
    console.log(name);
    if (countdown < 0) {
      countdown = 0;
    }
  }
  currentQ++;
  localStorage.getItem(name, JSON.stringify(countdown));
  populateQuestion();
}

function score() {
  var scores = [];
  if (localStorage.getItem("highscore")) {
    scores.push(name, scores);
    scores = JSON.parse(localStorage.getItem(highscore));
  }
}

quizstart.addEventListener("click", function () {
  startQuiz();
});

highscore.addEventListener("click", function () {
  var lastScore = JSON.stringify(localStorage.getItem(score));
  lastScore.textContent = "";
});
