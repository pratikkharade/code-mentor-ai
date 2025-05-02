import React, { useState } from 'react';
import CreateUser from './CreateUser';

function Login(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const setupLogin = (username, isGuest) => {
        props.setUser(username);
        props.setGuest(isGuest);
        props.setLoggedIn(true);
        sessionStorage.setItem('guest', isGuest);
        sessionStorage.setItem('user', username);
        sessionStorage.setItem('loggedIn', true);
    }
    const login = async (e) => {
        e.preventDefault();
        const response = await fetch('http://127.0.0.1:5000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });
        
        if (response.ok) {
            setupLogin(username, false);
        } else {
            const errorData = await response.json();
            alert('Login failed: ' + errorData.message);
        }
    };

    const guestLogin = () => {
        setupLogin('Guest', true);
    }
    
    return (
        <div className='login-wrapper'>
            <div>
                <input 
                    value={username} 
                    className={"login-input-field"}
                    placeholder={"Enter your username"}
                    onChange={e => setUsername(e.target.value)}
                />
            </div>
            <div>
                <input 
                    value={password}
                    className={"login-input-field"}
                    placeholder={"Enter your password"}
                    onChange={e => setPassword(e.target.value)} 
                />
            </div>
            <button onClick={login} className={"login-button"}>Login</button>
            <a onClick={guestLogin} className={"login-guest"}>Continue As A Guest</a>
            <div className={"login-new-user-text"}>Don't have an account?
                <a onClick={(e) => setIsModalOpen(true)} className={"login-new-user-link"}>Click here to create a new user</a>
            </div>
            
            {isModalOpen && <CreateUser setIsModalOpen={setIsModalOpen}/>}
            {/* {isModalOpen && (
                <div style={modalStyles.overlay}>
                <div style={modalStyles.modal}>
                    <button onClick={closeModal} style={modalStyles.closeButton}>
                    Close
                    </button>
                    <CreateUser closeModal={closeModal}/>
                </div>
                </div>
            )} */}
        </div>
    );
    
      
}

export default Login;