import React from 'react';
import Question from '../Question/Question';
import { allQuestions } from '../../data/QuestionBank';

function QuestionComponent(props) {
    const questionBank = props.conceptIndex !== -1 && allQuestions[props.conceptIndex]["questions"]
    const question = questionBank[props.currentQuestionNumber];

    const isPrevDisabled = props.currentQuestionNumber === 0;
    const isNextDisabled = questionBank && (props.currentQuestionNumber === questionBank.length - 1);

    const prevQuestion = () => {
        props.setCurrentQuestionNumber(num => num - 1);
    }
    const nextQuestion = () => {
        props.setCurrentQuestionNumber(num => num + 1);
    }
    return (
        <Question
            key={props.currentQuestionNumber}
            index={props.currentQuestionNumber}
            question={question}
            useOneHint={props.useOneHint}
            prevQuestion={prevQuestion}
            nextQuestion={nextQuestion}
            isPrevDisabled={isPrevDisabled}
            isNextDisabled={isNextDisabled}
            hintsAvailable = {props.hintsAvailable}
            localProgressData = { props.localProgressData }
            setLocalProgressData = { props.setLocalProgressData }
        />
    )
}

export default QuestionComponent;