import React from 'react';
import { fetchCurrentPythonCode } from "../../APIs/LocalStorage";

function SaveProgress(props) {
    
    const saveProgress = (e) => {
        e.preventDefault();
        let currentPythonCode = fetchCurrentPythonCode();
        const localData = {...props.localProgressData, ...currentPythonCode};
        for (let q_id in localData){
            if (q_id in props.savedProgressData && props.savedProgressData[q_id] === localData[q_id]){
                console.log('same');
                continue;
            }
            saveCodingAttempt(props.user, q_id, localData[q_id]);
        }
        props.setSavedProgressData(localData);
        props.setLocalProgressData(localData);
        localStorage.clear();
        alert("Your progress has been successfully saved!");
    }
    
    const saveCodingAttempt = async (user_id, question_id, code) => {
        const response = await fetch('http://127.0.0.1:5000/save_progress', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user_id: user_id, question_id: question_id, code }),
        });
    
        if (response.ok) {
            const data = await response.json();
        } else {
            const errorData = await response.json();
        }
    };

    return (
        <div className='save-progress-wrapper'>
            <button className='save-progress' onClick={saveProgress}>Save My Progress</button>
        </div>
    );
}

export default SaveProgress;