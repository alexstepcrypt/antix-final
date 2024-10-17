import { SortIcon } from '@/icons/SortIcon';
import { DashboardCard } from '../Card/Card';
import s from './Transactions.module.scss';

interface TransactionsProps {
   // TODO: do a normal type for transaction
   transactions: unknown[]
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
               <div></div>
            ) : (
               <div className={s.notify}>
                  <p>There are no transactions yet. Once new operations occur, they will be displayed in this table.</p>
               </div>
            )}
         </DashboardCard>
      </section>
   );
};