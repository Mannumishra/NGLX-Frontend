import React, { useEffect } from 'react'
import './Term.css'

function Term() {
    useEffect(()=>{
        window.scrollTo({
            top : 0,
            behavior : "smooth"
        })
    },[])
    return (
        <div className="container">
          <header className="header">
            <h1 className="title">Terms & Conditions</h1>
            <p className="subtitle">Effective Date: [Insert Date]</p>
          </header>
          <section className="content">
            <p>Welcome to NGL-X. By accessing or using our website and services, you agree to comply with and be bound by the following Terms & Conditions. Please read them carefully.</p>
            <ol className="list">
              <li className="section">
                <h2 className="section-title">Use of the Website</h2>
                <p><strong>Eligibility:</strong> You must be at least 18 years old to use this website and make purchases.</p>
                <p><strong>Account:</strong> You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.</p>
              </li>
              <li className="section">
                <h2 className="section-title">Orders and Payment</h2>
                <p><strong>Product Availability:</strong> All products are subject to availability. We reserve the right to limit the quantities of any products or services that we offer.</p>
                <p><strong>Pricing:</strong> Prices for our products are subject to change without notice. We are not responsible for typographical errors in pricing.</p>
                <p><strong>Payment:</strong> We accept various forms of payment, including credit cards and other electronic payment methods. By providing a payment method, you authorize us to charge the applicable fees to your designated payment method.</p>
              </li>
              <li className="section">
                <h2 className="section-title">Shipping and Delivery</h2>
                <p><strong>Shipping:</strong> We ship products to various locations. Shipping costs and delivery times vary depending on the destination.</p>
                <p><strong>Delivery:</strong> Estimated delivery times are provided as guidelines only and do not guarantee delivery dates.</p>
              </li>
              <li className="section">
                <h2 className="section-title">Returns and Refunds</h2>
                <p><strong>Returns:</strong> If you are not satisfied with your purchase, you may return it within [insert number] days of receipt for a refund or exchange, subject to our Return Policy.</p>
                <p><strong>Refunds:</strong> Refunds will be issued to the original payment method within a reasonable period after receiving the returned product.</p>
              </li>
              <li className="section">
                <h2 className="section-title">Intellectual Property</h2>
                <p><strong>Ownership:</strong> All content on this website, including text, graphics, logos, images, and software, is the property of NGL-X or its content suppliers and is protected by intellectual property laws.</p>
                <p><strong>Use:</strong> You may not reproduce, distribute, or otherwise use any content from this website without our express written permission.</p>
              </li>
              <li className="section">
                <h2 className="section-title">User Conduct</h2>
                <p><strong>Prohibited Activities:</strong> You agree not to use the website for any unlawful purpose or in a way that could harm NGL-X or any third party. This includes, but is not limited to, transmitting harmful or disruptive code, engaging in fraudulent activities, or infringing on intellectual property rights.</p>
              </li>
              <li className="section">
                <h2 className="section-title">Disclaimers and Limitation of Liability</h2>
                <p><strong>As-Is Basis:</strong> Our website and services are provided "as is" and "as available" without any warranties of any kind, either express or implied.</p>
                <p><strong>Limitation of Liability:</strong> To the fullest extent permitted by law, NGL-X shall not be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with your use of the website or purchase of products.</p>
              </li>
              <li className="section">
                <h2 className="section-title">Governing Law</h2>
                <p>These Terms & Conditions are governed by and construed in accordance with the laws of [insert jurisdiction]. Any disputes arising from these terms or your use of the website will be resolved in the courts of [insert jurisdiction].</p>
              </li>
            </ol>
          </section>
          <footer className="footer">
            <div className="contact">
              <h2 className="contact-title">Contact Us</h2>
              <p>If you have any questions about these Terms & Conditions, please contact us at:</p>
              <p className="contact-info">NGL-X</p>
              <p className="contact-info">[Your Address]</p>
              <p className="contact-info">[Your Email Address]</p>
              <p className="contact-info">[Your Phone Number]</p>
            </div>
          </footer>
        </div>
      );
}

export default Term
