import React, { useState } from 'react';
import './register.css';
import register from './register.png';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const datasend = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when registration starts
    console.log(formData);
    try {
      const response = await axios.post('https://nglx-server.onrender.com/api/register', formData);
      console.log(response.data);
      toast.success('OTP Sent Successfully!', {
        className: 'toast-success'
      });
    //   navigate(`/register/email-verification/${formData.email}`)
      window.location.href = `/register/email-verificaton/${formData.email}`;
    } catch (error) {
      // console.log(error.response.data.error);
      toast.error(error.response.data.error, {
        className: 'toast-error'
      });
    } finally {
      setLoading(false); // Set loading to false when registration finishes
    }
  };

  return (
    <section className='register-section'>
      <div className="register-container">
        <div className="main-register-box">
          <div className="left-bg">
            <img src={register} alt="" />
          </div>
          <div className="register-form-main">
            <div className="heading">
              <span>Register</span>
            </div>
            <form action="" onSubmit={datasend}>
              <input type="text" name='name' onChange={handleChange} placeholder='Enter Your Name' />
              <input type="email" name='email' onChange={handleChange} placeholder='Enter Your Email' />
              <input type="password" name='password' onChange={handleChange} placeholder='Enter Your Password' />
              {/* <input type="text" placeholder='OTP' /> */}
              <div className="button-box">
                <button type='submit' className='btn-grad' disabled={loading}>
                  {loading ? 'Loading...' : 'Register'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Register;
