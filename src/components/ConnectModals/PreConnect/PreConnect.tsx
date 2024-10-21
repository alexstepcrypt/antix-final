import React from "react";
import styles from "./PreConnect.module.scss";

const PreConnect = ({ onclick }: { onclick: () => void }) => {
    return (
        <>
            <div className={styles.bg} />
            <div className={styles.modal}>
                <p className={styles.modalTitle}>
                    Connect your Wallet to unlock all features
                </p>
                <button className={styles.modalBtn} onClick={onclick}>
                    Connect Wallet
                </button>
            </div>
        </>
    );
};

export default PreConnect;
