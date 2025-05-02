export const fetchFromLocalStorage = (data, questionId) => {
    if (questionId in data) 
        return data[questionId];
    else {
        return '';
    }
}

export const saveCurrentPythonCode = (questionId, code) => {
    localStorage.setItem('currentPythonCode', JSON.stringify({[questionId]: code}));
}

export const fetchCurrentPythonCode = () => {
    return JSON.parse(localStorage.getItem('currentPythonCode')) || {};
}

export const fetchSavedProgressFromDb = async (username, setLocalProgressData, setSavedProgressData) => {
    const response = await fetch('http://127.0.0.1:5000/fetch_saved_progress', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
    });
    if (response.ok) {
        const data = await response.json();
        // if (dontSetToLocal) {
        setSavedProgressData(data.progress);
        // } else {
        setLocalProgressData(data.progress);
        // }
    } else {
        const errorData = await response.json();
        alert('Data fetch unsuccessful: ' + errorData.message);
        // return {};
    }
    // const data = await response.json();
    // if (dontSetToLocal) {
    //     return data.progress || {};
    // } else {
    //     // setDataToLocalProgressData(setLocalProgressData, response, data);
    //     if (response.ok) {
    //         // const data = await response.json();
    //         setLocalProgressData(data.progress);
    //     } else {
    //         // const errorData = await response.json();
    //         alert('Data fetch unsuccessful: ' + data.message);
    //         // return {};
    //     }
    // }
}
// const setDataToLocalProgressData = (setLocalProgressData, response, data) => {
//     if (response.ok) {
//         // const data = await response.json();
//         setLocalProgressData(data.progress);
//     } else {
//         // const errorData = await response.json();
//         alert('Data fetch unsuccessful: ' + data.message);
//         return {}
//     }
// }
// export const saveToLocalStorage = (questionId, code) => {
//     let savedData = JSON.parse(localStorage.getItem('codingAnswers')) || [];
//     const existing = savedData.find(item => item.question_id === questionId);
//     if (existing) {
//         existing.code = code;
//     } else {
//         savedData.push({ question_id: questionId, code: code });
//     }
//     localStorage.setItem('codingAnswers', JSON.stringify(savedData));
// };

// export const fetchFromLocalStorage = (questionId) => {
//     const savedData = JSON.parse(localStorage.getItem('codingAnswers')) || [];
//     const existing = savedData.find(item => item.question_id === questionId);
//     if(existing){
//         return(existing.code);
//     } else {
//         return('');
//     }
// }