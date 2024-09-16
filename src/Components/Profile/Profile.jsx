import React, { useEffect, useState } from 'react';
import './Profile.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Profile() {
    const userID = localStorage.getItem("userid");
    const [data, setData] = useState({});
    const navigate = useNavigate()
    const getApiData = async () => {
        try {
            const res = await axios.get(`http://localhost:5100/api/user/${userID}`);
            setData(res.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getApiData();
    }, [userID]);

    const handleLogout = () => {
        localStorage.removeItem("login")
        localStorage.removeItem("userid")
        localStorage.removeItem("token")
        navigate("/login")
    };

    const handleChangePassword = () => {
        // Redirect to change password page
    };

    return (
        <section className="Profile-section">
            <div className="Profile-container">
                <div className="Profile-header">
                    <div className="Profile-avatar">
                        <img
                            src={data.image || "https://via.placeholder.com/150"}
                            alt="User Avatar"
                        />
                    </div>
                    <div className="Profile-info">
                        <h2>{data.name || "John Doe"}</h2>
                        <p>Email: {data.email || "johndoe@example.com"}</p>
                        <p>Phone: {data.phone || "+123 456 7890"}</p>
                        <div className="Profile-actions">
                            <button className="Edit-profile-btn">Edit Profile</button>
                            <button className="Change-password-btn" onClick={handleChangePassword}>Change Password</button>
                            <button className="Logout-btn" onClick={handleLogout}>Logout</button>
                        </div>
                    </div>
                </div>

                <div className="Profile-body">
                    <div className="Profile-section orders">
                        <h3>Order History</h3>
                        <ul>
                            <li>
                                <div>Order #12345</div>
                                <div>Date: 2023-09-01</div>
                                <div>Total: $250</div>
                                <button className="Order-details-btn">View Details</button>
                            </li>
                            {/* Add more orders as needed */}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Profile;
