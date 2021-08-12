// import { checkAnswers } from "./checkAnswers.js";

const generate = document.getElementById("generate-game");
const form = document.querySelector("form");
const tryAgain = document.getElementById("try-again");
const checkAns = document.getElementById("check-answers");
const quesSection = document.querySelector(".question-section");
const showAns = document.querySelectorAll(".show-score");

const baseURL = "https://opentdb.com/api.php";

const getInput = (e) => {
  e.preventDefault();

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

const getQuiz = (gameChoice) => {
  axios
    .get(`${baseURL}?${gameChoice}`)
    .then((res) => {
      form.style.display = "none";
      tryAgain.style.display = "block";
      checkAns.style.display = "block";
      quesSection.style.display = "block";

      let quizQuestions = res.data.results;

      console.log(quizQuestions);
      // display questions - turn this into seperate function
      for (let i = 0; i < quizQuestions.length; i++) {
        let ansOptionsSection = document.createElement("div");
        let singleQues = document.createElement("div");
        singleQues.className = `Question${i + 1}`;
        singleQues.innerHTML = `<h3>${quizQuestions[i].question}</h3>`;
        quesSection.appendChild(singleQues);
        let correctAns = quizQuestions[i].correct_answer;
        let answerOptions = [...quizQuestions[i].incorrect_answers];

        answerOptions.splice(Math.floor(Math.random() * 3), 0, correctAns);

        let ansOptionsSection = document.createElement("div");
        //display answer options
        for (let j = 0; j < answerOptions.length; j++) {
          const ansHTML = `<div class='answer-container' id="option${
            j + 1
          }-${i}-container">
          <input type="radio" class="Question${i}" id="option${
            j + 1
          }-${i}" name="answer${i}" value="${answerOptions[j]}">
          <label for="option${j + 1}-${i}">${answerOptions[j]}</label></div>`;
          ansOptionsSection.innerHTML += ansHTML;
          singleQues.appendChild(ansOptionsSection);
        }
      }
      const checkAnswers = () => {
        checkAns.style.display = "none";
        let numCorrect = 0;
        for (let m = 0; m < quizQuestions.length; m++) {
          const items = document.getElementsByName(`answer${m}`);
          const question = document.querySelector(`.Question${m + 1}`);
          let hiddenAnsDiv = document.createElement("div");
          hiddenAnsDiv.innerHTML = `${quizQuestions[m].correct_answer}`;

          let correct = hiddenAnsDiv.innerHTML;
          console.log(correct);
          const inputSpot = document.querySelector(
            `input[value = "${correct}"][class="Question${m}"]`
          );

          console.log(quizQuestions[m].question);
          console.log(`correct ans: ${correct}`);

          for (const item of items) {
            if (item.checked) {
              const wrongAns = document.querySelector(
                `input[value = "${item.value}"][class="Question${m}"]`
              );

              let wrongSpotId = wrongAns.id;
              const wrongContainer = document.getElementById(
                `${wrongSpotId}-container`
              );

              if (item.value === correct) {
                console.log("correct answer found");
                question.style.border = "3px solid #A9E9B3";
                numCorrect++;
              } else {
                wrongContainer.style.color = "rgb(212, 3, 3)";
                console.log("wrong answer found");
                question.style.border = "3px solid #F2A2A2";
                let inputSpotId = inputSpot.id;
                const correctContainer = document.getElementById(
                  `${inputSpotId}-container`
                );
                correctContainer.style.border = "2px #A9E9B3 solid";
                correctContainer.style.padding = "13px 7px 13px 4px";

                console.log("---------");
              }
            }
          }
        }
        for (let spot in showAns) {
          showAns[
            spot
          ].innerHTML = `You got <span>${numCorrect}</span> out of <span>${quizQuestions.length}</span> correct!`;
        }
      };
      checkAns.addEventListener("click", checkAnswers);
    })
    .catch((error) => console.log(error));
}; //end of getQuiz function

const reset = () => {
  // let showAns = document.querySelectorAll(".show-score");
  // for (let spot in showAns) {
  //   showAns[spot].innerHTML = "";
  // }
  // form.style.display = "block";
  // quesSection.style.display = "none";
  // tryAgain.style.display = "none";
  // checkAns.style.display = "none";
  // let ansContainers = document.getElementsByClassName("answer-containers");
  // for (let container in ansContainers) {
  //   container.style.backgroundColor = "";
  // }


  location.reload();
};

generate.addEventListener("click", getInput);
tryAgain.addEventListener("click", reset);
