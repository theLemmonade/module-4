var show = document.getElementById('show');
var timer = document.getElementById('timer');
var opening = document.getElementById('opening');
var start = document.getElementById('start');
var quiz = document.getElementById('quiz');
var title = document.getElementById('title');
var button0 = document.getElementById('0');
var button1 = document.getElementById('1');
var button2 = document.getElementById('2');
var button3 = document.getElementById('3');
var submission = document.getElementById('submission');
var initial = document.getElementById('initial').input;
var submit = document.getElementById('submit');
var scoreboard = document.getElementById('scoreboard');
var back = document.getElementById('back');
var clear = document.getElementById('clear');
var score = 0;
var current = 0;
var seconds = 80;

//question pool with correct answer value, expandible
var questionPool = [
  {question: "What does .css stand for?",
  answers: ["Concetrating Solar Solenoid", "Cascading Style Sheet", "Cat Super Star", "Cell Shaded Stats"],
  correct: 1,
  },
  {question: "question content goes here",
  answers: ["answer1", "answer2", "answer3", "answer4"],
  correct: 0,
  },
  {question: "question content goes here",
  answers: ["answer1", "answer2", "answer3", "answer4"],
  correct: 0,
  },
  {question: "question content goes here",
  answers: ["answer1", "answer2", "answer3", "answer4"],
  correct: 0,
  },
  {question: "question content goes here",
  answers: ["answer1", "answer2", "answer3", "answer4"],
  correct: 0,
  },
]

//stage .css display attributes
quiz.setAttribute("style", "display:none");
submission.setAttribute("style", "display:none");
scoreboard.setAttribute("style", "display:none");

//timer, with gameover functionality
function runTimer() {
    var timerInterval = setInterval (function() {
        seconds--;
        timer.textContent = seconds;
        if(seconds === 0) {
          console.log('Time out!');
          score = 0;
          clearInterval(timerInterval);
          quiz.setAttribute("style", "display:none");
          submission.setAttribute("style", "display:block");
        };
    }, 1000);
};

//determines quiz progress and ends quiz with final question
function runQuiz() {
  if (current === 0) {
    console.log("Begin quiz with " + seconds + " seconds left.");
    opening.setAttribute("style", "display:none");
    quiz.setAttribute("style", "display:block");
    runTimer();
    drawQuiz();
  } else if (current === questionPool.length) {
    console.log("You won! Your score is " + seconds + ".");
    score = seconds;
    quiz.setAttribute("style", "display:none");
    submission.setAttribute("style", "display:block");
  } else {
    drawQuiz();
  };
};

//draws the current question and answers from question pool
function drawQuiz() {
  console.log("Cycling question, current place is " + current + " out of " + questionPool.length + ".")
  var currentQ = questionPool[current].question;
  var currentA = questionPool[current].answers;
  title.textContent = currentQ;
  button0.textContent = currentA[0];
  button1.textContent = currentA[1];
  button2.textContent = currentA[2];
  button3.textContent = currentA[3];
};

//decriment time for incorrect answer choice
function gradeQuiz() {
  var choice = this.getAttribute("id");
  console.log("User selected " + choice +", checking answer.");
  correct = questionPool[current].correct;
  if (choice == correct) {
    console.log("Answer correct, cycling question");
    current++;
  } else {
    console.log("Answer incorrect, deducting time, cycling question.");
    seconds -= 10;
    current++;
  };
  runQuiz();
};

//Submit initals and score to local storage
function submitScore(){
  console.log("Submitting initials and score to scoreboard.")
  submission.setAttribute("style", "display:none");
  scoreboard.setAttribute("style", "display:block");
};

//Draw scoreboard from local storage
function drawScore() {
};

//Clear local storage and scoreboard
function clearScore() {
};

//Reset quiz
function reset() {
  scoreboard.setAttribute("style", "display:none");
  opening.setAttribute("style", "display:block");
  score = 0;
  current = 0;
  seconds = 80;
};

//Navigate quiz
start.addEventListener("click", runQuiz);
button0.addEventListener("click", gradeQuiz);
button1.addEventListener("click", gradeQuiz);
button2.addEventListener("click", gradeQuiz);
button3.addEventListener("click", gradeQuiz);
submit.addEventListener("click", submitScore);
back.addEventListener("click", reset);
clear.addEventListener("click", clearScore);