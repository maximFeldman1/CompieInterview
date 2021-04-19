import React, { useEffect, useState } from "react";
import { RandomBlink, blink } from "./utils";
import "./App.css";
import Box from "./Box";

var gameSelectedList = [];
var userSelectedList = [];

function App() {
  const colors = ["green", "red", "yellow", "blue", "white", "orange"];
  const [level, setLevel] = useState(1);
  const [heading, setHeading] = useState("Press 'S' Key to Start");
  const [score, setScore] = useState(0);
  const [view, setViewScore] = useState();
  useEffect(() => {
    document.addEventListener("keydown", restartGame);
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("keydown", restartGame);
      document.removeEventListener("click", handleClick);
    };
  });

  const handleClick = (e) => {
    if (e.target.className.includes("btn")) {
      blink(e.target);
      userSelectedList.push(e.target.id);
      checkAnswer(userSelectedList, gameSelectedList, userSelectedList.length);
      if (userSelectedList.length === gameSelectedList.length) {
        checkAnswer(
          userSelectedList,
          gameSelectedList,
          userSelectedList.length
        );
      }
    }
  };
  const continueGame = () => {
    setLevel(level + 1);
    setScore(score + 10);
    setHeading("Level " + level);
    setViewScore("Score " + score);
    setTimeout(() => {
      var selectNumer = RandomBlink(colors);
      gameSelectedList.push(colors[selectNumer]);
    }, 1000);

    userSelectedList = [];
  };
  const restartGame = (e) => {
    if (e.key === "s" || e.key === "S") {
      gameSelectedList = [];
      userSelectedList = [];
      var selectNumer = RandomBlink(colors);
      gameSelectedList.push(colors[selectNumer]);
      setLevel(1);
      setScore(10);
      setHeading("Level " + level);
      setViewScore("Score " + score);
      document.body.style.backgroundColor = "#011F3F";
    }
  };
  const checkAnswer = (list_1, list_2, index) => {
    if (list_1[index - 1] === list_2[index - 1]) {
      if (list_1.length === list_2.length) {
        continueGame();
      }
      return true;
    } else {
      document.body.style.backgroundColor = "#900d0d";
      setLevel(1);
      setScore(0);
      setHeading("Game Over Press 'S' Key to continue");

      return false;
    }
  };
  return (
    <div className="App">
      <h1 id="title">{heading}</h1>
      <h3 id="title">{view}</h3>
      <div className="container">
        <div className="row">
          <Box id="green" className="btn green" />
          <Box id="red" className="btn red" />
          <Box id="white" className="btn white" />
        </div>
        <div className="row">
          <Box id="yellow" className="btn yellow" />
          <Box id="blue" className="btn blue" />
          <Box id="orange" className="btn orange" />
        </div>
      </div>
    </div>
  );
}

export default App;
