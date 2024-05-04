const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const restartButton = document.getElementById("restart-btn");
const resultDiv = document.getElementById("result");

let shuffledQuestions, currentQuestionIndex, score;

const questions = [
  {
    question: " What is the sum of 130+125+191?",
    answers: [
      { text: "335", correct: false},
      { text: "456", correct: false },
      { text: "446", correct: true },
      { text: "426", correct: false },
    ],
  },
  {
    question: "20+(90÷2) is equal to",
    answers: [
      { text: "50", correct: false },
      { text: "55", correct: false },
      { text: "65", correct: true },
      { text: "60", correct: false },
    ],
  },
  {
    question: " Find the missing terms in multiple of 3: 3, 6, 9, __, 15",
    answers: [
      { text: "12", correct: true },
      { text: "27", correct: false },
      { text: "18", correct: false },
      { text: "21", correct: false },
    ],
  },
  {
    question: " The product of 121 x 0 x 200 x 25 is",
    answers: [
      { text: "143", correct: false },
      { text: "0", correct: true },
      { text: "8820", correct:false},
      { text: "15000", correct: false },
    ],
  },
{
  question:"What is the next prime number after 5?",
  answers: [
    {text:  "6", correct:false },
    { text: "9",correct:false },
    { text: "8",correct:false },
    { text: "7",correct:true },
  ]
},
{
     question:"If a is the side of cube, then the volume of the cube is:",
    answers:[
      { text: "a3",correct:true },
      { text: "a2",correct:false },
      { text: "a",correct:false },
      { text: "none of these",correct:false },
]
},
{
  question:"The area of rectangle is equal to:",
  answers:[
   { text: "side x side ",correct:false },
   { text: "6 x side",correct:false },
   { text: "1/2 x bh ",correct:false },
   { text: "Length x Breadth",correct:true },
]
},
{
 question:". The value of (-10/3) x (-15/2) x (17/19) x 0 is:",
 answers:[
   { text: "22.66",correct:false },
   { text: "0",correct:true },
   { text: "20",correct:false },
   { text: "30",correct:false },
]
},
{
  question:" The additive identity of rational numbers is:",
 answers:[
   { text: "-1",correct:false },
   { text: "1",correct:false },
   { text: "0",correct:true },
   { text: "2",correct:false },
]
},
{
  question:"What is the reciprocal of 1/9?",
 answers:[
   { text: "1",correct:false },
   { text: "9",correct:true},
   { text: "0",correct:false },
   { text: "none of these",correct:false },
]
},
];

startQuiz();

function startQuiz() {
  score = 0;
  questionContainer.style.display = "flex";
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  nextButton.classList.remove("hide");
  restartButton.classList.add("hide");
  resultDiv.classList.add("hide");
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer, index) => {
    const inputGroup = document.createElement("div");
    inputGroup.classList.add("input-group");

    const radio = document.createElement("input");
    radio.type = "radio";
    radio.id = "answer" + index;
    radio.name = "answer";
    radio.value = index;

    const label = document.createElement("label");
    label.htmlFor = "answer" + index;
    label.innerText = answer.text;

    inputGroup.appendChild(radio);
    inputGroup.appendChild(label);
    answerButtons.appendChild(inputGroup);
  });
}

function resetState() {
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

nextButton.addEventListener("click", () => {
  const answerIndex = Array.from(
    answerButtons.querySelectorAll("input")
  ).findIndex((radio) => radio.checked);
  if (answerIndex !== -1) {
    if (shuffledQuestions[currentQuestionIndex].answers[answerIndex].correct) {
      score++;
    }
    currentQuestionIndex++;
    if (shuffledQuestions.length > currentQuestionIndex) {
      setNextQuestion();
    } else {
      endQuiz();
    }
  } else {
    alert("Please select an answer.");
  }
});

restartButton.addEventListener("click", startQuiz);

function endQuiz() {
  questionContainer.style.display = "none";
  nextButton.classList.add("hide");
  restartButton.classList.remove("hide");
  resultDiv.classList.remove("hide");
  resultDiv.innerText = `Your final score: ${score} / ${shuffledQuestions.length}`;
}
