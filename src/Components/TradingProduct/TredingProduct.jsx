import React, { useEffect, useState } from 'react';
import './TredingProduct.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

function TredingProduct() {
    const initialDataToShow = 8; // Set initial number of items to show
    const [showAll, setShowAll] = useState(false);
    const [data , setData] = useState([])
    const [product,setProduct] = useState([])

    const datafetching = async() => {
        try {
            const response = await axios.get('http://localhost:5100/api/get-tags')
            console.log(response.data.data)
            setData(response.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    const productData = async() => {
        try {
            const response = await axios.get('http://localhost:5100/api/getAllProducts')
            console.log(response.data.data)
            setProduct(response.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        productData()
        datafetching()
    },[])

    const toggleShowAll = () => {
        setShowAll(!showAll);
    };

    const productsToShow = showAll ? data : data.slice(0, initialDataToShow);

    return (
      <>
        {
            data && data.map((item,index)=>(
                <section key={index} className='TredingProduct-section'>
                <div className="container">
                    <div className="heading">
                        <span>POPULAR PRODUCTS</span>
                        <h2>{item.title}</h2>
                    </div>
                    <div className="main-container">
                        {
                            product.filter((productData)=>productData.tags===item.title).map((product,indexProduct)=>(
                                <Link to={`/single-page/${product._id}`} key={indexProduct} className="col">
                                <div className="img">
                                    <img src={product.images[0]} alt="" />
                                </div>
                                <div className="content">
                                    <h3 className='product-name'>{product.productName}</h3>
                                    <div className="star">
                                        <i className="ri-star-fill"></i>
                                        <i className="ri-star-fill"></i>
                                        <i className="ri-star-fill"></i>
                                        <i className="ri-star-fill"></i>
                                        <i className="ri-star-fill"></i>
                                    </div>
                                    <div className="price">
                                        <del>Rs.{product.mainPrice}</del>
                                        <h4>Rs.{product.afterdiscount}</h4>
                                    </div>
                                </div>
                            </Link>
                            ))
                        }
                       
                    </div>
                </div>
            </section>
            ))
        }
      </>
    );
}

export default TredingProduct;