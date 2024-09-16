import React, { useState, useEffect } from 'react';
import './SinglePage.css';
import warrenty from './warrenty.png';
import { Accordion, AccordionHeader, AccordionBody } from "@material-tailwind/react";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

function SinglePage() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const { _id } = useParams();
  const [qty, setQty] = useState(1);
  const [topImage, setTopImage] = useState('');
  const [open, setOpen] = useState(1);
  const [quantity, setQuantity] = useState({});

  const dataFetching = async () => {
    try {
      const res = await axios.get('http://localhost:5100/api/getAllProducts');
      const fetchData = res.data.data;
      const fetched = fetchData.find((item) => item._id === _id);
      setData([fetched]); // Ensure data is an array
      if (fetched) setTopImage(fetched.images[0]); // Set the initial top image
    } catch (error) {
      console.log(error);
      toast.error('Failed to fetch data.');
    }
  };

  console.log(data)
  useEffect(() => {
    dataFetching();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [_id]);

  const handleImageClick = (image) => {
    setTopImage(image);
  };

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  const addToCart = (item) => {
    const cartItem = {
      id: item._id,
      productname: item.productName,
      productprice: item.afterdiscount,
      productquantity: qty,
      productimage: item.images[0]
    };
    const existingCart = JSON.parse(localStorage.getItem('nglxcartItems')) || [];
    const productIndex = existingCart.findIndex(item => item.id === cartItem.id);
    if (productIndex >= 0) {
      existingCart[productIndex].quantity += qty;
    } else {
      existingCart.push(cartItem);
    }
    localStorage.setItem('nglxcartItems', JSON.stringify(existingCart));
    toast.success('Product added to cart successfully!');
  };

  const handleDecrease = () => {
    if (qty > 1) setQty(qty - 1);
  };

  const handleIncrease = () => {
    setQty(qty + 1);
  };

  return (
    <section className='SinglePage-section'>
      <div className="SinglePage-container">
        {data && data.map((item) => (
          <React.Fragment key={item._id}>
            <div className="left">
              <div className="up">
                <img src={topImage} alt={item.productName} />
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
                <div className="dec" onClick={handleDecrease}>-</div>
                <div className="res">{qty}</div>
                <div className="inc" onClick={handleIncrease}>+</div>
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
                <button className='btn-grad' onClick={() => addToCart(item)}>Add to Cart</button>
                <button className='btn-grad'>Buy Now</button>
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}

export default SinglePage;
