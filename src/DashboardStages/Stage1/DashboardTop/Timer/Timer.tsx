'use client';

import React, { useEffect, useState } from 'react';
import styles from './Timer.module.scss';

interface TimeLeft {
   days: number;
   hours: number;
   minutes: number;
   seconds: number;
}

export const Timer: React.FC<{ targetDate: Date }> = ({ targetDate }) => {
   const [timeLeft, setTimeLeft] = useState<TimeLeft>({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
   });

   useEffect(() => {
      const interval = setInterval(() => {
         const now = new Date().getTime();
         const difference = targetDate.getTime() - now;

         if (difference > 0) {
            setTimeLeft({
               days: Math.floor(difference / (1000 * 60 * 60 * 24)),
               hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
               minutes: Math.floor((difference / 1000 / 60) % 60),
               seconds: Math.floor((difference / 1000) % 60),
            });
         } else {
            clearInterval(interval);
         }
      }, 1000);

      return () => clearInterval(interval);
   }, [targetDate]);

   return (
      <div className={styles.timerContent}>
         <div className={styles.timeSegment}>
            <span className={styles.time}>
               {timeLeft.days.toString().padStart(2, '0')}
            </span>
            <span className={styles.label}>days</span>
         </div>
         <span className={styles.separator}>:</span>
         <div className={styles.timeSegment}>
            <span className={styles.time}>
               {timeLeft.hours.toString().padStart(2, '0')}
            </span>
            <span className={styles.label}>hours</span>
         </div>
         <span className={styles.separator}>:</span>
         <div className={styles.timeSegment}>
            <span className={styles.time}>
               {timeLeft.minutes.toString().padStart(2, '0')}
            </span>
            <span className={styles.label}>min</span>
         </div>
         <span className={styles.separator}>:</span>
         <div className={styles.timeSegment}>
            <span className={styles.time}>
               {timeLeft.seconds.toString().padStart(2, '0')}
            </span>
            <span className={styles.label}>sec</span>
         </div>
      </div>
   );
};
