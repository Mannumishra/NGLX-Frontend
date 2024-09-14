import React from 'react';
import './Profile.css';
import Login from '../Auth/Login';

function Profile() {
    const login = localStorage.getItem('login');

    return (
        <>
            <section className='Profile-section'>
                <div className="Profile-container">
                    {login === 'false' ? (
                        <Login />
                    ) : login === 'true' ? (
                        <p>Profile</p>
                    ) :  <Login />}
                </div>
            </section>
        </>
    );
}

export default Profile;
