import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import './Cart.css';
import cartbg from './cart.png'

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [quantity, setQuantity] = useState({});
  const userid = localStorage.getItem('userid'); // Assuming you store userid in localStorage

  const handleLogout = () => {
    navigate('/login');
    toast.success("Logout Successful");
  };

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const userCartItems = storedCartItems.filter(item => item.userid === userid);
    setCartItems(userCartItems);

    const storedQuantities = JSON.parse(localStorage.getItem('quantities')) || {};
    setQuantity(storedQuantities);
  }, [userid]);

  const handleDecrease = (item) => {
    if (item && item._id && (quantity[item._id] || 1) > 1) {
      setQuantity(prevQuantity => {
        const newQuantity = { ...prevQuantity, [item._id]: (prevQuantity[item._id] || 1) - 1 };
        localStorage.setItem('quantities', JSON.stringify(newQuantity));
        return newQuantity;
      });
    } else {
      handleRemove(item);
    }
  };

  const handleIncrease = (item) => {
    if (item && item._id) {
      setQuantity(prevQuantity => {
        const newQuantity = { ...prevQuantity, [item._id]: (prevQuantity[item._id] || 1) + 1 };
        localStorage.setItem('quantities', JSON.stringify(newQuantity));
        return newQuantity;
      });
    }
  };

  const handleRemove = (item) => {
    if (item && item._id) {
      setCartItems(prevCartItems => {
        const updatedCartItems = prevCartItems.filter(cartItem => cartItem._id !== item._id);
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
        return updatedCartItems;
      });

      setQuantity(prevQuantity => {
        const newQuantity = { ...prevQuantity };
        delete newQuantity[item._id];
        localStorage.setItem('quantities', JSON.stringify(newQuantity));
        return newQuantity;
      });
    }
  };

  const totalAmount = cartItems.reduce((acc, item) => acc + (item.afterdiscount * (quantity[item._id] || 1)), 0);
  const totalMainPrice = cartItems.reduce((acc, item) => acc + (item.mainPrice * (quantity[item._id] || 1)), 0);
  const shippingFee = totalAmount > 450 ? 0 : 50;

  localStorage.setItem("Price", totalAmount);

  const handleCheckout = () => {
    const orderData = {
      items: cartItems,
      quantities: quantity,
      totalMRP: totalMainPrice,
      finalPrice: totalAmount,
      shippingFee
    };
    localStorage.setItem('orderData', JSON.stringify(orderData));
    navigate('/cart/finalcart');
  };

  if (cartItems.length === 0) {
    return (
      <section className='cart-section'>
        <div className="cart-container">
          <div className="empty-box">
            <img src={cartbg} alt="" />
            <p>Your Cart is empty</p>
            <Link className='btn-grad' to={'/Shop-All'}>Go to Shopping</Link>
          </div>
        </div>
      </section>
    );
  } else {
    return (
      <>
        <section className='cart-section'>
          <div className="cart-container">
            <div className="heading">
              <h2>Shopping Cart</h2>
            </div>
            <div className="main-container">
              <div className="left">
                {cartItems.map((item, index) => (
                  <div key={index} className="row">
                    <div className="img">
                      <img src={item.images && item.images[0] ? item.images[0] : 'fallback-image.png'} alt={item.name} />
                    </div>
                    <div className="content">
                      <div className="price">
                        <h2>Rs.{item.afterdiscount}</h2>
                        <del>Rs.{item.mainPrice}</del>
                      </div>
                      <div className="name-in">
                        <h1 className='product-name'>{item.productName}</h1>
                        <div className="count">
                          <div className="pluse" onClick={() => handleDecrease(item)}>
                            <i className="ri-subtract-fill"></i>
                          </div>
                          <div className="input">
                            <span>{quantity[item._id] || 1}</span>
                          </div>
                          <div className="mines" onClick={() => handleIncrease(item)}>
                            <i className="ri-add-fill"></i>
                          </div>
                        </div>
                        <button className='Remove-Btn' onClick={() => handleRemove(item)}>Remove</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="right">
                <div className="p-box">
                  <div className="price-box">
                    <h4>Total Amount</h4>
                    <p>Rs.{totalMainPrice}</p>
                  </div>
                  <div className="final-price">
                    <h4>Final Amount</h4>
                    <p>Rs.{totalAmount}</p>
                  </div>
                  <div className="shipping-fee">
                    <h4>Shipping Fee</h4>
                    <p>Rs.{shippingFee}</p>
                  </div>
                  <p>Pan India Free Shipping for orders above ₹450</p>
                  <button onClick={handleCheckout} className='CHECKOUT-btn'>
                    <i className="ri-git-repository-private-fill"></i> CHECKOUT SECURELY
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </>
    );
  }
};

export default Cart;
