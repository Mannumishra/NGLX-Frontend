import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function ForgetPassword() {
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, []);

    const [step, setStep] = useState(1); // Step 1: Enter email, Step 2: Enter OTP, Step 3: Reset Password
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Function to handle sending OTP
    const handleSendOtp = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:5100/api/forget-password/send-otp', { email });
            console.log(response);
            toast.success(response.data.message);
            setStep(2); // Move to OTP step
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || 'Error sending OTP');
        }
        setLoading(false);
    };

    // Function to verify OTP
    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:5100/api/forget-password/verify-otp', { email, otp });
            toast.success(response.data.message);
            setStep(3); // Move to Reset Password step
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || 'Error verifying OTP');
        }
        setLoading(false);
    };

    // Function to reset password
    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:5100/api/forget-password/reset-password', { email, password });
            toast.success(response.data.message);
            navigate("/login");
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error resetting password');
        }
        setLoading(false);
    };

    return (
        <section className='EmailVerification-section'>
            <div className="EmailVerification-container">
                <div className="main-container">
                    <div className="right">
                        <div className="heading">
                            <span>Set New Password</span>
                        </div>
                        {step === 1 && (
                            <form onSubmit={handleSendOtp}>
                                <div className="detail">
                                    <input 
                                        required 
                                        type="email" 
                                        name="email" 
                                        onChange={(e) => setEmail(e.target.value)} 
                                        value={email} 
                                        placeholder='Email Id' 
                                        disabled={loading} 
                                    />
                                    <input 
                                        className='btn-grad' 
                                        type="submit" 
                                        value={loading ? 'Loading...' : 'GET OTP'} 
                                        disabled={loading} 
                                    />
                                </div>
                            </form>
                        )}
                        {step === 2 && (
                            <form onSubmit={handleVerifyOtp}>
                                <div className="detail">
                                    <input 
                                        required 
                                        type="text" 
                                        name="otp" 
                                        value={otp} 
                                        onChange={(e) => setOtp(e.target.value)} 
                                        placeholder='Enter OTP' 
                                        disabled={loading} 
                                    />
                                    <p className="text-warning h6">OTP is only valid for 5 minutes.</p>
                                    <input 
                                        className='btn-grad' 
                                        type="submit" 
                                        value={loading ? 'Loading...' : 'Submit OTP'} 
                                        disabled={loading} 
                                    />
                                </div>
                            </form>
                        )}
                        {step === 3 && (
                            <form onSubmit={handleResetPassword}>
                                <div className="detail">
                                    <input 
                                        required 
                                        type="password" 
                                        name="password" 
                                        onChange={(e) => setPassword(e.target.value)} 
                                        value={password} 
                                        placeholder='New Password' 
                                        disabled={loading} 
                                    />
                                    <input 
                                        required 
                                        type="password" 
                                        name="confirmPassword" 
                                        onChange={(e) => setConfirmPassword(e.target.value)} 
                                        value={confirmPassword} 
                                        placeholder='Confirm Password' 
                                        disabled={loading} 
                                    />
                                    <input 
                                        className='btn-grad' 
                                        type="submit" 
                                        value={loading ? 'Loading...' : 'Reset Password'} 
                                        disabled={loading} 
                                    />
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
            <ToastContainer />
        </section>
    );
}

export default ForgetPassword;
