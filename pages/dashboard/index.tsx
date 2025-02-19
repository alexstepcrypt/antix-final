import dynamic from 'next/dynamic';
import ConnectWallet from "@/components/ConnectModals/ConnectWallet/ConnectWallet";
import Header from "@/sections/Header/Header";
import Bg from "/public/images/dashboard-bg.png";
import styles from "./dashboard.module.scss";
import DashboardTop from "@/DashboardStages/Stage1/DashboardTop/DashboardTop";
import usePlaceholderStore from '@/stores/usePlaceholderStore';
import Placeholder from '@/components/Placeholder/Placeholder';

import { Transactions } from '@/DashboardStages/components/Transactions/Transactions';
// import { mocTransactions } from '@/DashboardStages/constants/transactions';
// import DashboardTopStage2 from "@/DashboardStages/Stage2/DashboardTop/DashboardTop";
// import StageInfo from "@/hooks/StageInfo";


const Footer = dynamic(() => import("@/sections/Footer/Footer"), { ssr: false });

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { isBlocked } = usePlaceholderStore();
  
    if (isBlocked) {
      return <Placeholder />;
    }

    return (
        <main
            className={styles.page}
            style={{ backgroundImage: `url(${Bg.src})` }}
        >
            <Header isDashboard />
            <ConnectWallet />
            <main className={styles.main}>
                {/* STAGE 1 */}
                {/* <StageInfo /> */}
                <DashboardTop />
                <div className={styles.transactions}>
                    <Transactions />
                </div>

                {/* STAGE 2 */}
                {/* <DashboardTopStage2 />
                <div style={{ margin: '0 auto', maxWidth: 1200 }}>
                    <Transactions transactions={mocTransactions} />
                </div> */}
            </main>
            <Footer
                style={{
                    margin: '100px 16px 16px',
                    borderRadius: 16,
                    overflow: 'hidden'
                }}
            />
        </main>
    );
}
