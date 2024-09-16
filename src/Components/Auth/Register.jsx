import React, { useState } from 'react';
import './register.css';
import register from './register.png';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });
  const [imageFile, setImageFile] = useState(null); // To handle image separately

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]); // Capture the file
  };

  const datasend = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when registration starts

    console.log("Form Data:", formData);
    console.log("Image File:", imageFile);
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('phone', formData.phone);
    formDataToSend.append('password', formData.password);
    if (imageFile) {
      formDataToSend.append('image', imageFile); // Append image if present
    }
    // for (let pair of formDataToSend.entries()) {
    //   console.log(`${pair[0]}: ${pair[1]}`);
    // }
    try {
      const response = await axios.post('http://localhost:5100/api/user', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response.data);
      toast.success(response.data.message, {
        className: 'toast-success',
      });
      navigate("/login")
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || 'Registration Failed', {
        className: 'toast-error',
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
            <img src={register} alt="Register" />
          </div>
          <div className="register-form-main">
            <div className="heading">
              <span>Register</span>
            </div>
            <form onSubmit={datasend}>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter Your Name"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter Your Email"
                required
              />
              <input
                type="number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter Your Phone"
                required
              />
              <input
                type="file"
                name="image"
                onChange={handleFileChange} // Handle file input separately
              />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter Your Password"
                required
              />
              <div className="button-box">
                <button type="submit" className="btn-grad" disabled={loading}>
                  {loading ? 'Loading...' : 'Register'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;
