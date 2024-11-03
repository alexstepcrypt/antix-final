import ConnectWallet from "@/components/ConnectModals/ConnectWallet/ConnectWallet";
import Footer from "@/sections/Footer/Footer";
import Header from "@/sections/Header/Header";

import Bg from "/public/images/dashboard-bg.png";
import styles from "./page.module.scss";

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
            <ConnectWallet />
            {children}
            <Footer />
        </main>
    );
}
