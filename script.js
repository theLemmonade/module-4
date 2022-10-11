var timer = document.getElementById('timer')[0];
var opening = document.getElementsByClassName('opening')[0];
var quiz = document.getElementsByClassName('quiz')[0];
var questionEl = document.getElementById('question')[0];
var submit = document.getElementsByClassName('submit')[0];
var scoreboard = document.getElementsByClassName('scoreboard')[0];
var hidden = "";
var current = 0;
var secondsleft = 80;

questionPool = {
    'Question 1':['Answer A','Answer B','Asnwer C','Asnwer D',0],
    'Question 2':['Answer A','Answer B','Asnwer C','Asnwer D',0],
    'Question 3':['Answer A','Answer B','Asnwer C','Asnwer D',0],
    'Question 4':['Answer A','Answer B','Asnwer C','Asnwer D',0],
    'Question 5':['Answer A','Answer B','Asnwer C','Asnwer D',0]
};

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
    function hideElement();{
        const stream = document.getElementsByClassName('opening','submit','scoreboard')[0];
        stream.style.visibility = 'hidden';
    };
    function loadQuestion(){
        var question = Object.keys(questionPool)[curr];
        questionEl.innerHTML ='';
        questionEl.innerHTML = question;
    };
    function loadAnswer();{
        var answer = questionPool[Object.keys(questionPool)[curr]];
        answerEl.innerHTML='';
        for (var i = 0; i < answer.length -1; i += 1) {
            var addAnswer = document.createElement('div'),
            option = document.createTextNode(answer[i]);
            addAnswer.appendChild(option);
            addAnswer.addEventListener("click", checkAnswer(i, answer));
            answerEl.appendChild(addAnswer);
        };
    };
    function checkAnswer(i, arr) {
        return function () {
          var choice = i,
              correct = arr[arr.length-1];
          if (choice === correct) {
            timePenalty(true);             
          } else {
            timePenalty(false);                        
          };  
          if (current < Object.keys(questionPool).length -1) {
            current += 1;
            loadQuestion(current);
            loadAnswer(current);
          } else {
            questionEl.innerHTML = 'Done';
            answerEl.innerHTML = '';
          };                  
        };
      };
      function timePenalty(bool) {
        if (!bool) {
            timer--
        }
      }
      loadQuestion(current);
      loadAnswer(current);
    };