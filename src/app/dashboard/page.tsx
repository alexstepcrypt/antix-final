"use client";

import styles from "./page.module.scss";

import Bg from "/public/images/dashboard-bg.png";
import DashboardTop from "@/components/DashboardTop/DashboardTop";
// import DashboardHeader from "@/sections/DashboardHeader/DashboardHeader";
import Header from "@/sections/Header/Header";
import { DashboardBottom } from "@/components/DashboardBottom/DashboardBottom";
import { useState } from "react";
import PreConnect from "@/components/ConnectModals/PreConnect/PreConnect";

import MataMaskIcon from "/public/dashboard/svg/meta-mask.svg";
import WalletConnectIcon from "/public/dashboard/svg/wallet-connect.svg";
import TrustWalletIcon from "/public/dashboard/svg/trust-wallet.svg";
import CoinbaseWalletIcon from "/public/dashboard/svg/coinbase-wallet.svg";
import Image from "next/image";
import ChooseWallet from "@/components/ConnectModals/ChooseWallet/ChooseWallet";
import DisConnect from "@/components/ConnectModals/DisConnect/DisConnect";

const buttonsList = [
    { icon: MataMaskIcon, label: "MetaMask", isPopular: true },
    { icon: WalletConnectIcon, label: "WalletConnect", isPopular: false },
    { icon: TrustWalletIcon, label: "Trust Wallet", isPopular: false },
    {
        icon: CoinbaseWalletIcon,
        label: "Coinbase Wallet",
        isPopular: false,
    },
];

export default function Dashboard() {
    const [isConnect, setIsConnect] = useState<
        "preConnect" | "chooseWallet" | "connected" | "disConnect"
    >("preConnect");

    const preConnectClick = () => setIsConnect("chooseWallet");
    const chooseWalletClick = () => setIsConnect("connected");
    const disconnectButton = () => setIsConnect("disConnect");

    const closeClick = () => setIsConnect("connected");

    return (
        <div
            className={styles.page}
            style={{ backgroundImage: `url(${Bg.src})` }}
        >
            <Header
                isDashboard={
                    isConnect === "connected" || isConnect === "disConnect"
                }
                disconnectClick={disconnectButton}
            />
            {isConnect === "preConnect" && (
                <PreConnect onclick={preConnectClick} />
            )}
            {isConnect === "chooseWallet" && (
                <ChooseWallet
                    buttonsList={buttonsList}
                    onclick={chooseWalletClick}
                />
            )}
            {isConnect === "disConnect" && (
                <DisConnect closeClick={closeClick} />
            )}
            <main>
                <DashboardTop />
                <DashboardBottom />
            </main>
        </div>
    );
}
