import React, { useEffect, useState } from 'react';
import './Profile.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Profile() {
    const userID = localStorage.getItem("userid");
    const [userData, setUserData] = useState({});
    const [orderData, setOrderData] = useState([]);
    const navigate = useNavigate();

    // Fetch user data
    const getApiData = async () => {
        try {
            const res = await axios.get(`http://localhost:5100/api/user/${userID}`);
            setUserData(res.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    // Fetch order data
    const getOrderData = async () => {
        try {
            const res = await axios.get(`http://localhost:5100/api/checkout/user/${userID}`);
            setOrderData(res.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    // Cancel order function
    const cancelOrder = async (orderID) => {
        try {
            const res = await axios.put(`http://localhost:5100/api/checkout/cancel/${orderID}`);
            if (res.data.success) {
                alert("Order cancelled successfully.");
                getOrderData();  // Fetch updated order data
            } else {
                alert("Failed to cancel the order.");
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred while canceling the order.");
        }
    };


    useEffect(() => {
        getApiData();
        getOrderData();
    }, [userID]);

    const handleLogout = () => {
        localStorage.removeItem("login");
        localStorage.removeItem("userid");
        localStorage.removeItem("token");
        navigate("/login");
    };

    const handleChangePassword = () => {
        navigate("/change-password")
    };

    return (
        <section className="Profile-section">
            <div className="Profile-container">
                <div className="Profile-header">
                    <div className="Profile-avatar">
                        <img
                            src={userData.image || "https://via.placeholder.com/150"}
                            alt="User Avatar"
                        />
                    </div>
                    <div className="Profile-info">
                        <h2>{userData.name || "John Doe"}</h2>
                        <p>Email: {userData.email || "johndoe@example.com"}</p>
                        <p>Phone: {userData.phone || "+123 456 7890"}</p>
                        <div className="Profile-actions">
                            <button className="Edit-profile-btn">Edit Profile</button>
                            <button className="Change-password-btn" onClick={handleChangePassword}>Change Password</button>
                            <button className="Logout-btn" onClick={handleLogout}>Logout</button>
                        </div>
                    </div>
                </div>

                <div className="order-history-section">
                    <h3>Order History</h3>
                    {orderData.length > 0 ? (
                        orderData.map((item, index) => (
                            <div key={index} className="order-card">
                                <div className="order-summary">
                                    <p><strong>Order ID:</strong> {item._id}</p>
                                    <p><strong>Order Status:</strong> {item.orderStatus}</p>
                                    <p><strong>Payment Mode:</strong> {item.paymentMode}</p>
                                    <p><strong>Payment Status:</strong> {item.paymentStatus}</p>
                                    <p><strong>Total:</strong> ₹{item.totalPrice}</p>
                                    <p><strong>Date:</strong> {(new Date(item.createdAt)).toLocaleDateString()}</p>
                                </div>
                                <div className="order-products">
                                    {item.cartItems && item.cartItems.length > 0 ? (
                                        item.cartItems.map((product, idx) => (
                                            <div key={idx} className="product-details">
                                                <img src={product.productimage} alt={product.productname} />
                                                <p>{product.productname}</p>
                                                <p>{product.productnumberofitem} items</p>
                                                <p>₹{product.productprice} x {product.productquantity}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <p>No products found in this order.</p>
                                    )}
                                </div>
                                {item.orderStatus !== "Cancelled" && (
                                    <button
                                        className="Cancel-order-btn"
                                        onClick={() => cancelOrder(item._id)}
                                    >
                                        Cancel Order
                                    </button>
                                )}

                            </div>
                        ))
                    ) : (
                        <p>No orders found.</p>
                    )}
                </div>
            </div>
        </section>
    );
}

export default Profile;
