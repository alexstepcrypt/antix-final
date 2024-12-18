"use client";

import { useTranslation } from "react-i18next";
import styles from "./ConnectWallet.module.scss";
import { useConnectWallet } from '@/hooks/useConnectWallet'

const ConnectWallet: React.FC = () => {
    const { isConnected, isReady, connect } = useConnectWallet()
    const { t } = useTranslation('dashboard');

    if (isConnected) return <></>

    return <>
        <div className={styles.bg} />
        {isReady && <div className={styles.modal}>
            <p className={styles.modalTitle}>
                {t('stage.connectWallet.title')}
            </p>
            <button
                className={styles.connectBtn}
                onClick={connect}
            >
                {t('stage.connectWallet.btn')}
            </button>
        </div>}
    </>
}

export default ConnectWallet;
