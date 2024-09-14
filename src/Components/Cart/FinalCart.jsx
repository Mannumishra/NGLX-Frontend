import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './FinalCart.css';
import toast from 'react-hot-toast';

function FinalCart() {
  const navigate = useNavigate();
  const [totalPrice, setTotalPrice] = useState(0);
  const [orderData, setOrderData] = useState(null);

  const [Order, setOrder] = useState({
    address: {
      street: '',
      city: '',
      state: '',
      pincode: ''
    },
    PyamentType: ''
  });

  useEffect(() => {
    const storedOrderData = JSON.parse(localStorage.getItem('orderData'));
    if (storedOrderData) {
      setOrderData(storedOrderData);
      const calculatedTotalPrice = storedOrderData.items.reduce((acc, item) => {
        const quantity = storedOrderData.quantities[item._id] || 1;
        return acc + item.afterdiscount * quantity;
      }, 0);
      setTotalPrice(calculatedTotalPrice);
    } else {
      navigate('/cart');
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrder((prevOrder) => ({
      ...prevOrder,
      address: {
        ...prevOrder.address,
        [name]: value
      },
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userInfo = JSON.parse(localStorage.getItem('userInfo')); // Assuming you store user info in localStorage

    const combinedOrder = {
      items: orderData.items.map(item => ({
        image: item.img,
        Productname: item.productName,
        price: item.afterdiscount,
        Quantity: orderData.quantities[item._id] || 1,
        Categories: item.categories
      })),
      FinalPrice: totalPrice,
      UserInfo: {
        Name: userInfo.Name,
        Email: userInfo.Email,
        userid: userInfo.userid
      },
      UserDeliveryAddress: {
        Street: Order.address.street,
        HouseNo: '', // Assuming you have this data
        Pincode: Order.address.pincode,
        State: Order.address.state,
        City: Order.address.city,
        landMark: '' // Assuming you have this data
      },
      Transaction_id: '', // You might want to generate this or get it from payment gateway response
      OrderStatus: 'pending',
      PaymentMode: Order.PyamentType,
      PaymentStatus: 'Complete'
    };

    try {
      const response = await axios.post('http://localhost:5100/api/Make-Orders', combinedOrder);
      if (response.status === 200) {
        console.log('Order submitted successfully', response.data);
        // Optionally, you can clear the cart and redirect to order confirmation page
        localStorage.removeItem('cartItems');
        localStorage.removeItem('quantities');
        navigate('/order-confirmation'); // Ensure you have a route for this
      }
    } catch (error) {
      console.error('Error submitting order', error);
    }
  };

  if (!orderData) return null;

  const handleRedirectPage = () => {
    toast.success('Oder Successfully.!!')
    setTimeout(() => {
        navigate('/')
    }, 2000);
  }

  return (
    <section className="container mx-auto mt-7 px-4 md:px-0">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2">
          <div>
            <p className="text-2xl md:text-4xl font-bold">Order Summary</p>
            <p className="text-gray-500">Check your items and select a suitable shipping method.</p>
            <div className="mt-4 p-3 border rounded bg-white">
              {orderData.items.length > 0 ? (
                orderData.items.map((item, index) => {
                  const itemTotalPrice = item.afterdiscount * (orderData.quantities[item._id] || 1);
                  return (
                    <div key={item._id} className="flex flex-col md:flex-row mb-3 p-2 border rounded">
                      <img
                        className="m-2 rounded border order-summary-img"
                        src={item.img}
                        alt={item.name}
                        style={{ maxWidth: "100px", maxHeight: "100px" }}
                      />
                      <div className="flex-grow flex flex-col justify-between px-3 py-2">
                        <span className="product-name font-bold">{item.productName}</span>
                        <span className="text-lg font-bold">Quantity: {orderData.quantities[item._id]}</span>
                        <p className="text-lg font-bold text-red-600">Rs {itemTotalPrice}</p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p>No products in the cart</p>
              )}
            </div>
          </div>
        </div>

        <div className="md:w-1/2 mt-4 md:mt-0 md:ml-4">
          <div className="bg-gray-100 p-4 rounded">
            <p className="text-xl font-bold">Billing Address</p>
            <p className="text-gray-500">Complete your order by providing your Address details.</p>
            {/* <form onSubmit={handleRedirectPage}> */}
            <form onSubmit={handleSubmit}>
              <div className="mt-3">
                <label htmlFor="street" className="font-bold">Street</label>
                <input
                  onChange={handleChange}
                  type="text"
                  required
                  id="street"
                  value={Order.address.street}
                  name="street"
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
                  value={Order.address.city}
                  name="city"
                  className="form-control border outline-none rounded-md p-2 block w-full mt-1 uppercase"
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
                  value={Order.address.state}
                  className="form-control p-2 block outline-none border rounded-md w-full mt-1"
                  placeholder="Enter Your State"
                />
              </div>
              <div className="mt-3">
                <label htmlFor="pincode" className="font-bold">Pincode</label>
                <input
                  onChange={handleChange}
                  type="text"
                  required
                  id="pincode"
                  value={Order.address.pincode}
                  name="pincode"
                  className="form-control p-2 block outline-none border rounded-md w-full mt-1"
                  placeholder="Pincode"
                />
              </div>
              <div className="mt-3">
                <label htmlFor="paymentType" className="font-bold">Payment Type</label>
                <select
                  onChange={handleChange}
                  value={Order.PyamentType}
                  name="PyamentType"
                  className="form-control p-2 border rounded-md outline-none block w-full mt-1"
                >
                  <option value="">Select Payment Method</option>
                  <option value="COD">COD</option>
                  <option disabled value="Online">Online</option>
                </select>
              </div>

              <div className="mt-4 border-t border-b py-2">
                <div className="flex justify-between">
                  <p className="mb-0 font-bold">Subtotal</p>
                  <p className="mb-0 font-bold text-lg">Rs {orderData.totalMRP}</p>
                </div>
                <div className="flex justify-between">
                  <p className="mb-0 font-bold">Shipping</p>
                  <div>
                    <span className="text-green-600 text-lg mx-2">Free</span>
                    <span className="mb-0 font-bold text-gray-400 line-through">Rs {orderData.shippingFee}</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex justify-between">
                <p className="text-2xl font-bold">Total</p>
                <p className="text-2xl font-bold">Rs {totalPrice}</p>
              </div>
              <button type="submit" onClick={handleRedirectPage} className="mt-4 w-full bg-red-600 text-white py-2 rounded">Place Order</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FinalCart;
