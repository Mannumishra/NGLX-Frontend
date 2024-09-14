import React, { useEffect, useState } from 'react'
// import './ForgetPassword.css' // Make sure to create a CSS file for custom styling
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom'

function ForgetPassword() {
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, []);
    const [loading, setLoading] = useState(false);
    const [getOtp, setGetOtp] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        newPassword: "",
        otp: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true); // Set loading to true when the request starts
        try {
            const response = await axios.post("http://localhost:5100/api/Password-change-request", formData);
            console.log(response.data);
            toast.success(response.data.msg);
            setGetOtp(true);
        } catch (err) {
            console.log(err);
            console.log(err.response?.data.msg);
            toast.error(err.response?.data?.msg ?? "Internal Server error");
        } finally {
            setLoading(false); // Set loading to false when the request finishes
        }
    }

    const handleOTPSubmit = async (otpevent) => {
        otpevent.preventDefault();
        setLoading(true); // Set loading to true when the request starts
        try {
            const response = await axios.post(`http://localhost:5100/api/Verify-Otp/${formData.email}/${formData.newPassword}`, formData);
            console.log(response.data);
            toast.success(response.data.msg);
            window.location.href = "/login";
        } catch (error) {
            console.log(error);
            console.log(error.response.data.msg);
            toast.error(error.response.data.msg);
        } finally {
            setLoading(false); // Set loading to false when the request finishes
        }
    }

    const resendOTP = async (otpevent) => {
        otpevent.preventDefault();
        setLoading(true); // Set loading to true when the request starts
        try {
            const response = await axios.post(`http://localhost:5100/api/resend-sign-Otp/`, formData);
            console.log(response.data);
            toast.success('OTP Resent Successfully');
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.msg);
        } finally {
            setLoading(false); // Set loading to false when the request finishes
        }
    }

    return (
        <section className='EmailVerification-section'>
            <div className="EmailVerification-container">
                <div className="main-container">
                    <div className="right">
                        <div className="heading">
                            <span>Set New Password</span>
                        </div>
                        <form action="">
                            <div className="detail">
                                <input required type="email" name="email" onChange={handleChange} value={formData.email} placeholder='Email Id' disabled={loading} />
                                <input required type="password" name="newPassword" value={formData.newPassword} onChange={handleChange} placeholder='New Password' disabled={loading} />
                                {getOtp && (
                                    <>
                                        <input required type="text" name="otp" value={formData.otp} onChange={handleChange} placeholder='Enter OTP' disabled={loading} />
                                        <p className="text-warning h6">OTP is only valid for 5 minutes.</p>
                                        <div className="flex">
                                            <div className="keep">
                                                <Link onClick={resendOTP} style={{ color: 'red', pointerEvents: loading ? 'none' : 'auto' }}>
                                                    {loading ? 'Resending...' : 'Resend OTP'}
                                                </Link>
                                            </div>
                                        </div>
                                    </>
                                )}
                                {getOtp ? (
                                    <input onClick={handleOTPSubmit} className='btn-grad' type="submit" value={loading ? 'Loading...' : 'Submit OTP'} disabled={loading} />
                                ) : (
                                    <input onClick={handleSubmit} className='btn-grad' type="submit" value={loading ? 'Loading...' : 'GET OTP'} disabled={loading} />
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </section>
    )
}

export default ForgetPassword;
