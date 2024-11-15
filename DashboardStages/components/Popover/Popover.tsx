'use client';

import { ReactNode, useState } from 'react';

import { FadeInNew } from '@/components/FadeInNew/FadeInNew';
import { InfoIcon } from '@/icons/InfoIcon';
import s from './Popover.module.scss';

interface PopoverProps<T> {
   list: T[];
   customRender: (item: T, index: Partial<number>) => ReactNode;
   directionAnim?: 'left' | 'up' | 'right' | 'down';
}

export function DashboardPopover<T>({
   list,
   customRender,
   directionAnim = 'left'
}: PopoverProps<T>) {
   const [isOpen, setIsOpen] = useState(false);

   return (
      <div className={s.popover}>
         {isOpen && (
            <FadeInNew direction={directionAnim} distance={10}>
               <div className={s.content}>
                  <ul className={s.list}>{list.map(customRender)}</ul>
               </div>
            </FadeInNew>
         )}

         <button
            className={s.popup}
            onMouseEnter={() => setIsOpen(true)}
            onTouchStart={() => setIsOpen(true)}
            onTouchEnd={() => setIsOpen(false)}
            onMouseLeave={() => setIsOpen(false)}>
            <InfoIcon />
         </button>
      </div>
   );
}
