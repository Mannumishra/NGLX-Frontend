import React from 'react'
import './Footer.css'
import logo from './logo.png'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="newsletter-row">
          <div className="left">
            <h2>Subscribe to our newsletter</h2>
          </div>
          <div className="right">
            <div className="input-box">
              <input type="text" placeholder='Your Email Address...' />
              <button>SUBSCRIBE</button>
            </div>
          </div>
        </div>
        <div className="footer-row">
          <div className="left">
            <div className="img">
              <img src={logo} alt="" />
            </div>
          </div>
          <div className="right">
            <div className="col">
              <ul>
                <li><Link to={'/Shop-All'}>Shop Now</Link></li>
                <li><Link>Makeup</Link></li>
                <li><Link>Lipstick</Link></li>
              </ul>
            </div>
            <div className="col">
            <ul>
                <li><Link>Refund Policy</Link></li>
                <li><Link to={'/term'}>Terms & Conditions</Link></li>
                <li><Link>FAQ</Link></li>
                <li><Link to={'/privacy'}>Privacy Policy</Link></li>
              </ul>
            </div>
            <div className="col">
            <i class="ri-facebook-box-fill"></i>
            <i class="ri-twitter-fill"></i>
            <i class="ri-instagram-fill"></i>
            </div>
          </div>
        </div>
        <div className="bottom-footer">
          <p>Copyright © 2024 Be NGL-X | Designed By <Link to={'https://digiindiasolutions.com/'}>DIGI India Solutions</Link> </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
