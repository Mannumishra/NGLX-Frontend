import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function BestSell() {
    const initialDataToShow = 8; // Set initial number of items to show
    const [showAll, setShowAll] = useState(false);
    const [data, setData] = useState([])

    useEffect(() => {
        const datafetching = async () => {
            try {
                const response = await axios.get('http://localhost:5100/api/getAllProducts')
                console.log(response.data.data)
                setData(response.data.data)
            } catch (error) {
                console.log(error)
            }
        }
        datafetching()
    }, [])

    const toggleShowAll = () => {
        setShowAll(!showAll);
    };

    const productsToShow = showAll ? data : data.slice(0, initialDataToShow);

    return (
        <section className='TredingProduct-section'>
            <div className="container">
                <div className="heading">
                    <span>SHOP</span>
                    <h2>All Products</h2>
                </div>
                <div className="main-container">
                    {
                        data && data.map((item, index) => (
                            <Link to={`/single-page/${item._id}`} key={index} className="col">
                                <div className="img">
                                    <img src={item.images[0]} alt="" />
                                </div>
                                <div className="content">
                                    <h3>{item.productName}</h3>
                                    <div className="star">
                                        <i class="ri-star-fill"></i>
                                        <i class="ri-star-fill"></i>
                                        <i class="ri-star-fill"></i>
                                        <i class="ri-star-fill"></i>
                                        <i class="ri-star-fill"></i>
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
                <div className="showmore-btn">
                    <button onClick={toggleShowAll}>
                        {showAll ? 'Show Less' : 'Show More'}
                    </button>
                </div>
            </div>
        </section>
    )
}

export default BestSell
