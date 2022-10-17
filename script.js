var timer = document.getElementById('timer');
var opening = document.getElementById('opening');
var start = document.getElementById('start');
var quiz = document.getElementById('quiz');
var question = document.getElementById('question');
var buttons = document.getElementById('answers')
var initial = document.getElementById('initial').input
var submit = document.getElementById('submit');
var back = document.getElementById('back');
var clear = document.getElementById('clear');
var scoreboard = document.getElementById('scoreboard');
var current = 0;
var score = 0;
var seconds = 80;
//question pool
var questionPool = [
  {question: "What does .css stand for?",
  answers: ["Concetrating Solar Solenoid", "Cascading Style Sheet", "Cat Super Star", "Cell Shaded Stats"],
  correct: "Cascading Style Sheet",
  },
  {question: "question content goes here",
  answers: ["answer1", "answer2", "answer3", "answer4"],
  correct: "answer1",
  },
  {question: "question content goes here",
  answers: ["answer1", "answer2", "answer3", "answer4"],
  correct: "Answer4"
  },
  {question: "question content goes here",
  answers: ["answer1", "answer2", "answer3", "answer4"],
  correct: "Answer3"
  },
  {question: "question content goes here",
  answers: ["answer1", "answer2", "answer3", "answer4"],
  correct: "answer1",
  },
]
//stage .css display attributes
quiz.setAttribute("style", "display:none");
submit.setAttribute("style", "display:none");
scoreboard.setAttribute("style", "display:none");
//timer
function runTimer() {
    var timerInterval = setInterval (function() {
        seconds--;
        timer.textContent = seconds;
        if(seconds === 0) {
            clearInterval(timerInterval);
        }
    }, 1000);
};
//launch quiz
function runQuiz() {
  console.log("Begin quiz with " + seconds + " seconds left.")  
  opening.setAttribute("style", "display:none");
  quiz.setAttribute("style", "display:block");
  runTimer();
  if (seconds === 0) {
    console.log('Time out!');
    score = "0";
    clearInterval(timerInterval);
    quiz.setAttribute("style", "display:none");
    submit.setAttribute("style", "display:block");
  } else if (current === 5){
    console.log('You won! Your score is ' + seconds);
    secondsleft = score;
    clearInterval(timerInterval);
    quiz.setAttribute("style", "display:none");
    submit.setAttribute("style", "display:block");
  } else {
    for (var i = 0; i < questionPool.length; i++) {
      var current = questionPool[i];






      


    }
  }




  document.getElementById("start").addEventListener("click", runQuiz);

  // if (secondsleft > 0) {
//   console.log("Begin quiz with " + secondsleft + " seconds.")  
//     function loadQuestion(){
//         var currentQuestion = questionPool[current].question;
//         questionEl.innerHTML = '';
//         questionEl.innerHTML = currentQuestion;
//         var currentAnswers = questionPool[current].answers;
//         for (var i = 0; i <= currentAnswers.length -1; i += 1) {
//           buttons[i].textContent = currentAnswers[i];
//           buttons[i].addEventListener("click", checkAnswer);
//         };
//       };
//       loadQuestion();
//     function checkAnswer(){
//           var choice = questionPool[current].answers[i],
//               correct = questionPool[current].correct;
//           if (choice === correct) {
//             timePenalty(true);             
//           } else {
//             timePenalty(false);                        
//           };  
//           if (current < questionPool.length - 1) {
//             console.log("Cycling question");
//             current += 1;
//             loadQuestion(current);
//           } else {
//             quiz.setAttribute("style", "display:none");
//             submit.setAttribute("style", "display:block")
//             console.log("Game over");
//           };                  
//         };
//       function timePenalty(bool) {
//         if (!bool) {
//             timer -= 10
//         };
//       };
//     };

// //Add score to local storage
// function submitScore(){
//   submit.setAttribute("style", "display:none");
//   scoreboard.setAttribute("style", "display:block");
// }

// //Reset Quiz
// function reset(){
//   scoreboard.setAttribute("style", "display:none");
//   opening.setAttribute("style", "display:block");
// }

// //Navigate pages
// start.addEventListener("click", beginQuiz);
// submit.addEventListener("click", submitScore());
// back.addEventListener("click", reset());