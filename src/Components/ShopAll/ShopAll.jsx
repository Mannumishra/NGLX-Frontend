import React, { useEffect, useState } from 'react';
import './ShopAll.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ShopAll() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const datafetching = async () => {
      try {
        const response = await axios.get('http://localhost:5100/api/get-category');
        console.log(response.data.data);
        setData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    datafetching();
  }, []);

  return (
    <section className="ShopAll-section">
      <div className="container">
        <div className="heading">
          <span>SHOP ALL</span>
        </div>
        <div className="main-container">
          {data && data.map((item, index) => (
            <Link to={`/Shop-All/getProductsByCategory/${item.MainCategory}`} key={index} className="col">
              <img src={item.image} alt={item.MainCategory} />
              <div className="head">
                <h4>{item.MainCategory}</h4>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ShopAll;
