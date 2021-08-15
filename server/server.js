const express = require("express");
const cors = require("cors");
const ctrl = require("./controller/ctrl");

const app = express();

app.use(express.static("public"));
const path = require("path");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./index.html"));
});

const baseURL = "https://opentdb.com/api.php";

let gameChoice = "";

//endpoints
app.get(`${baseURL}?${gameChoice}`, ctrl.getQuiz);

const port = process.env.PORT || 4004;
app.listen(port, () => {
  console.log(`You are running server on port ${port}`);
});
