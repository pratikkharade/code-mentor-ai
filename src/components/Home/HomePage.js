import React from 'react';
import Concept from '../Concept/Concept';
import SaveProgress from '../SaveProgress/SaveProgress';
import QuestionComponent from '../Question/QuestionComponent';

function HomePage(props) {
    const [conceptIndex, setConceptIndex] = React.useState(-1);
    const [currentQuestionNumber, setCurrentQuestionNumber] = React.useState(0);
    const isGuest = (props.isGuest === 'true') || (props.isGuest === true);

    const selectConcept = (index) => {
        setConceptIndex(index);
        setCurrentQuestionNumber(0);
    }

    return (
        <div className='homepage'>
            <Concept 
                selectConcept={selectConcept} 
            />
            {!isGuest && conceptIndex !== -1 &&
                <SaveProgress 
                    {...props}
                />
            }
            { conceptIndex !== -1 &&
                <QuestionComponent 
                    conceptIndex = {conceptIndex}
                    currentQuestionNumber = {currentQuestionNumber}
                    setCurrentQuestionNumber = {setCurrentQuestionNumber}
                    useOneHint = { props.useOneHint }
                    hintsAvailable = { props.hintsAvailable }
                    localProgressData = { props.localProgressData }
                    setLocalProgressData = { props.setLocalProgressData }
                />
            }
        </div>
    )
}

export default HomePage