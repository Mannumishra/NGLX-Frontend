import React, { useEffect, useState } from 'react';
import './NewCollectionBanner.css';
import axios from 'axios';

function NewCollectionBanner() {
  const [offer, setOffer] = useState([]);

  useEffect(() => {
    const dataFetch = async () => {
      try {
        const response = await axios.get('http://localhost:5100/api/get-sales-Banners');
        console.log(response);
        setOffer(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    dataFetch();
  }, []);

  // Assuming you want to use the first offer as the background image
  const firstOffer = offer.length > 0 ? offer[0] : null;

  return (
    <section className='newCollectionBanner-section'>
      <div className="container">
        {firstOffer && (
          <div 
            className="main-container" 
            style={{ backgroundImage: `url(${firstOffer.image})` }}
          >
            <div className="left">
              {/* Your additional content here */}
              {/* <span>NEW COLLECTION</span>
              <h1>The New Beauty Collection</h1>
              <p>This new collection brings with it the most exciting beauty products.</p>
              <a href="">Shop Now</a> */}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default NewCollectionBanner;
