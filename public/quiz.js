const generate = document.getElementById("generate-game");
const form = document.querySelector("form");
const tryAgain = document.getElementById("try-again");
const checkAns = document.getElementById("check-answers");
const quesSection = document.querySelector(".question-section");
const showAns = document.querySelectorAll(".show-score");
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
  axios
    .get(`${baseURL}?${gameChoice}`)
    .then((res) => {
      form.style.display = "none";
      tryAgain.style.display = "block";
      checkAns.style.display = "block";
      quesSection.style.display = "block";

      let numCorrect = 0;

      quizQuestions = res.data.results;
      console.log(quizQuestions);

      for (let i = 0; i < quizQuestions.length; i++) {
        singleQues = document.createElement("div");
        singleQues.className = `Question${i + 1}`;
        singleQues.innerHTML = `<h3>${quizQuestions[i].question}</h3>`;
        quesSection.appendChild(singleQues);
        let correctAns = quizQuestions[i].correct_answer;

        answerOptions = [...quizQuestions[i].incorrect_answers];

        answerOptions.splice(Math.floor(Math.random() * 3), 0, correctAns);

        ansOptionsSection = document.createElement("div");

        for (let j = 0; j < answerOptions.length; j++) {
          const ansHTML = `<div class='answer-container' id="option${
            j + 1
          }-${i}-container"><input type="radio" class="Question${i}" id="option${
            j + 1
          }-${i}" name="answer${i}" value="${answerOptions[j]}">
          <label for="option${j + 1}-${i}">${answerOptions[j]}</label></div>`;
          ansOptionsSection.innerHTML += ansHTML;
          singleQues.appendChild(ansOptionsSection);
        }
      }
      checkAnswers = () => {
        checkAns.style.display = "none";
        for (let m = 0; m < quizQuestions.length; m++) {
          const items = document.getElementsByName(`answer${m}`);
          const question = document.querySelector(`.Question${m + 1}`);
          let correct = quizQuestions[m].correct_answer;
          const inputSpot = document.querySelector(
            `input[value = "${correct}"][class="Question${m}"]`
          );

          console.log(quizQuestions[m].question);
          console.log(`correct ans: ${correct}`);

          for (const item of items) {
            if (item.checked) {
              if (item.value === correct) {
                console.log("correct answer found");
                question.style.backgroundColor = "rgba(82, 243, 61, 0.479)";
                numCorrect++;
              } else {
                console.log("wrong answer found");
                if (inputSpot !== null) {
                  let inputSpotId = inputSpot.id;
                  const correctContainer = document.getElementById(
                    `${inputSpotId}-container`
                  );
                  correctContainer.style.backgroundColor = "yellow";
                }
                question.style.backgroundColor = "rgba(212, 3, 3, 0.425)";
              }
              console.log("---------");
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

reset = () => {
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
