import React, {useContext, useState} from "react";
import {QuizContext} from './QuizContext';
import { v4 as uuidv4 } from 'uuid';
import AddAnswer from './AddAnswer';

function AddQuestion(props) {
  let [correctAnswer, setcorrectAnswer] = useState(-1);
  let [question, setQuestion] = useState("");
  let [answers, setAnswers] = useState([{answerID : uuidv4(), text : ""}]);
  let [List, setList] = useContext(QuizContext);

  const addQuestionText = (e) => {
    setQuestion(e.target.value);
  }
  const addAnswer = (e, changedIndex) => {
    let value = e.target.value;
    let updatedAnswers = answers.map((arrayItem, index) => index === changedIndex ? {answerID : arrayItem.answerID, text : value} : arrayItem);
    updatedAnswers = updatedAnswers.filter((arrayItem, index) => (arrayItem.text != "" || index === updatedAnswers.length-1));
    if (updatedAnswers[updatedAnswers.length-1].text != "") updatedAnswers = [...updatedAnswers, {answerID : uuidv4(), text : ""}]
    setAnswers(updatedAnswers);
    }
  const addQuestion = (e) => {
    e.preventDefault();
    if (question != "" && answers.length != 2 && correctAnswer != -1) {
      const addingAnswers = answers.filter(arrayItem => (arrayItem.text != ""));
      const newQuestion = {
        questionText : question,
        answers : addingAnswers,
        correctAnswer : answers.findIndex(arrayItem => arrayItem.answerID === correctAnswer),
        selectedAnswer : -1,
        questionID : uuidv4(),
        answered : false
      };
      setList(prevList => [...prevList, newQuestion]);
      setQuestion("");
      setAnswers([{answerID : uuidv4(), text : ""}]);
      setcorrectAnswer(-1);
    }
  }
  const handleRadio = (e) => {
    setcorrectAnswer(e.target.id);
  }
  if (props.visible) return (
    <form onSubmit={addQuestion}>
      <ul id="add-question-list">
        <li><input type="text" placeholder="Question" name="question" value={question} onChange={addQuestionText}/></li>
        {answers.map((arrayItem, index) =>(<AddAnswer checked={arrayItem.answerID === correctAnswer ? true : false} handleRadio={handleRadio} id={arrayItem.answerID} key={arrayItem.answerID} index={index} value={arrayItem.text} addAnswer={addAnswer}/>))}
      </ul>
      <button className="button-general">Submit</button>
    </form>
    );
  else  return (<></>);
}

export default AddQuestion;