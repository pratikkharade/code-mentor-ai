import React from 'react';
import { allQuestions } from '../../data/QuestionBank';

function Concept(props) {
    
    const conceptChange = (e) => {
        const index = e.target.value;
        props.selectConcept(index);
    }

    return (
        <div className='concept-dropdown'>
            <div>Select the concept you want to practice: </div>
            <div className='concept-select-wrapper'>
                <select className='concept-select' onChange={conceptChange}>
                    <option value={-1}>-- Choose a Concept --</option>
                    {
                        allQuestions.map((question, index) => (
                            <option key={index} value={index}>{question.title}</option>
                        ))
                    }
                </select>
            </div>
        </div>
    );
}

export default Concept;