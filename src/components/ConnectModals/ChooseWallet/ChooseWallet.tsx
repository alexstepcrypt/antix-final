"use client";

import React from "react";
import styles from "./ChooseWallet.module.scss";
import Image from "next/image";
import MataMaskIcon from "/public/dashboard/svg/meta-mask.svg";
import WalletConnectIcon from "/public/dashboard/svg/wallet-connect.svg";
import TrustWalletIcon from "/public/dashboard/svg/trust-wallet.svg";
import CoinbaseWalletIcon from "/public/dashboard/svg/coinbase-wallet.svg";
import useWalletStore from "@/stores/useWalletStore";
import { useReferralStore } from "@/stores/useReferralStore";
// import axios from "axios";

interface IChooseWallet {
    onClose: () => void;
}

const ChooseWallet: React.FC<IChooseWallet> = ({ onClose }) => {
    const { connectWallet } = useWalletStore();
    // const { referralCode } = useReferralStore();

    const handleConnectWallet = async () => {
        try {
            await connectWallet();

            // if (referralCode) {
            //     try {
            //         const tokenResponse = await axios.post(
            //             "https://antix.cryptoindex.com/profile/auth",
            //             { wallet: account, msg, sign, refcode: referralCode},
            //             { headers: { "Content-Type": "application/json" } }
            //         );
            //         console.log(
            //             "Authentication successful",
            //             tokenResponse.data
            //         );
            //     } catch (err) {
            //         console.warn("Authentication error", err);
            //     }
            // }
        } catch (err) {
            console.warn(`Ошибка подключения`, err);
        }
    };

    return (
        <>
            <div className={styles.bg} onClick={onClose} />
            <div className={styles.modal}>
                <p className={styles.modalTitle}>Connect Your Wallet</p>
                <div className={styles.modalBtns}>
                    <button
                        className={styles.modalBtn}
                        onClick={handleConnectWallet}
                    >
                        <Image
                            src={MataMaskIcon}
                            alt={"MetaMask"}
                            width={24}
                            height={24}
                        />
                        <p>MetaMask</p>
                        <span>Popular</span>
                    </button>
                    <button
                        onClick={handleConnectWallet}
                        className={styles.modalBtn}
                    >
                        <Image
                            src={WalletConnectIcon}
                            alt={"WalletConnect"}
                            width={24}
                            height={24}
                        />
                        <p>WalletConnect</p>
                    </button>
                    <button
                        onClick={handleConnectWallet}
                        className={styles.modalBtn}
                    >
                        <Image
                            src={TrustWalletIcon}
                            alt={"Trust Wallet"}
                            width={24}
                            height={24}
                        />
                        <p>Trust Wallet</p>
                    </button>
                    <button
                        onClick={handleConnectWallet}
                        className={styles.modalBtn}
                    >
                        <Image
                            src={CoinbaseWalletIcon}
                            alt={"Coinbase Wallet"}
                            width={24}
                            height={24}
                        />
                        <p>Coinbase Wallet</p>
                    </button>
                </div>
            </div>
        </>
    );
};

export default ChooseWallet;
