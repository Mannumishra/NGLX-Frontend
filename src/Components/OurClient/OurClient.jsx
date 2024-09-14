import React from 'react'
import './OurClient.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay } from 'swiper/modules';

import s1 from './l1.webp'
import s2 from './l2.png'
import s3 from './l3.png'
import s4 from './l4.svg'
import s5 from './l5.png'
import s6 from './l6.png'
import s7 from './l7.png'
import s8 from './l8.jpg'
import s9 from './l9.jpg'
import s10 from './l10.jpg'
import s11 from './l11.jpg'
import s12 from './l12.jpg'

function OurClient() {
    // Array of image sources for clients
    const clientImages = [s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12];

    return (
        <section className='client-section'>
            <div className="container">
                <div className="client-box">
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={10}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}
                        breakpoints={{
                            640: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            768: {
                                slidesPerView: 4,
                                spaceBetween: 40,
                            },
                            1024: {
                                slidesPerView: 5,
                                spaceBetween: 50,
                            },
                        }}
                        modules={[Autoplay]}
                        className="mySwiper-clients"
                    >
                        {clientImages.map((imgSrc, index) => (
                            <SwiperSlide key={index} className='img'>
                                <img src={imgSrc} className='img border-black border' alt={`client-${index}`} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    )
}

export default OurClient;
