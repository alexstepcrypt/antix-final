import styles from "./page.module.scss";

import DashboardTop from "@/DashboardStages/Stage1/DashboardTop/DashboardTop";
import { DashboardBottom } from "@/DashboardStages/Stage1/DashboardBottom/DashboardBottom";
// import DashboardTopStage2 from "@/DashboardStages/Stage2/DashboardTop/DashboardTop";
// import { Transactions } from '@/DashboardStages/Stage1/DashboardBottom/components/Transactions/Transactions';
// import { mocTransactions } from '@/DashboardStages/Stage1/DashboardBottom/constants/transactions';

export default function Dashboard() {
    return (
        <div>
            {/* STAGE 1 */}
            <DashboardTop />
            <DashboardBottom />

            {/* STAGE 2 */}
            {/* <DashboardTopStage2 />
            <div style={{ margin: "0 auto", maxWidth: 1200 }}>
                <Transactions transactions={mocTransactions} />
            </div> */}
        </div>
    );
}
