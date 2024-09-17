import React, { useEffect, useState } from 'react';
import './CollectionBanner.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

function CollectionBanner() {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    const dataFetch = async () => {
      try {
        const response = await axios.get('https://nglx-server.onrender.com/api/get-sales-Banners');
        console.log(response.data.data);
        setBanners(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    dataFetch();
  }, []);

  // Get the second and third banners
  const secondBanner = banners.length > 1 ? banners[1] : null;
  const thirdBanner = banners.length > 2 ? banners[2] : null;

  return (
    <section className='CollectionBanner-section'>
      <div className="container">
        {secondBanner && (
          <div className="banner same">
            <img 
              src={secondBanner.image} 
              alt="Second Banner" 
              className="banner-image"
            />
            <div className="content">
              {/* <span>NEW COLLECTIONS</span>
              <h2>Awesome Makeup Kit Gift Sets</h2>
              <p>Find your unique style.</p>
              <Link to="/shop">SHOP NOW</Link> */}
            </div>
          </div>
        )}
        {thirdBanner && (
          <div className="banner same">
            <img 
              src={thirdBanner.image} 
              alt="Third Banner" 
              className="banner-image"
            />
            <div className="content">
              {/* <span>NEW COLLECTIONS</span>
              <h2>The Ultimate Skincare Regime</h2>
              <p>Find your unique style.</p>
              <Link to="/shop">SHOP NOW</Link> */}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default CollectionBanner;
