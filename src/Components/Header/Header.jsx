import React, { useState } from 'react'
import './Header.css'
import { Link } from 'react-router-dom'
import logo from './logo.png'

function Header() {
    const [IsMenuActive, setIsMenuActive] = useState(false)
    const login = localStorage.getItem("login")
    const activeMenuToggle = () => {
        setIsMenuActive(!IsMenuActive)
    }

    const menuCloseToggle = () => {
        setIsMenuActive(false)
    }
    return (
        <div className='header-section'>
            <div className="container">
                <div className="menu">
                    <i onClick={activeMenuToggle} class="ri-menu-fill"></i>
                </div>
                <Link to={'/'} onClick={menuCloseToggle} className="logo">
                    <img src={logo} alt="" />
                </Link>
                <ul className='links'>
                    <li><Link to={'/Shop-All'} >SHOP ALL</Link></li>
                    {/* <li><Link to={''} >MAKEUP</Link></li>
                    <li><Link to={''} >SKIN CARE</Link></li>
                    <li><Link to={''} >HAIR CARE</Link></li> */}
                    <li><Link to={'/about'} >ABOUT</Link></li>
                    <li><Link to={'/contact'} >CONTACT</Link></li>
                </ul>
                <div className="cart-box">
                    <Link to={login ? '/profile' : '/login'} ><i class="ri-user-3-fill"></i></Link>
                    <Link to={'/cart'} className="cart">
                        <span>Rs.0</span>
                        <i class="ri-shopping-cart-2-fill"></i>
                    </Link>
                </div>
                <div className={`mob-menu ${IsMenuActive ? 'show-menu' : ''}`}>
                    <div className="cross-box">
                        <i onClick={menuCloseToggle} class="ri-close-line"></i>
                    </div>
                    <ul>
                        <li><Link onClick={menuCloseToggle} to={'/Shop-All'} >SHOP ALL</Link></li>
                        {/* <li><Link to={''} >MAKEUP</Link></li>
                        <li><Link to={''} >SKIN CARE</Link></li>
                        <li><Link to={''} >HAIR CARE</Link></li> */}
                        <li><Link onClick={menuCloseToggle} to={''} >ABOUT</Link></li>
                        <li><Link onClick={menuCloseToggle} to={'/contact'} >CONTACT</Link></li>
                    </ul>
                    <div className="mob-cart-box">
                        <Link to={login ? '/profile' : '/login'} ><i class="ri-user-3-fill"></i></Link>
                        <Link to={'/cart'} onClick={menuCloseToggle} className="cart">
                            <span>$0.00</span>
                            <i class="ri-shopping-cart-2-fill"></i>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
