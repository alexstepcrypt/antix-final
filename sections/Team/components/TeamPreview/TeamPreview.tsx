"use client"
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import top10 from '/public/svg/team/top10.svg';
import logo1 from '/public/svg/team/ico1.svg';
import logo2 from '/public/svg/team/ico2.svg';
import logo3 from '/public/svg/team/ico3.svg';
import logo4 from '/public/svg/team/ico4.svg';
import { StatisticCard } from '../StatisticCard/StatisticCard';
import s from './TeamPreview.module.scss';
import VideoModal from '../../../../components/VideoModal/VideoModal'
import { useTranslation } from 'react-i18next';

const logosList = [logo1, logo2, logo3, logo4];

type statisticItemsType = {
   title: string;
   description: string;
}

export const TeamPreview = () => {
   const [openVideo, setOpenVideo] = useState("");
   const { t } = useTranslation('landing');
   const statisticItems = t('team.statistic', { returnObjects: true }) as Array<statisticItemsType>;

   function sendGAEvent(platform: string) {
      window.dataLayer?.push({
         'event': 'GA4_event',
         'event_name': 'social_'+ platform
      });
   }

   return (
      <div className={s.preview}>
         {openVideo && (
            <VideoModal videoUrl={openVideo} onClose={setOpenVideo} />
         )}

         <div>
            <section className={s.wrapper}>
               <h2 className={s.title}>{t('team.title')}</h2>

               <div className={s.founderWrapper}>
                  <Image
                     src={'/images/founder.png'}
                     alt="founder-modal"
                     width={80}
                     height={80}
                     loading="lazy"
                     draggable={false}
                     onClick={() => setOpenVideo("https://www.youtube.com/watch?v=CgoZc2ADV-8")}
                     className={s.founder}
                  />

                  <p className={s.word}>
                     {t('team.word.text_1')}
                     <br />
                     {t('team.word.text_2')}
                  </p>
               </div>
            </section>
            <p className={s.description}>
               {t('team.description.text_1')}
               <span>{t('team.description.span')}</span>
               {t('team.description.text_2')}
            </p>
         </div>

         <div className={s.statistic}>
            {statisticItems.map((item, i) => (
               <StatisticCard key={i} {...item} />
            ))}
         </div>

         <div className={s.list}>
            <Link onClick={()=>sendGAEvent('instagram')} href="https://www.instagram.com/p/CiUgU4cK0YG/" target="_blank">
               <Image src={top10.src} alt="top10-icon" width={174} height={35} />
            </Link>

            <div className={s.logos}>
               {logosList.map((logo, i) => (
                  <Link key={i} href="https://antix.in/about-company" target="_blank">
                     <Image
                        src={logo.src}
                        alt="logo"
                        width={40}
                        height={53}
                     />
                  </Link>
               ))}
            </div>
         </div>
      </div>
   );
};
