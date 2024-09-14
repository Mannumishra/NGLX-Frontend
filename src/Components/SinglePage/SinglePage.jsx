import React, { useState, useEffect } from 'react';
import './SinglePage.css';
import warrenty from './warrenty.png';
import { Accordion, AccordionHeader, AccordionBody } from "@material-tailwind/react";
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

function SinglePage() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const { _id } = useParams();

  // Local state for the cart
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cartItems')) || []);
  const [quantity, setQuantity] = useState(() => JSON.parse(localStorage.getItem('quantities')) || {});

  const dataFetching = async () => {
    try {
      const res = await axios.get('http://localhost:5100/api/getAllProducts');
      const fetchData = res.data.data;
      const fetched = fetchData.filter((item) => item._id === _id);
      setData(fetched);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dataFetching();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [_id]);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cart));
    localStorage.setItem('quantities', JSON.stringify(quantity));
  }, [cart, quantity]);

  const [topImage, setTopImage] = useState('');

  const handleImageClick = (image) => {
    setTopImage(image);
  };

  const [open, setOpen] = useState(1);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  const handleAddToCart = (item) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(cartItem => cartItem._id === item._id);

      if (existingItemIndex === -1) {
        setQuantity((prevQuantity) => ({
          ...prevQuantity,
          [item._id]: 1 // Initialize with quantity 1
        }));
        return [...prevCart, { ...item, quantity: 1 }];
      } else {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += 1;
        setQuantity((prevQuantity) => ({
          ...prevQuantity,
          [item._id]: updatedCart[existingItemIndex].quantity
        }));
        return updatedCart;
      }
    });

    toast.success("Product added to cart");
  };

  const handleIncrease = (item) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map(cartItem => {
        if (cartItem._id === item._id) {
          const newQuantity = cartItem.quantity + 1;
          setQuantity(prevQuantity => ({
            ...prevQuantity,
            [item._id]: newQuantity
          }));
          return { ...cartItem, quantity: newQuantity };
        }
        return cartItem;
      });
      return updatedCart;
    });
  };

  const handleDecrease = (item) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map(cartItem => {
        if (cartItem._id === item._id) {
          const newQuantity = cartItem.quantity - 1;
          if (newQuantity <= 0) {
            handleRemove(item);
            return null;
          }
          setQuantity(prevQuantity => ({
            ...prevQuantity,
            [item._id]: newQuantity
          }));
          return { ...cartItem, quantity: newQuantity };
        }
        return cartItem;
      }).filter(Boolean);
      return updatedCart;
    });
  };

  const handleRemove = (item) => {
    setCart(prevCart => {
      const updatedCart = prevCart.filter(cartItem => cartItem._id !== item._id);
      localStorage.setItem('cartItems', JSON.stringify(updatedCart)); // Update localStorage
      return updatedCart;
    });

    setQuantity(prevQuantity => {
      const updatedQuantity = { ...prevQuantity };
      delete updatedQuantity[item._id];
      localStorage.setItem('quantities', JSON.stringify(updatedQuantity)); // Update localStorage
      return updatedQuantity;
    });
  };

  return (
    <section className='SinglePage-section'>
      <div className="SinglePage-container">
        {data && data.map((item, index) => (
          <>
            <div className="left">
              <div className="up">
                <img src={topImage || item.images[0]} alt={item.productName} />
              </div>
              <div className="down">
                {item.images.map((image, imgIndex) => (
                  <div
                    key={imgIndex}
                    className={`same-img ${topImage === image ? 'active' : ''}`}
                    onClick={() => handleImageClick(image)}
                  >
                    <img src={image} alt={`${item.productName}-${imgIndex}`} />
                  </div>
                ))}
              </div>
            </div>

            <div className="right">
              <div className="price">
                <h2>Rs.{item.afterdiscount}</h2>
                <del>MRP Rs.{item.mainPrice}</del>
                <span>Incl. of all taxes</span>
              </div>
              <h2>{item.productName}</h2>
              <div className="star">
                <i className="ri-star-fill"></i>
                <p>(4.8 | 304)</p>
              </div>
              <div className="incdec">
                <div className="dec" onClick={() => handleDecrease(item)}>-</div>
                <div className="res">{quantity[item._id] || 1}</div>
                <div className="inc" onClick={() => handleIncrease(item)}>+</div>
              </div>

              <div className="des">
                <Accordion className='main-accordion-parent' open={open === 1}>
                  <AccordionHeader className='accordion-heading' onClick={() => handleOpen(1)}>Description</AccordionHeader>
                  <AccordionBody className='accordion-children'>
                    {item.description}
                  </AccordionBody>
                </Accordion>

                <Accordion className='main-accordion-parent' open={open === 2}>
                  <AccordionHeader className='accordion-heading' onClick={() => handleOpen(2)}>Shipping</AccordionHeader>
                  <AccordionBody className='accordion-children'>
                    <ul>
                      <li>FREE Standard Delivery on orders over Rs. 499* (Excluding Sale Items).</li>
                      <li>Delivery within 2 to 6 working days depending on the order amount.</li>
                      <li>Estimated delivery dates are subject to stock availability and other factors.</li>
                    </ul>
                  </AccordionBody>
                </Accordion>
              </div>

              <div className="services">
                <div className="col">
                  <i className="ri-refund-2-fill"></i>
                  <p>Easy 30 Day Return</p>
                </div>
                <div className="col">
                  <img src={warrenty} alt="warranty" />
                  <p>1-Year Warranty</p>
                </div>
              </div>

              <div className="btns">
                <button className='btn-grad' onClick={() => handleAddToCart(item)}>Add to Cart</button>
                <button className='btn-grad'>Buy Now</button>
              </div>
            </div>
          </>
        ))}
      </div>
    </section>
  );
}

export default SinglePage;
