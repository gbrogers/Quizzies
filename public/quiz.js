// const { getQuiz } = require("../server/controller/ctrl");

const generate = document.getElementById("generate-game");
const form = document.querySelector("form");
const tryAgain = document.getElementById("try-again");
const checkAns = document.getElementById("check-answers");
const quesSection = document.querySelector(".question-section");
const baseURL = "https://opentdb.com/api.php";

console.log("here");

const getInput = (e) => {
  e.preventDefault();
  console.log("button click happened");

  let category = "";
  const cat = document.querySelectorAll(".category");
  for (const item of cat) {
    if (item.selected) {
      if (item.value === "any") {
        category = "";
      } else {
        category = `&category=${item.value}`;
      }
    }
  }

  let difficulty = "";
  const diff = document.querySelectorAll(".difficulty");
  for (const item of diff) {
    if (item.selected) {
      if (item.value === "any") {
        difficulty = "";
      } else {
        difficulty = `&difficulty=${item.value}`;
      }
    }
  }
  let numQuestions = "";
  const num = document.querySelectorAll(".question-num");
  for (const item of num) {
    if (item.selected) {
      numQuestions = `amount=${item.value}`;
    }
  }

  let gameChoice = `${numQuestions}${category}${difficulty}`;
  getQuiz(gameChoice);
};

getQuiz = (gameChoice) => {
  axios
    .get(`${baseURL}?${gameChoice}`)
    .then((res) => {
      form.style.display = "none";
      tryAgain.style.display = "block";
      checkAns.style.display = "block";
      quesSection.style.display = "block";
      let quizQuestions = res.data.results;
      console.log(quizQuestions);

      quesSection.innerHTML = "";

      for (let i = 0; i < quizQuestions.length; i++) {
        let singleQues = document.createElement("div");
        singleQues.className = `Question${i + 1}`;
        singleQues.innerHTML = quizQuestions[i].question;
        quesSection.appendChild(singleQues);

        let answerOptions = [...quizQuestions[i].incorrect_answers];

        //ensure answer is placed randomly into answers
        answerOptions.splice(
          Math.floor(Math.random() * 3),
          0,
          quizQuestions[i].correct_answer
        );
        // console.log(answerOptions);

        let ansOptionsSection = document.createElement("div");

        for (let j = 0; j < answerOptions.length; j++) {
          ansOptionsSection.innerHTML += `<input type="radio" class="Question${i}" name="answer${i}" value="JavaScript">
          <label for="answer${j + 1}">${answerOptions[j]}</label>`;
          singleQues.appendChild(ansOptionsSection);
        }
      }
    })
    .catch((error) => console.log(error));
}; //end of getQuiz function

reset = () => {
  form.style.display = "block";
  quesSection.style.display = "none";
  tryAgain.style.display = "none";
  checkAns.style.display = "none";
};

generate.addEventListener("click", getInput);
tryAgain.addEventListener("click", reset);
