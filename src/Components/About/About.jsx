import React from 'react'
import './About.css'
import WhyChoose from '../WhyChoose/WhyChoose'

function About() {
  return (
    <section className='about-section'>
      <div className="about-container">
        <div className="bg">
            <div className="content">
                <span>A FEW WORDS</span>
                <h2>About Us</h2>
            </div>
        </div>
        <div className="one">
            <span>About Us</span>
            <h2>Welcome to NGL-X, your ultimate destination for premium cosmetic products that redefine beauty and skincare. At NGL-X, we believe that beauty is more than skin deep. Our mission is to empower individuals to express their unique selves through high-quality cosmetics and skincare solutions that enhance natural beauty and promote self-confidence.</h2>
        </div>
        <div className="one">
            <span>Who We Are</span>
            <h2>NGL-X is a forward-thinking cosmetics brand dedicated to innovation, quality, and sustainability. Our journey began with a passion for creating products that not only meet the highest standards of beauty but also contribute to a healthier and more environmentally conscious world. Each product is meticulously crafted with the finest ingredients, ensuring that our customers receive nothing but the best.</h2>
        </div>
        <div className="one">
            <span>Our Commitment</span>
            <h2>At NGL-X, we are committed to ethical practices and sustainability. Our products are cruelty-free and made with eco-friendly packaging, ensuring that you can feel good about every purchase. We strive to minimize our environmental footprint and contribute positively to the planet.</h2>
        </div>
        <div className="one">
            <WhyChoose />
        </div>
      </div>
    </section>
  )
}

export default About
