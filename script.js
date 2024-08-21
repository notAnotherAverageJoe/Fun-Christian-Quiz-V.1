const quiz = [
  {
    question: "What is the first book in the Bible?",
    options: ["Job", "Revelation", "Genesis", "Exodus"],
    answer: "Genesis",
  },
  {
    question: "Who was swallowed by a great fish?",
    options: ["Moses", "Noah", "Jonah", "David"],
    answer: "Jonah",
  },
  {
    question: "What is the shortest verse in the Bible?",
    options: [
      "Jesus wept.",
      "God is love.",
      "In the beginning...",
      "The Lord is my shepherd.",
    ],
    answer: "Jesus wept.",
  },
  {
    question: "What is the name of the first man created by God?",
    options: ["Cain", "David", "Goliath", "Adam"],
    answer: "Adam",
  },
  {
    question: "Who was the mother of Jesus?",
    options: ["Sarah", "Mary", "Ruth", "Rebecca"],
    answer: "Mary",
  },
  {
    question: "What was the name of Jesus' earthly father?",
    options: ["Joseph", "Steve", "John", "Greg", "Ishmael"],
    answer: "Joseph",
  },
];

let currentQuestionIndex = 0;
let counter = 0;

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const submitButton = document.getElementById("submit-answer");
const resultElement = document.getElementById("result");
const pointsElement = document.getElementById("counter");

const displayQuestion = () => {
  const currentQuestion = quiz[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;

  optionsElement.innerHTML = "";
  currentQuestion.options.forEach((option) => {
    const li = document.createElement("li");
    const input = document.createElement("input");
    input.type = "radio";
    input.name = "quiz-option";
    input.value = option;
    input.id = option;

    const label = document.createElement("label");
    label.setAttribute("for", option);
    label.textContent = option;

    li.appendChild(input);
    li.appendChild(label);
    optionsElement.appendChild(li);
  });
};

submitButton.addEventListener("click", () => {
  const selectedOption = document.querySelector(
    'input[name="quiz-option"]:checked'
  );

  if (selectedOption) {
    const userAnswer = selectedOption.value;
    const correctAnswer = quiz[currentQuestionIndex].answer;

    if (userAnswer === correctAnswer) {
      resultElement.textContent = "Correct!";
      resultElement.style.color = "green";

      // Move to the next question after a short delay
      setTimeout(() => {
        currentQuestionIndex++;
        counter++;
        pointsElement.textContent = `Points: ${counter}`;

        if (currentQuestionIndex < quiz.length) {
          displayQuestion();
          resultElement.textContent = ""; // Clear the result
        } else {
          questionElement.textContent = "Quiz Completed!";
          optionsElement.innerHTML = "";
          submitButton.style.display = "none";
          resultElement.textContent =
            "Congratulations! You've answered all the questions.";
        }
      }, 1000); // 1-second delay
    } else {
      resultElement.textContent = `Incorrect, try again.`;
      resultElement.style.color = "red";
      counter--;
      pointsElement.textContent = `Points: ${counter}`;
    }
  } else {
    resultElement.textContent = "Please select an answer.";
    resultElement.style.color = "orange";
  }
});

// Initialize the quiz
displayQuestion();
