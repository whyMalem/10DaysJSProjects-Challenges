const quizData = [
  {
    question: "What is the most used programming language in 2021?",
    a: "Java",
    b: "C",
    c: "Python",
    d: "JavaScript",
    correct: "d",
  },
  {
    question: "Name the person who developed the Javascript first?",
    a: "Tim Berners-Lee",
    b: "Guido van Rossum",
    c: "Ivan Saldano",
    d: "Brendan Eich",
    correct: "d",
  },
  {
    question: "What does HTML stand for?",
    a: "Hypertext Markup Language",
    b: "Cascading Style Sheet",
    c: "Jason Object Notation",
    d: "Helicopters Terminals Motorboats Lamborginis",
    correct: "a",
  },
  {
    question: "What year was JavaScript launched?",
    a: "1996",
    b: "1995",
    c: "1994",
    d: "none of the above",
    correct: "b",
  },
];

const question = document.querySelector(".question");
const quiz = document.querySelector(".quiz-container");
const selected = document.querySelectorAll(".selected");
const option_a = document.getElementById("option_a");
const option_b = document.getElementById("option_b");
const option_c = document.getElementById("option_c");
const option_d = document.getElementById("option_d");
const submit = document.querySelector(".submit");

let currentQuiz = 0;
loadQuiz();

function loadQuiz() {
  let currentQuestion = quizData[currentQuiz];

  deSelect();

  question.innerText = currentQuestion.question;
  option_a.innerText = currentQuestion.a;
  option_b.innerText = currentQuestion.b;
  option_c.innerText = currentQuestion.c;
  option_d.innerText = currentQuestion.d;
}

function getSelected() {
  let selectedAnswer;
  selected.forEach((select) => {
    if (select.checked) {
      selectedAnswer = select.id;
    }
  });

  return selectedAnswer;
}

function deSelect() {
  selected.forEach((select) => {
    select.checked = false;
  });
}

submit.addEventListener("click", () => {
  let answer = getSelected();

  if (answer) {
    if (answer === quizData[currentQuiz].correct) {
      currentQuiz++;
    } else {
      alert("Wrong");
      selected.forEach((select) => {
        select.checked = false;
      });
    }
  }

  if (currentQuiz < quizData.length) {
    loadQuiz();
  } else {
    quiz.innerHTML = ` <h2 class="center quiz-header">Game over</h2>
    <button class="btn" onclick= "location.reload()">Reload</button>
    `;
  }
});
