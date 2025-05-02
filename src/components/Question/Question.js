import React, { useEffect, useState } from 'react';
import { execute } from "../../APIs/CodeExecution";
import { generatePrompt, sendRequest } from "../../APIs/Hint";
import { fetchFromLocalStorage, saveCurrentPythonCode } from "../../APIs/LocalStorage";
import Loading from '../Loading/Loading';
import HintsAvailable from '../HintsAvailable/HintsAvailable';

function Question(props) {
    const { index, question } = props;
    const [hint, setHint] = useState('');
    const [error, setError] = useState('');
    const [output, setOutput] = useState('');
    const [pythonCode, setPythonCode] = React.useState('');
    const [isGettingHint, setIsGettingHint] = useState(false);
    const [isCodeRunning, setIsCodeRunning] = useState(false);

    useEffect(() => {
        setHint('');
        setError('');
        setOutput('');
        setPythonCode(fetchFromLocalStorage(props.localProgressData, question["id"]));
    }, [question]);


    const prevQuestion = () => {
        let qid = question['id'];
        let data = { ...props.localProgressData, [qid]: pythonCode };
        props.setLocalProgressData(data);

        props.prevQuestion();
    }

    const nextQuestion = () => {
        let qid = question['id'];
        let data = { ...props.localProgressData, [qid]: pythonCode };
        props.setLocalProgressData(data);

        props.nextQuestion();
    }

    // Function to get hint using OpenAI API.
    const getHint = () => {
        setHint('');
        setIsGettingHint(true);
        if (props.hintsAvailable === 0) {
            alert("You have used up all your hints!");
            return 0;
        }
        const prompt = generatePrompt(question?.desc, pythonCode);
        sendRequest(prompt).then(hint => {
            setHint(hint);
            setIsGettingHint(false);
            props.useOneHint();
        });
    }

    // Function to execute the Python code.
    const runCode = () => {
        setError('');
        setOutput('');
        setIsCodeRunning(true);
        execute(pythonCode).then(result => {
            if (result?.success) {
                setOutput(result?.output);
                setError('');
            } else {
                setError(result?.output.trim()
                    || 'Error occurred while running the code');
                setOutput('');
            }
            setIsCodeRunning(false);
        });
    }

    const editPythonCode = (e) => {
        let code = e.target.value;
        setPythonCode(code);
        saveCurrentPythonCode(question['id'], code);
    }

    return (
        <div className='question-container'>
            <div className='question-header-parent'>
                <div className='question-header'>
                    <div className='question-heading'>
                        <i className="question-label-icon fa-solid fa-star"></i>
                        Question {index + 1}: {question?.title}
                    </div>
                    <div className='question-label'>
                        <label>
                            {question?.desc}
                        </label>
                    </div>
                </div>
                <div className='hints-available-header'>
                    <HintsAvailable hintsAvailable={props.hintsAvailable} />
                </div>
            </div>
            <div className='question-code'>
                <textarea
                    value={pythonCode}
                    rows='20' cols='40'
                    className='input-text-area'
                    onChange={editPythonCode}
                />
            </div>
            <div className='responses-conatiner'>
                <div className='run-code-wrapper'>
                    <div className='run-code-button' onClick={runCode}>
                        <i className='run-code-icon fa-solid fa-play'></i>
                        <a className='run-code-label'>Run My Code</a>
                    </div>
                    <div className='code-output'>{output}</div>
                    <div className='code-error'>{error}</div>
                    {isCodeRunning && <Loading msg={"Running your code..."} />}
                </div>
                <div className='get-hint-wrapper'>
                    <div className='get-hint-button' onClick={getHint}>
                        <i className='get-hint-icon fa-solid fa-circle-info'></i>
                        <a className='get-hint-label'>Get A Hint</a>
                    </div>
                    <div className='hint-response'>{hint}</div>
                    {isGettingHint && <Loading msg={"Loading..."} />}
                </div>
            </div>
            <div className='prev-next-buttons'>
                <button className='prev-button' onClick={prevQuestion} disabled={props.isPrevDisabled}>Previous</button>
                <button className='next-button' onClick={nextQuestion} disabled={props.isNextDisabled}>Next</button>
            </div>
        </div>
    );
}

export default Question;

