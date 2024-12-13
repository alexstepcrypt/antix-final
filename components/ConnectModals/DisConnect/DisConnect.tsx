"use client"

import React from "react";
import styles from "./DisConnect.module.scss";

import CloseIcon from "/public/dashboard/svg/close-icon.svg";
import DisconnectIcon from "/public/dashboard/svg/disconnect-icon.svg";

import Image from "next/image";
import { useConnectWallet } from '@/hooks/useConnectWallet'
import { useTranslation } from "react-i18next";


const DisConnect = ({setIsOpen}: {setIsOpen: React.Dispatch<React.SetStateAction<boolean>>}) => {
    const { disconnect } = useConnectWallet()
    const { t } = useTranslation('landing');

    const handleClick = () => {
        disconnect()
    }

    return (
        <>
            <div className={styles.bg} onClick={() => setIsOpen(false)} />
            <div className={styles.modal}>
                <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
                    <Image
                        src={CloseIcon}
                        alt={"Close"}
                        width={24}
                        height={24}
                    />
                </button>
                <Image src={DisconnectIcon} alt={""} width={44} height={44} />
                <p className={styles.modalTitle}>
                    {t('disConnect.modalTitle')}
                </p>
                <p className={styles.modalSubtitle}>
                    {t('disConnect.modalSubtitle')}
                </p>
                <button onClick={handleClick} className={styles.modalBtn}>
                    {t('disConnect.disconnectButton')}
                </button>
            </div>
        </>
    );
};

export default DisConnect;
