import React, {useContext, useState} from "react";
import {QuizContext} from './QuizContext';
import Question from './Question';

function QuizList(props) {
  const [List, setList] = useContext(QuizContext);
  const [answered, setAnswered] = useState(List.map(question => ({ID : question.questionID, done : false})));
  const handlePickAnswer = (selectedAnswerID, questionID) => {
    //get question by id
    const newQuestion = List.find(question => (question.questionID === questionID));
    //match answer by id change selected based on selected answer id
    newQuestion.selectedAnswer = newQuestion.answers.findIndex(arrayItem => (arrayItem.answerID === selectedAnswerID));
    newQuestion.answered = true;
    //send modified list back to context
    const updateList = List.map((question, index) => question.questionID === questionID ? newQuestion : question);
    setList(updateList);
    if (updateList.find(question => question.answered === false) === undefined) props.setDone();
    return newQuestion.selectedAnswer === newQuestion.correctAnswer;
  }
  const handleDelete = (questionID) => {
    //get question by id
    const updateList = List.filter(question => question.questionID != questionID);
    setList(updateList);
  }
  return(
  <ul>
    {List.map((arrayItem, index) =>(
      <Question answered={arrayItem.done} key={arrayItem.questionID} handleDelete={handleDelete} handlePickAnswer={handlePickAnswer} index={index} {...arrayItem} />
      ))}
  </ul>
  )
}

export default QuizList;