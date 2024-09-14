import React, { useEffect } from 'react';
import './PrivacyPolicy.css';

const Privacy = () => {
    useEffect(()=>{
        window.scrollTo({
            top : 0,
            behavior : "smooth"
        })
    },[])
  return (
    <div className="privacy-policy">
      <header className="privacy-header">
        <h1>Privacy Policy</h1>
        {/* <p className="effective-date">Effective Date: [Insert Date]</p> */}
      </header>

      <section>
        <h2>1. Information We Collect</h2>
        <p><strong>Personal Information:</strong> When you create an account, place an order, or subscribe to our newsletter, we may collect personal information such as your name, email address, phone number, shipping address, and payment details.</p>
        <p><strong>Usage Data:</strong> We may collect information about your interaction with our website, such as your IP address, browser type, pages visited, and time spent on our site.</p>
      </section>

      <section>
        <h2>2. How We Use Your Information</h2>
        <p><strong>Order Processing:</strong> To process and fulfill your orders, including sending order confirmations and updates.</p>
        <p><strong>Customer Service:</strong> To provide support and respond to your inquiries.</p>
        <p><strong>Marketing:</strong> To send promotional materials, newsletters, and offers that may interest you, if you have opted in to receive such communications.</p>
        <p><strong>Improvement:</strong> To improve our website, products, and services based on your feedback and usage patterns.</p>
      </section>

      <section>
        <h2>3. How We Share Your Information</h2>
        <p><strong>Service Providers:</strong> We may share your information with third-party service providers who assist us with payment processing, shipping, marketing, and website analytics.</p>
        <p><strong>Legal Requirements:</strong> We may disclose your information if required by law or in response to valid requests by public authorities.</p>
      </section>

      <section>
        <h2>4. Data Security</h2>
        <p>We implement appropriate technical and organizational measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.</p>
      </section>

      <section>
        <h2>5. Your Rights</h2>
        <p><strong>Access and Update:</strong> You have the right to access and update your personal information.</p>
        <p><strong>Opt-Out:</strong> You can opt-out of receiving marketing communications from us by following the unsubscribe link in the emails.</p>
        <p><strong>Deletion:</strong> You may request the deletion of your personal data, subject to legal and contractual obligations.</p>
      </section>

      <section>
        <h2>6. Cookies</h2>
        <p>We use cookies to enhance your browsing experience and analyze site traffic. You can control cookie settings through your browser.</p>
      </section>

      <section>
        <h2>7. Changes to This Policy</h2>
        <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page with the updated effective date.</p>
      </section>

      <section>
        <h2>8. Contact Us</h2>
        <p>If you have any questions or concerns about this Privacy Policy, please contact us at:</p>
        <address>
          NGL-X<br />
          New Delhi<br />
          <a href="mailto:">demo@gmail.com</a><br />
          00000000
        </address>
      </section>
    </div>
  );
};

export default Privacy;
