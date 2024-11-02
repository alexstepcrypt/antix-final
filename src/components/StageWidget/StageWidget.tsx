'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import { XIcon } from './icons/XIcon';
import s from './StageWidget.module.scss';
import { TgIcon } from './icons/TgIcon';
import { DiscordIcon } from './icons/DiscordIcon';
import Link from 'next/link';

export const StageWidget = () => {
   const targetDate = new Date('2024-11-14T16:00:00Z');

   const ref = useRef<HTMLDivElement | null>(null);
   const [lastScrollY, setLastScrollY] = useState(0);
   const [isVisible, setIsVisible] = useState(true);
   const [timeLeft, setTimeLeft] = useState({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
   });

   const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const partners = document.getElementById("Partners");

      if (partners) {
         const blockPosition = partners.getBoundingClientRect();
         const scrollPosition = window.scrollY + window.innerHeight;

         if (scrollPosition > blockPosition.top + window.scrollY) setIsVisible(true);
         else setIsVisible(false);
      }

      // if (ref.current && partners) {
      //    const blockPosition = partners.getBoundingClientRect();
      //    const scrollPosition = window.scrollY + window.innerHeight;

      //    if (currentScrollY > lastScrollY && currentScrollY > 100) setIsVisible(false);
      //    else if (
      //       currentScrollY < lastScrollY ||
      //       !(scrollPosition > blockPosition.top + window.scrollY)
      //    ) setIsVisible(true);
      // }

      // setLastScrollY(currentScrollY);
   };

   useEffect(() => {
      window.addEventListener("scroll", handleScroll);

      return () => { window.removeEventListener("scroll", handleScroll) };
   }, []);

   useEffect(() => {
      const interval = setInterval(() => {
         const diff = targetDate.getTime() - new Date().getTime();

         if (diff > 0) {
            setTimeLeft({
               days: Math.floor(diff / (1000 * 60 * 60 * 24)),
               hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
               minutes: Math.floor((diff / (1000 * 60)) % 60),
               seconds: Math.floor((diff / 1000) % 60),
            });
         } else clearInterval(interval);
      }, 1000);

      return () => { clearInterval(interval) };
   }, [targetDate]);

   return (
      <div
         ref={ref}
         className={`${s.wrapper} ${isVisible && s.open}`}
      >
         <div className={s.stage}>
            <Image
               src={'/svg/stage-widget-coin.svg'}
               alt="coin"
               width={68}
               height={51}
            />

            <div className={s.info}>
               <h2>Stage 1 price</h2>
               <div className={s.wrap}>
                  <p>0.09 USDT</p>
                  <div className={s.discount}>
                     <p>-72%</p>
                  </div>
               </div>
            </div>

            <div className={s.timer}>
               <h2>Deposit Stage starts in</h2>
               <div className={s.countdown}>
                  <div>
                     <span>{timeLeft.days.toString().padStart(2, '0')}</span>
                     <p>days</p>
                  </div>
                  :
                  <div>
                     <span>{timeLeft.hours.toString().padStart(2, '0')}</span>
                     <p>hours</p>
                  </div>
                  :
                  <div>
                     <span>{timeLeft.minutes.toString().padStart(2, '0')}</span>
                     <p>min</p>
                  </div>
                  :
                  <div>
                     <span>{timeLeft.seconds.toString().padStart(2, '0')}</span>
                     <p>sec</p>
                  </div>
               </div>
            </div>

            <Link href="/dashboard" className={s.buy}>
               buy
            </Link>
         </div>

         <div className={s.socials}>
            <Link
               href="https://x.com/antix_in"
               target="_blank"
               className={s.social}
            >
               <XIcon />
               <p>41,500</p>
            </Link>

            <Link
               href="https://t.me/antix_in"
               target="_blank"
               className={s.social}
            >
               <TgIcon />
               <p>56,300</p>
            </Link>

            <Link
               href="https://discord.com/invite/bKcMXChRRT"
               target="_blank"
               className={s.social}
            >
               <DiscordIcon />
               <p>5,300</p>
            </Link>
         </div>
      </div>
   );
};
