"use client"
import s from './DepositCheckbox.module.scss';

export const DepositCheckbox = ({ children, value, onChange }: { children: string, value: boolean, onChange: () => void }) => {
   return (
      <div
         className={s.wrapper}
         onClick={onChange}
      >
         <label className={`${s.label} ${value && s.open}`}>
            <input
               type="checkbox"
               onChange={onChange}
               checked={value}
            />
         </label>
         <p>{children}</p>
      </div>
   );
};