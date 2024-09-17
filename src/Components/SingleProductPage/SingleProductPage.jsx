import React, { useEffect, useState } from 'react';
import './SingleProductPage.css';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

function SingleProductPage() {
    const [data, setData] = useState([]);
    const { category } = useParams();
    console.log(category);

    const fetchdata = async () => {
        try {
            const response = await axios.get('https://nglx-server.onrender.com/api/getAllProducts');
            console.log(response.data.data);
            const filterdata = response.data.data;
            const filtered = filterdata.filter((item) => item.categories === category);
            setData(filtered);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        fetchdata();
    }, [category]);

    return (
        <section className='singleProduct-section'>
            <div className="container">
                <div className="heading">
                    <span>SHOP</span>
                    <h2>{category}</h2>
                </div>
                <div className="main-container">
                    {
                        data && data.map((item, index) => (
                            <Link to={`single-page/${item._id}`} key={index} className="col">
                                <div className="img">
                                    {/* Access the first image in the 'images' array */}
                                    <img src={item.images[0]} alt={item.productName} />
                                </div>
                                <div className="content">
                                    <h3 className='product-name'>{item.productName}</h3>
                                    <div className="star">
                                        <i className="ri-star-fill"></i>
                                        <i className="ri-star-fill"></i>
                                        <i className="ri-star-fill"></i>
                                        <i className="ri-star-fill"></i>
                                        <i className="ri-star-fill"></i>
                                    </div>
                                    <div className="price">
                                        <del>Rs.{item.mainPrice}</del>
                                        <h4>Rs.{item.afterdiscount}</h4>
                                    </div>
                                </div>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </section>
    );
}

export default SingleProductPage;
