import { Fragment } from 'react';

import { SortIcon } from '@/icons/SortIcon';
import { DashboardCard } from '../Card/Card';
import { TransactionItem } from '../TransactionItem/TransactionItem';
import s from './Transactions.module.scss';

export interface Transaction {
   id: number;
   date: string;
   type: string;
   amount: {
      currency: 'tether' | 'antix';
      text: string;
   };
   status: {
      icon: string;
      text: string;
   };
   details: string | null;
   address: string;
}

interface TransactionsProps {
   transactions: Transaction[];
}

export const Transactions = ({ transactions }: TransactionsProps) => {
   return (
      <section className={s.transactions}>
         <h2 className={s.title}>Transactions</h2>
         <DashboardCard
            style={{
               width: '100%',
               marginTop: 24,
               padding: 27,
               borderRadius: 13
            }}
         >
            <div className={s.table}>
               <section className={s.date}>
                  <h2>Date</h2>
                  <SortIcon />
               </section>

               <ul>
                  <li>Type</li>
                  <li>Amount</li>
                  <li>Status</li>
                  <li>Details</li>
               </ul>

               <span>Address</span>
            </div>

            {transactions.length > 0 ? (
               transactions.map(({ id, ...transaction }, i) => {
                  const is = i + 1 === transactions.length;

                  return (
                     <Fragment key={id}>
                        <TransactionItem {...transaction} />
                        {!is && <hr />}
                     </Fragment>
                  )
               })
            ) : (
               <div className={s.notify}>
                  <p>There are no transactions yet. Once new operations occur, they will be displayed in this table.</p>
               </div>
            )}
         </DashboardCard>
      </section>
   );
};