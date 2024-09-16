import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './FinalCart.css';
import toast from 'react-hot-toast';

function FinalCart() {
  const userId = localStorage.getItem("userid");
  const [formData, setFormData] = useState({
    // userId: "123456",
    userId: userId,
    name: '',
    email: '',
    phone: '',
    address: '',
    state: '',
    city: '',
    pin: '',
    cartItems: [],
    totalPrice: 0,
    transactionId: '',
    orderStatus: 'Order Is Placed',
    paymentMode: 'Online Payment',
    paymentStatus: 'Pending'
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const cartKey = location.state?.source === 'buyNow' ? 'nglxcartItemsBuynow' : 'nglxcartItems';

  // Effect to retrieve cart items from localStorage
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem(cartKey)) || [];
    console.log("items retrieved from localStorage:", items); // Check items retrieved
    setFormData(prev => ({ ...prev, cartItems: items }));
  }, [cartKey]);

  // Effect to calculate total price
  useEffect(() => {
    if (formData.cartItems.length > 0) {
      const total = formData.cartItems.reduce((acc, item) => acc + (item.productprice * item.productquantity), 0);
      setFormData(prev => ({ ...prev, totalPrice: total }));
      console.log("Updated total price:", total); // Check total price calculation
    }
  }, [formData.cartItems]);

  // Handle input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle payment mode change
  const handlePaymentModeChange = (e) => {
    setFormData(prev => ({ ...prev, paymentMode: e.target.value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (formData.paymentMode === 'Cash on Delivery') {
      try {
        console.log(formData)
        const response = await axios.post('http://localhost:5100/api/checkout', formData);
        toast.success('checkout completed successfully!');
        localStorage.removeItem(cartKey);
        navigate('/order-confirmation');
      } catch (error) {
        console.error(error);
        toast.error('Error during checkout. Please try again.');
      } finally {
        setLoading(false);
      }
    } else {
      handleRazorpayPayment();
    }
  };

  // Handle Razorpay payment for Online Payment
  const handleRazorpayPayment = async () => {
    try {
      const response = await axios.post('http://localhost:5100/api/checkout', formData);
      const { razorpayOrderId, amount, currency } = response.data;

      const amountInPaise = Math.round(amount);

      const options = {
        key: 'rzp_test_XPcfzOlm39oYi8', // Replace with your Razorpay key
        amount: amountInPaise.toString(),
        currency: currency,
        name: 'Your Company Name',
        description: 'Payment for your order',
        order_id: razorpayOrderId,
        handler: async function (response) {
          const paymentId = response.razorpay_payment_id;
          const orderId = response.razorpay_order_id;
          const signature = response.razorpay_signature;

          try {
            await axios.post('http://localhost:5100/api/verify-payment', {
              razorpay_payment_id: paymentId,
              razorpay_order_id: orderId,
              razorpay_signature: signature,
            });
            toast.success('Payment successful!');
            localStorage.removeItem(cartKey);
            navigate('/order-confirmation');
          } catch (error) {
            console.error('Payment verification error:', error);
            toast.error('Error verifying payment. Please try again.');
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: '#3399cc',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Payment initiation error:', error);
      toast.error('Error initiating payment. Please try again.');
    }
  };

  return (
    <section className="container mx-auto mt-7 px-4 md:px-0">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2">
          <div>
            <p className="text-2xl md:text-4xl font-bold">Order Summary</p>
            <p className="text-gray-500">Check your items and select a suitable shipping method.</p>
            <div className="mt-4 p-3 border rounded bg-white">
              {formData.cartItems.length > 0 ? (
                formData.cartItems.map((item, index) => {
                  const itemTotalPrice = item.productprice * (item.productquantity || 1);
                  return (
                    <>
                      <div key={item.id || index} className="flex flex-col md:flex-row mb-3 p-2 border rounded">
                        <img
                          className="m-2 rounded border order-summary-img"
                          src={item.productimage}
                          alt={item.productname}
                          style={{ maxWidth: "100px", maxHeight: "100px" }}
                        />
                        <div className="flex-grow flex flex-col justify-between px-3 py-2">
                          <span className="product-name font-bold">{item.productname}</span>
                          <span className="text-lg font-bold">Quantity: {item.productquantity}</span>
                          <p className="text-lg font-bold text-red-600">Rs {itemTotalPrice}</p>

                        </div>
                      </div>
                    </>
                  );
                })
              ) : (
                <p>No products in the cart</p>
              )}
              <div>
                <p className='text-xl font-bold'>Total Price - {formData.totalPrice}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="md:w-1/2 mt-4 md:mt-0 md:ml-4">
          <div className="bg-gray-100 p-4 rounded">
            <p className="text-xl font-bold">Billing Address</p>
            <p className="text-gray-500">Complete your order by providing your Address details.</p>
            <form onSubmit={handleSubmit}>
              <div className="mt-3">
                <label htmlFor="street" className="font-bold">Name</label>
                <input
                  onChange={handleChange}
                  type="text"
                  required
                  id="street"
                  value={formData.name}
                  name="name"
                  className="form-control border outline-none rounded-md p-2 block w-full mt-1"
                  placeholder="Name"
                />
              </div>
              <div className="mt-3">
                <label htmlFor="street" className="font-bold">Phone</label>
                <input
                  onChange={handleChange}
                  type="text"
                  required
                  id="street"
                  value={formData.phone}
                  name="phone"
                  className="form-control border outline-none rounded-md p-2 block w-full mt-1"
                  placeholder="Phone"
                />
              </div>
              <div className="mt-3">
                <label htmlFor="street" className="font-bold">Email</label>
                <input
                  onChange={handleChange}
                  type="email"
                  required
                  id="street"
                  value={formData.email}
                  name="email"
                  className="form-control border outline-none rounded-md p-2 block w-full mt-1"
                  placeholder="Email Address"
                />
              </div>

              <div className="mt-3">
                <label htmlFor="street" className="font-bold">Address</label>
                <input
                  onChange={handleChange}
                  type="text"
                  required
                  id="street"
                  value={formData.address}
                  name="address"
                  className="form-control border outline-none rounded-md p-2 block w-full mt-1"
                  placeholder="Street Address"
                />
              </div>
              <div className="mt-3">
                <label htmlFor="city" className="font-bold">City</label>
                <input
                  onChange={handleChange}
                  type="text"
                  required
                  id="city"
                  value={formData.city}
                  name="city"
                  className="form-control border outline-none rounded-md p-2 block w-full mt-1"
                  placeholder="Enter Your City"
                />
              </div>
              <div className="mt-3">
                <label htmlFor="state" className="font-bold">State</label>
                <input
                  onChange={handleChange}
                  type="text"
                  required
                  id="state"
                  name="state"
                  value={formData.state}
                  className="form-control p-2 block outline-none border rounded-md mt-1 w-full"
                  placeholder="Enter your State"
                />
              </div>
              <div className="mt-3">
                <label htmlFor="pin" className="font-bold">Pincode</label>
                <input
                  onChange={handleChange}
                  type="number"
                  required
                  id="pin"
                  name="pin"
                  value={formData.pin}
                  className="form-control p-2 block outline-none border rounded-md mt-1 w-full"
                  placeholder="Enter your Pincode"
                />
              </div>
              <div className="mt-3">
                <label htmlFor="paymentMode" className="font-bold">Payment Type</label>
                <select
                  onChange={handlePaymentModeChange}
                  id="paymentMode"
                  name="paymentMode"
                  value={formData.paymentMode}
                  className="form-control p-2 block outline-none border rounded-md mt-1 w-full"
                >
                  <option value="Cash on Delivery">Cash on Delivery</option>
                  <option value="Online Payment">Online Payment</option>
                </select>
              </div>

              <button
                disabled={loading}
                type="submit"
                className="mt-4 bg-green-600 text-white p-3 block w-full text-center rounded-md font-bold"
              >
                {loading ? 'Processing...' : 'Complete checkout'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FinalCart;
