'use client';

import { useState } from 'react';

import { popoverList } from '../../constants/list-values';
import { FadeInNew } from '@/components/FadeInNew/FadeInNew';
import { InfoIcon } from '@/icons/InfoIcon';
import s from './Popover.module.scss';

export const DashboardPopover = () => {
   const [isOpen, setIsOpen] = useState(false);

   return (
      <div className={s.popover}>
         {isOpen && (
            <FadeInNew direction="left" distance={10}>
               <div className={s.content}>
                  <ul className={s.list}>
                     {popoverList.map((item, k) => (
                        <li>
                           {item.title}: <span>{item.subtitle}</span>
                        </li>
                     ))}

                     <p>(30 days per interval)</p>
                  </ul>
               </div>
            </FadeInNew>
         )}

         <button
            className={s.popup}
            onMouseEnter={() => setIsOpen(true)}
            onTouchStart={() => setIsOpen(true)}
            onTouchEnd={() => setIsOpen(false)}
            onMouseLeave={() => setIsOpen(false)}
         >
            <InfoIcon />
         </button>
      </div>
   );
};
