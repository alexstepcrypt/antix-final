import Image from 'next/image';

import type { Transaction } from '@/DashboardStages/constants/transactions';
import s from './TransactionItem.module.scss';
import vesting_antix from '/public/svg/vantix-icon.svg';

export const TransactionItem = ({
   amount,
   date,
   type,
   received,
   stage,
   transactionLink,
}: Omit<Transaction, 'id'>) => {
   return (
      <ul
         className={s.transaction}
      >
         <li>{date}</li>
         <li>{type}</li>
         <li>
               <Image
                  src={amount.icon}
                  alt="amount-icon"
                  width={24}
                  height={24}
               />
               <p>
                  {amount.amount.toLocaleString('en-US', { minimumFractionDigits: 3, maximumFractionDigits: 6 })}
                  {" "}
                  {amount.currency}
               </p>
         </li>
         <li>
            {received !== 0 ? (
               <>
                  <Image
                     src={vesting_antix}
                     alt="vesting-antix"
                     width={24}
                     height={24}
                     className={s.vestingAntix}
                  />
                  {received.toLocaleString('en-US', { minimumFractionDigits: 3, maximumFractionDigits: 3 })} vAntix
               </>

            ) : (
               "-"
            )}
         </li>
         <li>
            {stage}
         </li>
         <li>
            <a href={transactionLink} className={s.address}>View Transaction</a>
         </li>
      </ul>
   );
};
