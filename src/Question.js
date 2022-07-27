import React, {useContext, useState, useEffect} from "react";

function Question(props) {
  const [selected, setSelected] = useState(props.selectedAnswer);
  const [correct, setCorrect] = useState();

  const changeAnswer = (e) => {
    setSelected(props.answers.findIndex(answer => answer.answerID === e.target.id));
  }
  const submitAnswer = (e) => {
    e.preventDefault()
    if (!props.answered) setCorrect(props.handlePickAnswer(props.answers[selected].answerID, props.questionID));
    
  }
  useEffect(() => {
    setSelected(props.selectedAnswer);
    if (!props.answered) setCorrect();
  }, [props.answered]);
  return (
    <li className={(props.answered ? (correct ? "question-container correct" : "question-container incorrect") : "question-container")}>
      <div>
        <h1>{"Question " + (props.index + 1).toString() + (props.answered ? (correct ? " CORRECT" : " INCORRECT") : "")}</h1>
      </div>
      <div className="question-text-container">
        <h3>{props.questionText}</h3>
      </div>
      <form onSubmit={submitAnswer}>
        {props.answers.map((arrayItem, index) =>(
          <div key={arrayItem.answerID} className="answer-container">
            <input disabled={props.answered} checked={index === selected} onChange={changeAnswer} id={arrayItem.answerID} type="radio" name={props.questionID}/>
            <div className="answer-inner">
              <label htmlFor={arrayItem.answerID}>{arrayItem.text}</label>
            </div>
          </div>
          ))}
        <br/>
        <input className="button-general" disabled={props.answered} type="Submit"/>
      </form>
      <button className="button-general" disabled={props.answered} onClick={() => props.handleDelete(props.questionID)}>Delete</button>
    </li>
  )
}

export default Question;