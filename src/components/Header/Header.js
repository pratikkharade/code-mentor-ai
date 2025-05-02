import React from 'react';
import Profile from '../Profile/Profile';

function Header(props) {
    const isGuest = (props.isGuest === 'true') || (props.isGuest === true);

    const logout = () => {
        props.setUser('');
        props.setLoggedIn(false);
        sessionStorage.clear();
        props.setLocalProgressData({});
    }
    return (
        <div className='homepage-header'>
            <div className='header-logo'></div>
            <div className='header-title'>
                <h3>CodeMentor AI</h3>
            </div>
            <div className='header-profile'>
                {props.user && !isGuest && 
                    <Profile logout={logout} {...props}/>
                }
            </div>
        </div>
    );
}

export default Header;