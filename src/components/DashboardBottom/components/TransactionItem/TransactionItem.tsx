import Image from 'next/image';

import type { Transaction } from '../Transactions/Transactions';
import s from './TransactionItem.module.scss';

export const TransactionItem = ({
   address,
   amount,
   date,
   details,
   status,
   type,
}: Omit<Transaction, 'id'>) => {
   return (
      <ul className={s.transaction}>
         <li>{date}</li>
         <li>{type}</li>
         <li>
            <div className={s.container}>
               <Image
                  src={amount.currency}
                  alt="amount-icon"
                  width={22.5}
                  height={22.5}
               />
               <p>{amount.text}</p>
            </div>
         </li>
         <li>
            <div className={s.container}>
               <Image
                  src={status.icon}
                  alt="status-icon"
                  width={18}
                  height={18}
               />
               <p>{status.text}</p>
            </div>
         </li>
         <li className={!details ? s.noDetails : ''}>
            {details ?? 'No details'}
         </li>
         <li className={s.address}>{address}</li>
      </ul>
   );
};
