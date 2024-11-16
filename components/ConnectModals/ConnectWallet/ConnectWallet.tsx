"use client";

import styles from "./ConnectWallet.module.scss";
import { useConnectWallet } from '@/hooks/useConnectWallet'

const ConnectWallet: React.FC = () => {
    const { isConnected, status, connect } = useConnectWallet()

    if (isConnected) return <></>

    return <>
        <div className={styles.bg} />
        <div className={styles.modal}>
            <p className={styles.modalTitle}>
                Connect your Wallet to unlock all features
            </p>
            <button
                className={styles.connectBtn}
                onClick={connect}
            >
                Connect Wallet
            </button>
        </div>
    </>
}

export default ConnectWallet;
