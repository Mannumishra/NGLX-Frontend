import React, { useEffect, useState } from 'react'
import './EmailVerification.css'
import { Link, useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'

function EmailVerification() {
    const [loading, setLoading] = useState(false);
    const [resend , setResending] = useState(false)
    const navigate = useNavigate()

    const { email } = useParams()
    console.log(email)

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const [formData, setFormData] = useState({
        email: email,
        otp: ""
    })

    const handleResendOtpSubmit = async (otpevent) => {
        otpevent.preventDefault();
        setResending(true); // Set loading to true when resending OTP starts
        try {
            const response = await axios.post("https://nglx-server.onrender.com/api/resend-sign-Otp", formData)
            console.log(response.data);
            toast.success('OTP Resent');
        } catch (error) {
            console.log(error);
            toast.error('Failed to resend OTP');
        } finally {
            setResending(false); // Set loading to false when resending OTP finishes
        }
    }

    const handleOtpSubmit = async (otpevent) => {
        otpevent.preventDefault();
        setLoading(true); // Set loading to true when OTP verification starts
        try {
            console.log(formData);
            const response = await axios.post("https://nglx-server.onrender.com/api/Verify-sign-Otp", formData)
            toast.success(response.data.message);
            navigate('/login');
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || 'OTP verification failed');
        } finally {
            setLoading(false); // Set loading to false when OTP verification finishes
        }
    }

    return (
        <section className='EmailVerification-section'>
            <div className="EmailVerification-container">
                <div className="main-container">
                    <div className="right">
                        <div className="heading">
                            <span>Email Verification</span>
                        </div>
                        <form action="">
                            <div className="detail">
                                {/* <input required type="email" name="email" value={email} /> */}
                                <input required type="number" name="otp" value={formData.otp} onChange={handleChange} placeholder='Enter OTP' />
                                <div className="resend-btn">
                                    <Link style={{ color: 'red' }} onClick={handleResendOtpSubmit} disabled={loading}>
                                        {resend ? 'Resending...' : 'Resend OTP'}
                                    </Link>
                                </div>
                            </div>
                            <div className="button">
                                <button className='btn-grad' onClick={handleOtpSubmit} type='submit' disabled={loading}>
                                    {loading ? 'Loading...' : 'SIGN IN'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default EmailVerification;
