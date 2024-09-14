import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// Import required modules
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import axios from 'axios';

const Hero = () => {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await axios.get('https://nglx-server.onrender.com/api/get-Banners');
        setBanners(response.data.data); // Assuming the image URLs are under `data`
      } catch (error) {
        console.error('Error fetching banners:', error);
      }
    };

    fetchBanners();
  }, []);

  return (
    <Swiper
      modules={[Autoplay, Navigation, Pagination]}
      slidesPerView={1}
      spaceBetween={30}
      loop={true}
      pagination={{ clickable: true }}
      autoplay={{
        delay: 2000,
        disableOnInteraction: false,
      }}
      navigation={true}
      className="mySwiper"
    >
      {banners.map((banner, index) => (
        <SwiperSlide key={index}>
          <img src={banner.image} alt={`Banner ${index + 1}`} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Hero;
