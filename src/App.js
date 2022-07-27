import './index.css';
import React, {useState, useContext} from 'react';
import {QuizContext} from './QuizContext'
import ScoreTracker from './ScoreTracker'
import QuizList from './QuizList'
import AddQuestion from './AddQuestion'

function App() {
  const [isEditing, setIsEditing] = useState(false);
  const [doneQuiz, setDoneQuiz] = useState(false);
  const [List, setList] = useContext(QuizContext);

  const setDone = () => {
    setDoneQuiz(true);
  }

  const resetQuiz = () => {
    setDoneQuiz(false);
    const resetList = List.map(element => JSON.parse(JSON.stringify(element)));
    resetList.forEach(question => {
      question.selectedAnswer = -1;
      question.answered = false;
    });
    setList(resetList);
  }

  return (
    <div id="App">
      {doneQuiz ? 
        <div className="score-container">
          <ScoreTracker/>
          <button className="button-general" onClick={resetQuiz}>Restart Quiz</button>
        </div> : ""}
      <QuizList setDone={setDone}/>
      <div id="add-question-container">
        <button className="button-general" onClick={() => setIsEditing(!isEditing)}>{isEditing ? "Done Adding" : "Add new question"}</button>
        <AddQuestion visible={isEditing}/>
      </div>
    </div>
  );
}

export default App;
