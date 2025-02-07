'use client';

import { useEffect, useRef, useState } from 'react';
import s from './StageWidget.module.scss';
import { useTranslation } from 'react-i18next';
import { useConnectWallet } from '@/hooks/useConnectWallet';


export const StageWidget = () => {
   const targetDate = new Date('2025-02-22T13:00:00Z');
   const [timeLeft, setTimeLeft] = useState({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
   });
   const [visible, setVisible] = useState(false);
   const lastScrollY = useRef(0);
   const { t } = useTranslation('landing');

   const { connect } = useConnectWallet();

   function clickBuyNow() {
      window.dataLayer.push({
         event          : 'custom_event',
         event_category : 'button',
         event_action   : 'click',
         event_label    : 'buy_now',
         event_content  : 'step_1',
         event_context  : 'flying_widget'
      })
      connect()
   }

   useEffect(() => {
      const updateTimeLeft = () => {
         const diff = targetDate.getTime() - Date.now();

         if (diff > 0) {
            const seconds = Math.floor(diff / 1000);
            setTimeLeft({
               days: Math.floor(seconds / 86400),
               hours: Math.floor((seconds % 86400) / 3600),
               minutes: Math.floor((seconds % 3600) / 60),
               seconds: Math.floor(seconds % 60),
            });
         } else {
            setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            clearInterval(interval);
         }
      };

      const interval = setInterval(updateTimeLeft, 1000);
      updateTimeLeft(); 

      return () => clearInterval(interval);
   }, []);

   useEffect(() => {
      const handleScroll = () => {
         const currentScrollY = window.scrollY;
         const about = document.getElementById('AboutProject');

         if (!about) return;

         const aboutTop = about.getBoundingClientRect().top + currentScrollY;

         if (
            currentScrollY < aboutTop ||
            currentScrollY < lastScrollY.current
         ) {
            setVisible(false);
         } else {
            setVisible(true);
         }

         lastScrollY.current = currentScrollY;
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
   }, []);

   return (
      <div className={`${s.wrapper} ${visible && s.open}`}>
         <div className={s.stage}>
            <div className={s.info}>
               <div className={s.priceWrapper}>
                  <h2>{t('stageWidget.currentPrice')}</h2>
                  <div className={s.mobileDiscount}>
                     <p>-43%</p>
                  </div>
               </div>
               <div className={s.wrap}>
                  <div className={s.prices}>
                     <p>0.08 USDT</p>
                     {/* <Image
                        src={'/svg/prev-price.svg'}
                        alt="prev-price"
                        width={74}
                        height={20}
                        draggable={false}
                        loading="lazy"
                        className={s.price}
                     /> */}
                     <span className={s.prevPrice}>0.14 USDT</span>
                  </div>
                  <div className={s.discount}>
                     <p>-43%</p>
                  </div>
               </div>
            </div>

            <div className={s.timer}>
               <h2>{t('stageWidget.timer.title')}</h2>
               <div className={s.countdown}>
                  <div>
                     <span>{timeLeft.days.toString().padStart(2, '0')}</span>
                     <p>{t('stageWidget.timer.days')}</p>
                  </div>
                  :
                  <div>
                     <span>{timeLeft.hours.toString().padStart(2, '0')}</span>
                     <p>{t('stageWidget.timer.hours')}</p>
                  </div>
                  :
                  <div>
                     <span>{timeLeft.minutes.toString().padStart(2, '0')}</span>
                     <p>{t('stageWidget.timer.minutes')}</p>
                  </div>
                  :
                  <div>
                     <span>{timeLeft.seconds.toString().padStart(2, '0')}</span>
                     <p>{t('stageWidget.timer.seconds')}</p>
                  </div>
               </div>
            </div>

            <button onClick={clickBuyNow} className={` ${s.buy}`}>
               {t('stageWidget.buyButton')}
               <span className={s.flare}></span> 
            </button>
         </div>
      </div>
   );
};
