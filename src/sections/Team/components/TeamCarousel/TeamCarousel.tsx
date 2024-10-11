'use client';

import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperRef } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import TeamComponent from '@/components/TeamComponent/TeamComponent';
import { commandList } from './mocdata';
import s from './TeamCarousel.module.scss';

export const TeamCarousel = () => {
   const [isActive, setIsActive] = useState(false);
   const swiperRef = useRef<SwiperRef | null>(null);

   useEffect(() => {
      if (isActive) {
         setTimeout(() => {
            if (swiperRef.current && swiperRef.current.swiper) {
               swiperRef.current.swiper.update();
            }
         }, 100);
      }
   }, [isActive]);

   if (!isActive) {
      const marina = commandList[0];
      const roman = commandList[1];

      return (
         <div className={s.container}>
            <TeamComponent {...marina} />
            <TeamComponent {...roman} />
            <button onClick={() => setIsActive(true)} className={s.btn}>
               + Show All
            </button>
         </div>
      );
   }

   return (
      <div className={s.newcontainer}>
         <Swiper
            loop
            direction='horizontal'
            centeredSlides
            ref={swiperRef}
            slidesPerView={2}
            spaceBetween={16}
            autoplay={{
               delay: 2000,
               disableOnInteraction: false,
               pauseOnMouseEnter: false,
            }}
            speed={1500}
            modules={[Autoplay]}
            allowTouchMove={false}
            className={s.swiper}>
            {commandList.map((employee, i) => (
               <TeamComponent key={i} {...employee} />
            ))}
         </Swiper>
      </div>
   );
};
