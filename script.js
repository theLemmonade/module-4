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
var board = document.getElementById('board');
var back = document.getElementById('back');
var clear = document.getElementById('clear');
var username = String;
var score = Number;
var current = Number;
var seconds = Number;
var win = Boolean;

//question pool with correct answer value, expandible
var pool = [
  {question: "What does .css stand for?",
  answers: ["Concetrating Solar Solenoid", "Cascading Style Sheet", "Cat Super Star", "Cell Shaded Stats"],
  correct: 1,
  },
  {question: "Inside which HTML element do we put the JavaScript?",
  answers: ["<scripting>", "<javascript>", "<script>", "<js>"],
  correct: 2,
  },
  {question: "How do you write an IF statement in JavaScript?",
  answers: ["if i == 5 then", "if i could only", "if (i == 5) {}", "var i = 5"],
  correct: 2,
  },
  {question: "How do you add line comments in JavaScript",
  answers: ["//comment", "<!--comment-->", "'comment'", "<s>comment</s>"],
  correct: 0,
  },
  {question: "How do you add a button using HTML",
  answers: ["<b>", "<button>", "!button", "isButton = true"],
  correct: 1,
  },
]

//timer
function runTimer() {
    var timerInterval = setInterval (function() {
        seconds--;
        timer.textContent = seconds;
        if (seconds < 10) {
          feedback.textContent = "Hurry up, ten seconds on the clock!";
        } 
        if ((seconds === 0) || (win === true)) {
          clearInterval(timerInterval);
          endQuiz();
        };
    }, 1000);
};

//determines quiz progress and end point
function runQuiz() {
  if (current === 0) {
    console.log("Begin quiz with " + seconds + " seconds left.");
    opening.setAttribute("style", "display:none");
    quiz.setAttribute("style", "display:block");
    runTimer();
    drawQuiz();
  } else if (current === pool.length) {
    win = true;
    quiz.setAttribute("style", "display:none");
    submission.setAttribute("style", "display:block");
  } else {
    drawQuiz();
  };
};

//draws the current question and answers from question pool
function drawQuiz() {
  console.log("Cycling question, current place is " + current + " out of " + pool.length + " question(s).")
  var currentQ = pool[current].question;
  var currentA = pool[current].answers;
  title.textContent = currentQ;
  button0.textContent = currentA[0];
  button1.textContent = currentA[1];
  button2.textContent = currentA[2];
  button3.textContent = currentA[3];
};

//decriment time for incorrect answer choice, cycle question
function gradeQuiz() {
  var choice = this.getAttribute("id");
  console.log("User selected " + choice +", checking answer.");
  correct = pool[current].correct;
  if (choice == correct) {
    console.log("Answer correct, cycling question.");
    feedback.textContent = "Correct!"
    current++;
  } else {
    console.log("Answer incorrect, decrimenting 10 seconds, cycling question.");
    feedback.textContent = "Incorrect, decrementing 10 seconds."
    seconds -= 10;
    current++;
  };
  runQuiz();
};

function endQuiz() {
  if (win === false) {
    console.log("Game over!");
    score = 0;
    quiz.setAttribute("style", "display:none");
    submission.setAttribute("style", "display:block");
  } else {
    console.log("User won! The score is " + seconds + ".");
    score = seconds;
    quiz.setAttribute("style", "display:none");
    submission.setAttribute("style", "display:block");
    document.getElementById("score").textContent = score
  };
};

//submit initals and score to local storage
function submitScore() {
  if (initial.value === "") {
    initial.setAttribute("placeholder", "Enter your initials");
  } else {
    username = initial.value.trim();
    console.log("Submitting initials " + username + " and score " + score + " to the scoreboard.");
    var currentScore = {
      username : username,
      score : score
    };
    localStorage.setItem("score", JSON.stringify(currentScore));
    submission.setAttribute("style", "display:none");
    scoreboard.setAttribute("style", "display:block");
  };
};

//draw scoreboard from local storage 
function drawScore() {

};


function clearScore() {
  localStorage.clear();
};

//reset quiz to initial state
function stage() {
  console.log("Staging.")
  opening.setAttribute("style", "display:block");
  quiz.setAttribute("style", "display:none");
  submission.setAttribute("style", "display:none");
  scoreboard.setAttribute("style", "display:none");
  feedback.textContent = ""
  initial.setAttribute("placeholder", "");
  username = "";
  score = 0;
  current = 0;
  seconds = 60;
  win = false;
  timer.textContent = 60;
};

//navigate
start.addEventListener("click", runQuiz);
button0.addEventListener("click", gradeQuiz);
button1.addEventListener("click", gradeQuiz);
button2.addEventListener("click", gradeQuiz);
button3.addEventListener("click", gradeQuiz);
submit.addEventListener("click", submitScore);
submit.addEventListener("click", drawScore);
clear.addEventListener("click", clearScore);
back.addEventListener("click", stage)

//initialize
stage();