// import { SortIcon } from '@/components/icons/SortIcon';
import Image from 'next/image';
import { DashboardCard } from '../Card/Card';
import { TransactionItem } from '../TransactionItem/TransactionItem';
import s from './Transactions.module.scss';
import Api from '@/utils/api';
import { useState, useEffect } from 'react';
import { useConnectWallet } from '@/hooks/useConnectWallet';
import { useTranslation } from 'react-i18next';

export const Transactions = () => {
   const { profile } = useConnectWallet()
   const [transactions, setTransactions] = useState<any[]>([])
   const { t } = useTranslation('dashboard');

   useEffect(() => {
      if (!profile) return
      Api.getTransactions().then(resp=>setTransactions(resp.txs))
   }, [profile])

   return (
      <section className={s.transactions}>
         <h2 className={s.title}>
            {t('stage.transactions.title')}
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
               padding: 20,
               borderRadius: 13,
            }}>
            <div className={`${s.wrapper} ${transactions.length > 0 ? '' : s.emptyWrapper}`}>
               <ul className={s.table}>
                  <li>{t('stage.transactions.date')}</li>

                  <li>{t('stage.transactions.type')}</li>
                  <li>{t('stage.transactions.amount')}</li>
                  <li>{t('stage.transactions.received')}</li>
                  <li>{t('stage.transactions.stage')}</li>

                  <li>{t('stage.transactions.link')}</li>
               </ul>

               {transactions.length > 0 ? (
                  <div className={s.transactionsWrapper}>
                     {transactions.map(tx => (
                        <TransactionItem key={tx.hash} tx={tx}/>
                        )
                     )}
                  </div>
               ) : (
                  <div className={s.notify}>
                     <p> {t('stage.transactions.notify')} </p>
                  </div>
               )}
            </div>
         </DashboardCard>
      </section>
   );
};
