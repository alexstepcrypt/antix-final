import styles from "./page.module.scss";

import Bg from "/public/images/dashboard-bg.png";
import DashboardTop from "@/DashboardStages/Stage1/DashboardTop/DashboardTop";
import Header from "@/sections/Header/Header";
import { DashboardBottom } from "@/DashboardStages/Stage1/DashboardBottom/DashboardBottom";
import ConnectWallet from "@/components/ConnectModals/ConnectWallet/ConnectWallet";
// import DashboardTopStage2 from "@/DashboardStages/Stage2/DashboardTop/DashboardTop";
// import { Transactions } from '@/DashboardStages/Stage1/DashboardBottom/components/Transactions/Transactions';
// import { mocTransactions } from '@/DashboardStages/Stage1/DashboardBottom/constants/transactions';
import Footer from '@/sections/Footer/Footer'

export default function Dashboard() {
    return (
        <div
            className={styles.page}
            style={{ backgroundImage: `url(${Bg.src})` }}
        >
            <Header isDashboard />
            <ConnectWallet />

            {/* STAGE 1 */}
            <main>
                <DashboardTop />
                <DashboardBottom />
            </main>

            {/* STAGE 2 */}
            {/* <main style={{ padding: '0 50px' }}>
                <DashboardTopStage2 />
                <div style={{ margin: '0 auto', maxWidth: 1200 }}>
                    <Transactions transactions={mocTransactions} />
                </div>

                <Footer
                    style={{
                        marginTop: 100,
                        marginBottom: 28,
                        borderRadius: 16,
                        overflow: 'hidden'
                    }}
                />
            </main> */}
        </div>
    );
}
