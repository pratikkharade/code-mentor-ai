import React, { useState } from "react";

const Profile = (props) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    
    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };

    const handleLogout = () => {
        /* eslint-disable no-restricted-globals */
        let confirm_logout = confirm("Are you sure you want to logout? You might lose any unsaved data!");
        /* eslint-enable no-restricted-globals */
        if (confirm_logout) {
            props.logout();
        }
        toggleDropdown();
    };

    const handleMySubmissions = () => {
        console.log(props.savedProgressData);
        setIsDropdownOpen(false);
    }

    return (
        <div onClick={toggleDropdown} className="profile-container">
            <span className="profile-name">{props.user}</span>
            <div className="profile-dropdown-container">
                <i  className="fa-solid fa-angle-down"></i>
                {isDropdownOpen && (
                    <div className="profile-dropdown">
                        <div className="profile-dropdown-item" onClick={handleMySubmissions}>
                            My Submissions
                        </div>
                        <div className="profile-dropdown-item" onClick={handleLogout}>
                            Logout
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;