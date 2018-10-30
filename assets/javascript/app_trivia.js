$("#startBtn").on("click", function() {

  $("#startBtn").css("display", "none");
  startGame();
  var timeLeft = 45;
  var elem = document.getElementById('time-div');

  var timerId = setInterval(countdown, 1000);

  function countdown() {
    if (timeLeft == 0) {
      clearTimeout(timerId);
      showResults();
    } else {
      elem.innerHTML = timeLeft + ' seconds remaining';
      timeLeft--;
    }
  }

});

var quizContainer = document.getElementById('quiz');

function startGame() {
    // we'll need a place to store the HTML output
    var output = [];
  
    // for each question...
    myQuestions.forEach(
      (currentQuestion, questionNumber) => {
  
        // we'll want to store the list of answer choices
        var answers = [];
  
        // and for each available answer...
        for(letter in currentQuestion.answers){
  
          // ...add an HTML radio button
          answers.push(
            `<label>
              <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
            </label>`
          );
        }
  
        // add this question and its answers to the output
        output.push(
          `<div class="question"> ${currentQuestion.question} </div> <br>
          <div class="answers"> ${answers.join('')} </div> <br>`

        );
      }
    
    );
    output.push("<br>" + "<button class='submit'>Submit!</button>");

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join('');
  }


var myQuestions = [
  {
  "question" : "What is the capital of British Columbia?",
  "answers" : {
    a : "Vancouver",
    b : "Victoria",
    c : "Kelowna"
    },
  "correctAns" : "b"
  },

  {
    "question" : "What is the capital of Ontario?",
    "answers" : {
      a : "Toronto",
      b : "Ottawa",
      c : "London"
      },
    "correctAns" : "a"
  },

  {
    "question" : "What is the capital of Saskatchewan?",
    "answers" : {
      a : "Prince Albert",
      b : "Saskatoon",
      c : "Regina"
      },
    "correctAns" : "c"
  },

  {
    "question" : "What is the capital of Alberta?",
    "answers" : {
      a : "Calgary",
      b : "Edmonton",
      c : "Regina"
      },
    "correctAns" : "b"
  },

  {
    "question" : "What is the capital of Quebec?",
    "answers" : {
      a : "Montreal",
      b : "Ottawa",
      c : "Quebec City"
      },
    "correctAns" : "c"
  }
]

var numCorrect = 0;
var numIncorrect = 0;
var numUnanswered = 0;

function showResults() {

  // gather answer containers from our quiz
  var answerContainers = quizContainer.querySelectorAll('.answers');

  // for each question...
  myQuestions.forEach( (currentQuestion, questionNumber) => {

    // find selected answer
    var answerContainer = answerContainers[questionNumber];
    var selector = 'input[name=question'+questionNumber+']:checked';
   // var unSelected = 'input[name=question'+questionNumber+']:unchecked';
    var userAnswer = (answerContainer.querySelector(selector) || {}).value;
    // var userNoAnswer = (answerContainer.querySelector(unSelected) || {}).value;
    
    // if no answer is provided
    if (userAnswer==null) {
      numUnanswered++;
      answerContainers[questionNumber].style.color = 'grey';
    }
  
    // if answer is correct
    else if(userAnswer===currentQuestion.correctAns){
      // add to the number of correct answers
      numCorrect++;
      // color the answers green
      answerContainers[questionNumber].style.color = 'lightgreen';

    // if answer is wrong
    } else {

      numIncorrect++;
      // color the answers red
      answerContainers[questionNumber].style.color = 'red';
      
    } 
    
  });

  // Clear the page 
  $("#time-div").css("display", "none");
  $("#quiz").css("display", "none");
  // show number of correct answers out of total
  resultsContainerYes.innerHTML = 'Correctly answered: ' + numCorrect;
  resultsContainerNo.innerHTML = 'Incorrectly answered: ' + numIncorrect;
  resultsContainerUn.innerHTML = 'Unanswered questions: ' + numUnanswered;
}

$(document).on("click", ".submit", showResults);


