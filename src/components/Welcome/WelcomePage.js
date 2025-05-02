import React, {useState, useEffect} from 'react';
import Header from '../Header/Header';
import Login from '../Login/LoginPage';
import HomePage from '../Home/HomePage';
import gptDetails from '../../data/config.json';
import { fetchSavedProgressFromDb } from "../../APIs/LocalStorage";

function WelcomePage(props) {
    const [guest, setGuest] = useState(sessionStorage.getItem('guest') || false);
    const isGuest = (guest === 'true') || (guest === true);
    if (isGuest) {
        sessionStorage.clear();
    }

    const [user, setUser] = useState(sessionStorage.getItem('user') || '');
    const [loggedIn, setLoggedIn] = useState(sessionStorage.getItem('loggedIn') || false);
    const [hintsAvailable, setHintsAvailable] = useState(gptDetails.maxHints);

    const [savedProgressData, setSavedProgressData] = useState({});
    const [localProgressData, setLocalProgressData] = useState({});

    const useOneHint = () => {
        setHintsAvailable(hint => hint - 1);
    }
    
    useEffect(() => {
        if (loggedIn && !isGuest){
            fetchSavedProgressFromDb(user, setLocalProgressData, setSavedProgressData);
            // console.log(savedProgressData);
        }
    }, [user, loggedIn, isGuest]);
    
    return(
        <div className='welcome-page'>
            <Header 
                user={user}
                setUser={setUser}
                isGuest={isGuest}
                setLoggedIn={setLoggedIn}
                hintsAvailable={hintsAvailable}
                savedProgressData = { savedProgressData }
                setLocalProgressData = { setLocalProgressData }
            />
            {!loggedIn && 
                <Login 
                    setUser={setUser}
                    setGuest={setGuest}
                    setLoggedIn={setLoggedIn}
                />
            }
            {loggedIn && 
                <HomePage 
                    user = { user }
                    isGuest = { isGuest } 
                    useOneHint = {useOneHint}
                    hintsAvailable = { hintsAvailable }
                    savedProgressData = { savedProgressData }
                    localProgressData = { localProgressData }
                    setSavedProgressData = { setSavedProgressData }
                    setLocalProgressData = { setLocalProgressData }
                />
            }
        </div>
    )
}

export default WelcomePage;