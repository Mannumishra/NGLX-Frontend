import React, { useEffect, useState } from 'react'
import './Contact.css'
import toast from 'react-hot-toast'
import axios from 'axios'

function Contact() {
  useEffect(() => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
}, [])

const [formdata,setformdata] = useState({
    Name : '',
    Email : '' ,
    PhoneNumber : '',
    Message : ''
})

const handlechange = (e) =>{
    const { name, value } = e.target;
    setformdata((prevData) => ({
        ...prevData,
       [name]: value,
    }))
}

const formdatafetch = async(e) =>{
    e.preventDefault()
    try {
        const response = await axios.post('https://nglx-server.onrender.com/api/createcontact',formdata);
        toast.success('Message Sent Successfully!')
        console.log(response)
    } catch (error) {
        console.log(error)
        toast.error("Error Occured")
    }
}
  return (
    <section className='contact-section'>
      <div className="contact-container">
        <div className="bg">

        </div>
        <div className="contact-detail">
            <div className="left">
                <h2>Contact</h2>
                <p>We love hearing from our customers. If you have a question please get in touch and speak to one of our consultants.</p>
                <a href='' className="same">
                <i class="ri-map-pin-line"></i>
                112 Floor, Sastri Nagar, New Delhi
                </a>
                <a href="mailto:" className="same">
                <i class="ri-mail-fill"></i>
                demo@gmail.com
                </a>
                <a href="tel: +91" className="same">
                <i class="ri-phone-fill"></i>
                +91 1234567890
                </a>
            </div>
            <form onSubmit={formdatafetch} className="right">
                <div className="name same">
                <input type="text" value={formdata.Name} placeholder='Name' name='Name' onChange={handlechange} required />
                </div>
                <div className="email same">
                <input type="email" placeholder='Email' value={formdata.Email} name='Email' onChange={handlechange} required />
                </div>
                <div className="phone same">
                <input type="text" placeholder='Phone No.' value={formdata.PhoneNumber} name='PhoneNumber' onChange={handlechange} required />
                </div>
                <div className="mssg">
                <textarea placeholder='Message' value={formdata.Message} name='Message' onChange={handlechange} required></textarea>
                </div>
                <button type='submit'>SEND</button>
            </form>
        </div>
        <a href='https://www.google.com/maps/place/Shastri+Nagar,+Delhi/@28.6760289,77.1694568,15z/data=!3m1!4b1!4m6!3m5!1s0x390d0265bf322413:0x3f7337cf3935112a!8m2!3d28.6746196!4d77.1801757!16s%2Fg%2F1hhw711wl?entry=ttu' className="map">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14001.820541525063!2d77.16945682791295!3d28.67602888623855!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d0265bf322413%3A0x3f7337cf3935112a!2sShastri%20Nagar%2C%20Delhi!5e0!3m2!1sen!2sin!4v1717046713311!5m2!1sen!2sin"  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </a>
      </div>
    </section>
  )
}

export default Contact
