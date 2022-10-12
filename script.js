var timer = document.getElementById('timer');
var opening = document.getElementById('opening');
var start = document.getElementById('start');
var quiz = document.getElementById('quiz');
var questionEl = document.getElementById('question');
var buttons = document.getElementsByClassName('answer')
var submit = document.getElementById('submit');
var scoreboard = document.getElementById('scoreboard');
var current = 0;
var secondsleft = 80;

// Question pool
var questionPool = [
  {question: "question content goes here",
  answers: ["answer1", "answer2", "answer3", "answer 4"],
  correct: "answer3",
  },
  {question: "question content goes here",
  answers: ["answer1", "answer2", "answer3", "answer 4"],
  correct: "answer1",
  },
  {question: "question content goes here",
  answers: ["answer1", "answer2", "answer3", "answer 4"],
  correct: "Answer4"
  },
  {question: "question content goes here",
  answers: ["answer1", "answer2", "answer3", "answer 4"],
  correct: "Answer3"
  },
  {question: "question content goes here",
  answers: ["answer1", "answer2", "answer3", "answer 4"],
  correct: "answer1",
  },
]

// Stage HTML display attribute
quiz.setAttribute("style", "display:none");
submit.setAttribute("style", "display:none");
scoreboard.setAttribute("style", "display:none");

// Timer
function runTimer() {
    var timerInterval = setInterval (function() {
        secondsleft--;
        timer.textContent = secondsleft;
        if(secondsleft ===0) {
            clearInterval(timerInterval);
        }
    }, 1000);
};
 
// Quiz
function beginQuiz(){
  opening.setAttribute("style", "display:none");
  quiz.setAttribute("style", "display:grid");
  runTimer();
  console.log("Begin quiz with " + secondsleft + " seconds.")  
    function loadQuestion(){
        var currentQuestion = questionPool[current].question;
        questionEl.innerHTML = '';
        questionEl.innerHTML = currentQuestion;
      };
    function loadAnswer(){
        var currentAnswers = questionPool[current].answers
        for (var i = 0; i < currentAnswers.length -1; i += 1) {
          buttons[i].textContent = currentAnswers[i];
          buttons[i].addEventListener("click", checkAnswer(i));
        };
      };
      loadQuestion();
      loadAnswer();
    function checkAnswer(i){
          var choice = questionPool[current].answers[i],
              correct = questionPool[current].correct;
          if (choice === correct) {
            timePenalty(true);             
          } else {
            timePenalty(false);                        
          };  
          if (current < questionPool.length - 1) {
            console.log("Cycling question");
            current += 1;
            loadQuestion(current);
            loadAnswer(current);
          } else {
            quiz.setAttribute("style", "display:none");
            submit.setAttribute("style", "display:block")
            console.log("Game over");
          };                  
        };
      function timePenalty(bool) {
        if (!bool) {
            timer -= 10
        };
      };
    };

  
start.addEventListener("click", beginQuiz);
