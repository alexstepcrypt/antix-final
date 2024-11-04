import DashboardTop from "@/DashboardStages/Stage1/DashboardTop/DashboardTop";
import { Transactions } from '@/DashboardStages/components/Transactions/Transactions';
import s from './page.module.scss';
// import DashboardTopStage2 from "@/DashboardStages/Stage2/DashboardTop/DashboardTop";
// import { Transactions } from '@/DashboardStages/Stage1/DashboardBottom/components/Transactions/Transactions';
// import { mocTransactions } from '@/DashboardStages/Stage1/DashboardBottom/constants/transactions';

export default function Dashboard() {
    return (
        <main className={s.main}>
            {/* STAGE 1 */}
            <DashboardTop />
            <div className={s.transactions}>
                <Transactions transactions={[]} />
            </div>

            {/* STAGE 2 */}
            {/* <DashboardTopStage2 />
            <div style={{ margin: '0 auto', maxWidth: 1200 }}>
                <Transactions transactions={mocTransactions} />
            </div> */}
        </main>
    );
}
