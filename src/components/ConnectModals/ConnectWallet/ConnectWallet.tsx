"use client";

import React, { useEffect, useState } from "react";
import styles from "./ConnectWallet.module.scss";
import { useSDK } from "@metamask/sdk-react";
import { useAuthStore } from "@/stores/useAuthStore";
import ChooseWallet from "../ChooseWallet/ChooseWallet";

const ConnectWallet: React.FC = () => {
    const [stage, setStage] = useState<0 | 1 | 2>(1);

    const { account } = useSDK();
    const { isConnected, setIsConnected, setWalletAdress } = useAuthStore();

    useEffect(() => {
        if (isConnected) {
            setStage(0);
        } else if (account) {
            setIsConnected(true);
            setWalletAdress(account);
            setStage(0);
        }
    }, [account]);

    if (stage === 0) {
        return null;
    }

    if (stage === 1) {
        return (
            <>
                <div className={styles.bg} />
                <div className={styles.modal}>
                    <p className={styles.modalTitle}>
                        Connect your Wallet to unlock all features
                    </p>
                    <button
                        className={styles.connectBtn}
                        onClick={() => setStage(2)}
                    >
                        Connect Wallet
                    </button>
                </div>
            </>
        );
    }
    if (stage === 2) {
        return <ChooseWallet onClose={() => setStage(1)} />;
    }
};

export default ConnectWallet;
