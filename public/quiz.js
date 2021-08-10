const generate = document.getElementById("generate-game");
const form = document.querySelector("form");
const tryAgain = document.getElementById("try-again");
const checkAns = document.getElementById("check-answers");
const quesSection = document.querySelector(".question-section");
const baseURL = "https://opentdb.com/api.php";

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
  console.log("in quiz");
  axios
    .get(`${baseURL}?${gameChoice}`)
    .then((res) => {
      console.log("in axios");
      form.style.display = "none";
      tryAgain.style.display = "block";
      checkAns.style.display = "block";
      quesSection.style.display = "block";
      let quizQuestions = res.data.results;
      console.log(quizQuestions);

      quesSection.innerHTML = "";
      let correct = 0;

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
        console.log(answerOptions);

        let ansOptionsSection = document.createElement("div");

        for (let j = 0; j < answerOptions.length; j++) {
          ansOptionsSection.innerHTML += `<div class='answer-container'><input type="radio" class="Question${i}" id="option${
            j + 1
          }-${i}" name="answer${i}" value="${answerOptions[j]}">
          <label for="option${j + 1}-${i}">${answerOptions[j]}</label></div>`;
          singleQues.appendChild(ansOptionsSection);
        }
      }
      checkAnswers = () => {
        checkAns.style.display = "none";
        for (let m = 0; m < quizQuestions.length; m++) {
          console.log(`answer${m}`);
          const items = document.getElementsByName(`answer${m}`);

          for (const item of items) {
            if (item.checked) {
              if (item.value === quizQuestions[m].correct_answer) {
                console.log("correct answer found");
                document.querySelector(
                  `.Question${m + 1}`
                ).style.backgroundColor = "rgba(82, 243, 61, 0.479)";
                correct++;
              } else {
                console.log("wrong answer found");
                document.querySelector(
                  `.Question${m + 1}`
                ).style.backgroundColor = "rgba(212, 3, 3, 0.425)";
              }
              console.log("---------");
            }
          }
        }
        document.querySelector(
          ".show-score"
        ).innerHTML = `You got <span>${correct}</span> out of <span>${quizQuestions.length}</span> correct!`;
      };

      checkAns.addEventListener("click", checkAnswers);
    })
    .catch((error) => console.log(error));
}; //end of getQuiz function

reset = () => {
  document.querySelector(".show-score").innerHTML = "";
  form.style.display = "block";
  quesSection.style.display = "none";
  tryAgain.style.display = "none";
  checkAns.style.display = "none";
};

generate.addEventListener("click", getInput);
tryAgain.addEventListener("click", reset);
