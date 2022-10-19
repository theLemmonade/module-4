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
var initial = document.getElementById('initial');
var submit = document.getElementById('submit');
var scoreboard = document.getElementById('scoreboard');
var history = JSON.parse(localStorage.getItem("history")) || [];
var board = document.getElementById('board');
var back = document.getElementById('back');
var clear = document.getElementById('clear');
var username = ""
var score = 0;
var current = 0;
var seconds = 80;

//question pool with correct answer value, expandible
var pool = [
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
  } else if (current === pool.length) {
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
  console.log("Cycling question, current place is " + current + " out of " + pool.length + ".")
  var currentQ = pool[current].question;
  var currentA = pool[current].answers;
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
  correct = pool[current].correct;
  if (choice == correct) {
    console.log("Answer correct, cycling question");
    current++;
  } else {
    console.log("Answer incorrect, deducting 10 seconds, cycling question.");
    seconds -= 10;
    current++;
  };
  runQuiz();
};

//submit initals and score to local storage
function submitScore() {
  if (initial.value === "") {
    initial.setAttribute("placeholder", "Enter your initials");
  } else {
    username = initial.value.trim();
    var currentScore = {
      username : username,
      score : score
    };
    history.push(currentScore);
    localStorage.setItem("history", JSON.stringify(history));
    console.log("Submitting initials " + username + " and score " + score + " to the scoreboard.");
    submission.setAttribute("style", "display:none");
    scoreboard.setAttribute("style", "display:block");
  };
};

//draw scoreboard from local storage
function drawScore() {
  board.appendChild(history);
};

//reset quiz
function reset() {
  initial.setAttribute("placeholder", "");
  scoreboard.setAttribute("style", "display:none");
  opening.setAttribute("style", "display:block");
  username = "";
  score = 0;
  current = 0;
  seconds = 80;
};

//navigate quiz
start.addEventListener("click", runQuiz);
button0.addEventListener("click", gradeQuiz);
button1.addEventListener("click", gradeQuiz);
button2.addEventListener("click", gradeQuiz);
button3.addEventListener("click", gradeQuiz);
submit.addEventListener("click", submitScore, drawScore);
clear.addEventListener("click", localStorage.clear());
back.addEventListener("click", reset);