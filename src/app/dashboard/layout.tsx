import dynamic from 'next/dynamic';

import ConnectWallet from "@/components/ConnectModals/ConnectWallet/ConnectWallet";
import Header from "@/sections/Header/Header";

import Bg from "/public/images/dashboard-bg.png";
import styles from "./page.module.scss";

const Footer = dynamic(() => import("@/sections/Footer/Footer"), { ssr: false });

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main
            className={styles.page}
            style={{ backgroundImage: `url(${Bg.src})` }}
        >
            <Header isDashboard />
            {/* <ConnectWallet /> */}
            {children}
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
