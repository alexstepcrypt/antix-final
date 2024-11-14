"use client"
import s from './DepositCheckbox.module.scss';

export const DepositCheckbox = ({ children, isChecked, onChange }: { children: string, isChecked: boolean, onChange: () => void }) => {
   return (
      <div
         className={s.wrapper}
         onClick={onChange}
      >
         <label className={`${s.label} ${isChecked && s.open}`}>
            <input
               type="checkbox"
               onChange={onChange}
               checked={isChecked}
            />
         </label>
         <p>{children}</p>
      </div>
   );
};