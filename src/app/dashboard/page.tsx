"use client"

import styles from "./page.module.scss";

import Bg from "/public/images/dashboard-bg.png";
import DashboardTop from "@/components/DashboardTop/DashboardTop";
import Header from "@/sections/Header/Header";
import { DashboardBottom } from "@/components/DashboardBottom/DashboardBottom";
import { MetaMaskProvider } from "@metamask/sdk-react";
import ConnectWallet from "@/components/ConnectModals/ConnectWallet/ConnectWallet";

export default function Dashboard() {
    const host =
        typeof window !== "undefined" ? window.location.host : "defaultHost";

    const sdkOptions = {
        logging: { developerMode: false },
        checkInstallationImmediately: false,
        dappMetadata: {
            name: "Next-Metamask-Boilerplate",
            url: host,
        },
    };

    return (
        <MetaMaskProvider debug={false} sdkOptions={sdkOptions}>
            <div
                className={styles.page}
                style={{ backgroundImage: `url(${Bg.src})` }}
            >
                <Header />
                <ConnectWallet />
                <main>
                    <DashboardTop />
                    <DashboardBottom />
                </main>
            </div>
        </MetaMaskProvider>
    );
}
