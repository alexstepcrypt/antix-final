'use client';

import { SwiperRef, SwiperSlide, Swiper } from 'swiper/react';
import { useEffect, useRef } from 'react';
import { Autoplay } from 'swiper/modules';

import logo1 from '@/public/images/team/1.png';
import logo2 from '@/public/images/team/2.png';
import logo3 from '@/public/images/team/3.png';
import logo4 from '@/public/images/team/4.png';
import logo5 from '@/public/images/team/5.png';
import logo6 from '@/public/images/team/6.png';
import logo7 from '@/public/images/team/7.png';
import logo8 from '@/public/images/team/8.png';
import logo9 from '@/public/images/team/9.png';
import logo10 from '@/public/images/team/10.png';
import s from './LogoCarousel.module.scss';

const logos = [
   logo1,
   logo2,
   logo3,
   logo4,
   logo5,
   logo6,
   logo7,
   logo8,
   logo9,
   logo10,
];

export const LogoCarousel = () => {
   const swiperRef = useRef<SwiperRef | null>(null);

   useEffect(() => {
      setTimeout(() => {
         if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.update();
         }
      }, 100);
   }, []);

   return (
      <div className={s.container}>
         <Swiper
            loop
            centeredSlides
            ref={swiperRef}
            slidesPerView={6}
            spaceBetween={52}
            autoplay={{
               delay: 2000,
               disableOnInteraction: false,
               pauseOnMouseEnter: false,
            }}
            speed={1750}
            modules={[Autoplay]}
            className={s.swiper}>
            {logos.map((logo, i) => (
               <SwiperSlide key={i}>
                  <img
                     src={logo.src}
                     alt="team-logo"
                     className={s.logo}
                  />
               </SwiperSlide>
            ))}
         </Swiper>
      </div>
   );
};
