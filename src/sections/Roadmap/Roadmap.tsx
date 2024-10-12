"use client"

import bg from '@/public/images/roadmap-bg.png';
import s from './Roadmap.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react'
import { roadmapList } from './mocdata'
import { Stage } from './Stage/Stage';

const Roadmap = () => {
   return (
      <div
         style={{ backgroundImage: `url(${bg.src})` }}
         className={s.container}
      >
         <h2 className={s.title}>Road Map</h2>

         <div className={s.list}>
            {roadmapList.map((stage, i) => <Stage key={i} {...stage} />)}
         </div>
      </div>
   );
};

export default Roadmap;
