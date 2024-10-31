"use client"

import Image from 'next/image';

import swap from '/public/svg/swap-icon.svg';
import bg from '/public/images/roadmap-bg.png';
import s from './Roadmap.module.scss';
import { Stage } from './Stage/Stage';
import { roadmapList } from './mocdata';

const Roadmap = () => {
   return (
      <div
         style={{ backgroundImage: `url(${bg.src})` }}
         className={s.container}
         id="RoadMap"
      >
         {/* SWAP ICON */}
         <Image
            className={s.swap}
            src={swap}
            alt="swap-icon"
            width={50}
            height={50}
            loading="lazy"
         />

         <h2 className={s.title}>
            Road Map
         </h2>

         <div className={s.list}>
            {roadmapList.map((stage, i) => <Stage key={i} {...stage} />)}
         </div>
      </div>
   );
};

export default Roadmap;
