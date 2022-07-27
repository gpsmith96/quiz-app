import React from "react";

function AddAnswer(props) {
    return (
    <li>
      <input type="text" placeholder="Answer option" name="answer" value={props.value} onChange={(e) => {props.addAnswer(e, props.index)}}/>
      {props.value ==="" ? "" : <input className="assign-correct-answer" checked={props.checked} onChange={props.handleRadio} id={props.id} type="radio" name="AddQuestion"/>}
    </li>
    )
}

export default AddAnswer;