import { InfoIcon } from '@/icons/InfoIcon';
import { DashboardCard } from './components/Card/Card'
import { DashboardList } from './components/List/List'
import { firstList, secondList, thirdList } from './constants/list-values';
import { Transactions } from './components/Transactions/Transactions';
import s from './DashboardBottom.module.scss';
import { Steps } from './components/Steps/Steps'
import { steps } from './constants/steps';

export const DashboardBottom = () => {
   return (
      <div className={s.container}>
         <Steps stages={steps} />

         <div className={s.cards}>
            <DashboardCard>
               <h2 className={s.title}>Deposit Instructions</h2>

               <ol className={s.guide}>
                  <li>Make a deposit</li>
                  <li>Wait for the start of the stage</li>
                  <li>Use your deposit to buy tokens</li>
               </ol>
            </DashboardCard>
            <DashboardCard>
               <button className={s.popup}>
                  <InfoIcon />
               </button>
               <div className={s.statistic}>
                  <DashboardList values={firstList} />
                  <DashboardList values={secondList} />
                  <DashboardList values={thirdList} />
               </div>
            </DashboardCard>
         </div>

         <Transactions transactions={[]} />
      </div>
   );
};