import React, { useEffect, useState } from 'react';
import './Cart.css';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  // Fetch cart data from localStorage
  const getCartData = () => {
    const cartData = JSON.parse(localStorage.getItem('nglxcartItems')) || [];
    setData(cartData);
  };

  // Update item quantity
  const updateItem = (id, action) => {
    const updatedCart = data.map(item => {
      if (item.id === id) {
        if (action === 'INC') {
          return { ...item, productquantity: item.productquantity + 1 };
        } else if (action === 'DEC' && item.productquantity > 1) {
          return { ...item, productquantity: item.productquantity - 1 };
        }
      }
      return item;
    });

    setData(updatedCart);
    localStorage.setItem('nglxcartItems', JSON.stringify(updatedCart));
  };

  // Delete item from cart
  const deleteItem = (id) => {
    const updatedCart = data.filter(item => item.id !== id);
    setData(updatedCart);
    localStorage.setItem('nglxcartItems', JSON.stringify(updatedCart));
  };

  // Calculate total price of items in cart
  const calculateTotalPrice = () => {
    return data.reduce((total, item) => total + item.productprice * item.productquantity, 0);
  };

  useEffect(() => {
    getCartData();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const totalMainPrice = calculateTotalPrice();
  const shippingFee = totalMainPrice > 450 ? 0 : 50; // Free shipping above ₹450
  const totalAmount = totalMainPrice + shippingFee;

  // Handlers for increasing, decreasing quantity, and removing items
  const handleDecrease = (item) => updateItem(item.id, 'DEC');
  const handleIncrease = (item) => updateItem(item.id, 'INC');
  const handleRemove = (item) => deleteItem(item.id);

  // Handle logout
  const handleLogout = () => {
    sessionStorage.removeItem("login");
    // Add logout redirection logic here if needed
  };

  return (
    <>
      <section className='cart-section'>
        <div className="cart-container">
          <div className="heading">
            <h2>Shopping Cart</h2>
          </div>
          <div className="main-container">
            <div className="left">
              {data.length > 0 ? (
                data.map((item, index) => (
                  <div key={index} className="row">
                    <div className="img">
                      <img src={item.productimage || 'fallback-image.png'} alt={item.productname} />
                    </div>
                    <div className="content">
                      <div className="price">
                        <h2>Rs.{item.productprice*item.productquantity}</h2>
                      </div>
                      <div className="name-in">
                        <h1 className='product-name'>{item.productname}</h1>
                        <div className="count">
                          <div className="pluse" onClick={() => handleDecrease(item)}>
                            <i className="ri-subtract-fill"></i>
                          </div>
                          <div className="input">
                            <span>{item.productquantity || 1}</span>
                          </div>
                          <div className="pluse" onClick={() => handleIncrease(item)}>
                            <i className="ri-add-fill"></i>
                          </div>
                        </div>
                        <button className='Remove-Btn' onClick={() => handleRemove(item)}>Remove</button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>Your cart is empty.</p>
              )}
            </div>
            <div className="right">
              <div className="p-box">
                <table className="price-table">
                  <tbody>
                    <tr>
                      <td><h4>Total Price</h4></td>
                      <td><p>Rs.{totalMainPrice}</p></td>
                    </tr>
                    <tr>
                      <td><h4>Shipping Fee</h4></td>
                      <td><p>Rs.{shippingFee}</p></td>
                    </tr>
                    <tr className="final-row">
                      <td><h4>Final Amount</h4></td>
                      <td><p>Rs.{totalAmount}</p></td>
                    </tr>
                  </tbody>
                </table>
                <p>Pan India Free Shipping for orders above ₹450</p>
                <Link to="/cart/finalcart" state={{ fromCart: "/cart" }} className="CHECKOUT-btn">
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <button onClick={handleLogout} className="logout-button">Logout</button>
    </>
  );
};

export default Cart;
