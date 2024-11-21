// import { SortIcon } from '@/components/icons/SortIcon';
import Image from 'next/image';
import { DashboardCard } from '../Card/Card';
import { TransactionItem } from '../TransactionItem/TransactionItem';
import s from './Transactions.module.scss';
import type { Transaction } from '@/DashboardStages/constants/transactions';

interface TransactionsProps {
   transactions: Transaction[];
}

export const Transactions = ({ transactions }: TransactionsProps) => {
   return (
      <section className={s.transactions}>
         <h2 className={s.title}>
            Transactions
            <Image
               className={s.mobileSwipe}
               src={'/svg/swap-icon.svg'}
               alt="swap-icon"
               width={36}
               height={36}
               loading="lazy"
            />
         </h2>
         <DashboardCard
            style={{
               width: '100%',
               marginTop: 24,
               padding: 27,
               borderRadius: 13,
            }}>
            <div className={s.wrapper}>
               <ul className={s.table}>
                  <li>Date (GMT)</li>

                  <li>Type</li>
                  <li>Amount (Currency)</li>
                  <li>Received</li>
                  <li>Stage</li>

                  <li>Transaction Link</li>
               </ul>

               {transactions.length > 0 ? (
                  <div className={s.transactionsWrapper}>
                     {transactions.map(({ id, ...transaction }) => (
                        <TransactionItem
                           key={id}
                           {...transaction}
                        />
                        )
                     )}
                  </div>
               ) : (
                  <div className={s.notify}>
                     <p>
                        There are no transactions yet. Once new operations
                        occur, they will be displayed in this table.
                     </p>
                  </div>
               )}
            </div>
         </DashboardCard>
      </section>
   );
};
