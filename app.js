
let quiz = [{
  "question": "When during product development is it best to start obtaining user input?",
  "choices": ["Requirements definition", "Prototyping", "Implementation", "Testing"],
  "correct": "Requirements definition"
}, {
    "question": "When testing designs with users, who should you use?",
    "choices": ["Management", "Family and friends", "The most critical users", "Typical users"],
    "correct": "Typical users"
}, {
    "question": "Which three measures are needed to establish how usable a product is?",
    "choices": ["Product Responsiveness, Stability and Consistency", "User Effectiveness, Efficiency and Satisfaction", "Style guide conformance, Fault tolerance, Size of manual", "User Happiness, Competence, Motivation"],
    "correct": "User Effectiveness, Efficiency and Satisfaction"
}, {
  "question": "What is most important when developing easy-to-use products?",
  "choices": ["Understanding the users and their tasks", "Following the style guide", "Making interfaces as consistent as possible", "Using object-oriented development tools"],
  "correct": "understanding the user and their tasks"
}, {
    "question": "Which of the following is most important in user-centred design?",
    "choices": ["An object-oriented development process", "Iterative design and user testing", "Regular design demonstrations", "Including every function each user wants"],
    "correct": "Iterative design and user testing"
}];


// define elements
let content = $("content"),
  questionContainer = $("question"),
  choicesContainer = $("choices"),
  scoreContainer = $("score"),
  submitBtn = $("submit");

// init vars
let currentQuestion = 0,
  score = 0,
  askingQuestion = true;

function $(id) { // shortcut for document.getElementById
  return document.getElementById(id);
}

function askQuestion() {
  let choices = quiz[currentQuestion].choices,
    choicesHtml = "";

  // loop through choices, and create radio buttons
  for (let i = 0; i < choices.length; i++) {
    choicesHtml += "<input type='radio' name='quiz" + currentQuestion +
      "' id='choice" + (i + 1) +
      "' value='" + choices[i] + "'>" +
      " <label for='choice" + (i + 1) + "'>" + choices[i] + "</label><br>";
  }

  // load the question
  questionContainer.textContent = "Q" + (currentQuestion + 1) + ". " +
    quiz[currentQuestion].question;

  // load the choices
  choicesContainer.innerHTML = choicesHtml;

  // setup for the first time
  if (currentQuestion === 0) {
    scoreContainer.textContent = "Score: 0 right answers out of " +
      quiz.length + " possible.";
    submitBtn.textContent = "Submit Answer";
  }
}

function checkAnswer() {
  // are we asking a question, or proceeding to next question?
  if (askingQuestion) {
    submitBtn.textContent = "Next Question";
    askingQuestion = false;

    // determine which radio button they clicked
    let userpick,
      correctIndex,
      radios = document.getElementsByName("quiz" + currentQuestion);
    for (let i = 0; i < radios.length; i++) {
      if (radios[i].checked) { // if this radio button is checked
        userpick = radios[i].value;
      }

      // get index of correct answer
      if (radios[i].value == quiz[currentQuestion].correct) {
        correctIndex = i;
      }
    }

    // setup if they got it right, or wrong
    let labelStyle = document.getElementsByTagName("label")[correctIndex].style;
    labelStyle.fontWeight = "bold";
    if (userpick == quiz[currentQuestion].correct) {
      score++;
      labelStyle.color = "green";
    } else {
      labelStyle.color = "red";
    }

    scoreContainer.textContent = "Score: " + score + " right answers out of " +
      quiz.length + " possible.";
  } else { // move to next question
    // setting up so user can ask a question
    askingQuestion = true;
    // change button text back to "Submit Answer"
    submitBtn.textContent = "Submit Answer";
    // if we're not on last question, increase question number
    if (currentQuestion < quiz.length - 1) {
      currentQuestion++;
      askQuestion();
    } else {
      showFinalResults();
    }
  }
}

function showFinalResults() {
  content.innerHTML = "<h2>You've completed the quiz!</h2>" +
    "<h2>Below are your results:</h2>" +
    "<h2>" + score + " out of " + quiz.length + " questions, " +
    Math.round(score / quiz.length * 100) + "%<h2>";
}

window.addEventListener("load", askQuestion, false);
submitBtn.addEventListener("click", checkAnswer, false);
