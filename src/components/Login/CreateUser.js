import React, { useState } from 'react';

function CreateUser(props) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const hints_available = 5;

    const create_user = async (e) => {
        e.preventDefault();
        const response = await fetch('http://127.0.0.1:5000/create_user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, username, password, hints_available }),
        });

        if (response.ok) {
            const data = await response.json();
            alert(data.message);
            props.setIsModalOpen(false);
        } else {
            const errorData = await response.json();
            alert('User creation failed: ' + errorData.message);
        }
    };

    return (
        <div className={"new-user-overlay"}>
            <div className={"new-user-modal"}>
                <div
                    title={"Close window"}
                    className={"new-user-close-button"}
                    onClick={(e) => props.setIsModalOpen(false)}
                >
                    <i className="fa-solid fa-xmark"></i>
                </div>
                <div className={"new-user-wrapper"}>
                    <div className={"new-user-title"}>Enter your details</div>
                    <input
                        value={email}
                        className={"new-user-email"}
                        placeholder={"Enter your Email"}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input
                        value={username}
                        className={"new-user-username"}
                        placeholder={"Enter your Username"}
                        onChange={e => setUsername(e.target.value)}
                    />
                    <input
                        value={password}
                        className={"new-user-password"}
                        placeholder={"Enter your Password"}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <button onClick={create_user} className={"new-user-button"}>Create User</button>
                </div>
            </div>
        </div>

    );
}

export default CreateUser;