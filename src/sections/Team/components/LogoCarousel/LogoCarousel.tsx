'use client';

import { SwiperSlide, Swiper } from 'swiper/react';
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
   logo8,
   logo4,
   logo6,
   logo7,
   logo9,
   logo5,
   logo10,
   logo1,
   logo2,
   logo3,
   logo8,
   logo4,
   logo6,
   logo7,
   logo9,
   logo5,
   logo10,
];

export const LogoCarousel = () => {

   return (
      <div className={s.container}>
         <Swiper
            loop={true}
            centeredSlides
            slidesPerView={4}
            spaceBetween={52}
            autoplay={{
               delay: 1000,
               disableOnInteraction: true,
            }}
            speed={1750}
            modules={[Autoplay]}
            allowTouchMove={false}
            grabCursor={false}
            className={s.swiper}
         >
            {logos.map((logo, i) => (
               <SwiperSlide key={i} className={s.slide}>
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
