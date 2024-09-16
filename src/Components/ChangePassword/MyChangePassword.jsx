import React, { useState } from 'react';
import './ChangePassword.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MyChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const email = sessionStorage.getItem("email");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (newPassword !== confirmPassword) {
            setError('New passwords do not match');
            setLoading(false);
            return;
        }

        try {
            const res = await axios.post("http://localhost:5100/api/user/chnage-password", { email: email, currentPassword: currentPassword, newPassword: newPassword })
            console.log(res);
            setSuccess('Password changed successfully');
            navigate("/profile")
            setError(''); // Clear error message on success
            setLoading(false);
        } catch (error) {
            console.log(error);
            setError(error.response?.data?.message || 'An error occurred'); // Safe error handling
            setLoading(false);
        }
    };

    // Clear error when input fields are changed
    const handleChange = (e, setter) => {
        setter(e.target.value);
        if (error) {
            setError(''); // Clear error when user starts typing
        }
    };

    return (
        <div className="change-password-container">
            <h1> Change Password</h1>
            <form onSubmit={handleSubmit} className="change-password-form">
                <div className="form-group">
                    <label htmlFor="currentPassword">Current Password</label>
                    <input
                        type="text"
                        id="currentPassword"
                        value={currentPassword}
                        onChange={(e) => handleChange(e, setCurrentPassword)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="newPassword">New Password</label>
                    <input
                        type="text"
                        id="newPassword"
                        value={newPassword}
                        onChange={(e) => handleChange(e, setNewPassword)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm New Password</label>
                    <input
                        type="text"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => handleChange(e, setConfirmPassword)}
                        required
                    />
                </div>
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}
                <button type="submit" className="btn-grad">{loading ? "Wait..." : "Change Password"}</button>
            </form>
        </div>
    );
};

export default MyChangePassword;
