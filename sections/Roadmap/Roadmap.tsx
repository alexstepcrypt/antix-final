"use client"

import Image from 'next/image';

import swap from '/public/svg/swap-icon.svg';
import bg from '/public/images/roadmap-bg.png';
import s from './Roadmap.module.scss';
import { Stage } from './Stage/Stage';
import { RoadmapStageProps, roadmapList } from './mocdata';
import { useTranslation } from 'react-i18next';

type roadmapItemsType = {
   event: string;
   list: Array<{ title: string; description: string }>;
   stage: string
}

const Roadmap = () => {
   const { t } = useTranslation('landing');
   const roadmapItems = t('roadmap.list', { returnObjects: true }) as Array<roadmapItemsType>;

   const mergedList: RoadmapStageProps[] = roadmapList.map((item) => {
      const matchingNewData = roadmapItems.find((newItem) => newItem.event === item.event);
   
      if (matchingNewData) {
         return {
            ...item,
            list: matchingNewData.list.map((newListItem, index) => ({
               ...newListItem,
               description: Array.isArray(newListItem.description)
                  ? newListItem.description
                  : [newListItem.description], 
               isDone: item.list[index]?.isDone ?? false, 
            })),
         };
      }
   
      return item; 
   });

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
            {t('roadmap.title')}
         </h2>

         <div className={s.list}>
            {mergedList.map((stage, i) => <Stage key={i} {...stage} />)}
         </div>
      </div>
   );
};

export default Roadmap;
