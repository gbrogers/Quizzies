// const { getQuiz } = require("../server/controller/ctrl");

const generate = document.getElementById("generate-game");

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
generate.addEventListener("click", getInput);

getQuiz = (gameChoice) => {
  axios
    .get(`${baseURL}?${gameChoice}`)
    .then((res) => {
      let quizQuestions = res.data.results;
      console.log(quizQuestions);
      for (let i = 0; i < quizQuestions.length; i++) {
        // let regex = /&quot/g;
        // let eachQuestion = quizQuestions[i].question;
        // eachQuestion = eachQuestion.replace(regex, '"');
        console.log(quizQuestions[i].question);
        document.querySelector(".question-location").innerHTML =
          quizQuestions[i].question;
      }
    })
    .catch((error) => console.log(error));
};
