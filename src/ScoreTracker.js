import React, {useContext} from "react";
import {QuizContext} from './QuizContext';

function ScoreTracker(props) {
    let [List] = useContext(QuizContext);
    var scoreNum = 0
    var scoreDenom = 0
    List.forEach(question => {
      scoreDenom++;
      if (question.selectedAnswer === question.correctAnswer) scoreNum++;
      });
    return (
    <>
      <h3>Score: {scoreNum + "/" + scoreDenom}</h3>
    </>
    )
}

export default ScoreTracker;