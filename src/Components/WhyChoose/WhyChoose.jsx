import React from 'react'
import './WhyChoose.css'

function WhyChoose() {
    return (
        <section className='WhyChoose-section'>
            <div className="container">
                <div className="col">
                    <span>Why Choose Us</span>
                </div>
                
                <div className="col">
                    <div className="logo">
                    <i class="ri-truck-fill"></i>
                    </div>
                    <div className="detail">
                        <h2>Fast Delivery</h2>
                        <p></p>
                    </div>
                </div>
                <div className="col">
                    <div className="logo">
                    <i class="ri-luggage-cart-fill"></i>
                    </div>
                    <div className="detail">
                        <h2>Free Shipping</h2>
                        <p></p>
                    </div>
                </div>
                <div className="col">
                    <div className="logo">
                    <i class="ri-arrow-left-line"></i>
                    </div>
                    <div className="detail">
                        <h2>Easy Returns</h2>
                        <p></p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default WhyChoose
