"use client"
import { useState } from 'react';

import s from './DepositCheckbox.module.scss';

export const DepositCheckbox = ({ children }: { children: string }) => {
   const [isOpen, setIsOpen] = useState(false);

   return (
      <div
         className={s.wrapper}
         onClick={() => setIsOpen(p => !p)}
      >
         <label className={`${s.label} ${isOpen && s.open}`}>
            <input
               type="checkbox"
               onChange={() => setIsOpen(p => !p)}
            />
         </label>
         <p>{children}</p>
      </div>
   );
};