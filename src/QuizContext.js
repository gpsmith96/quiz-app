import React, {createContext, useState, useEffect} from 'react';
import { v4 as uuidv4 } from 'uuid';

export const QuizContext = createContext();

export const QuizProvider = props => {
	const [List, setList] = useState(() => {
		// getting stored value
		const saved = localStorage.getItem("List");
		const initialValue = JSON.parse(saved);
		return initialValue || [];
	});
	useEffect(() => {
		const saveList = List.map(element => JSON.parse(JSON.stringify(element)));
		saveList.forEach(question => {
			question.selectedAnswer = -1;
			question.answered = false;
		});
		localStorage.setItem("List", JSON.stringify(saveList));
	}, [List]);
	return (
		<QuizContext.Provider value={[List, setList]}>
			{props.children}
		</QuizContext.Provider>
	)
}