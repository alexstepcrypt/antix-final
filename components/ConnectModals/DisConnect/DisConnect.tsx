"use client"

import React from "react";
import styles from "./DisConnect.module.scss";

import CloseIcon from "/public/dashboard/svg/close-icon.svg";
import DisconnectIcon from "/public/dashboard/svg/disconnect-icon.svg";

import Image from "next/image";
import { useConnectWallet } from '@/hooks/useConnectWallet'


const DisConnect = ({setIsOpen}: {setIsOpen: React.Dispatch<React.SetStateAction<boolean>>}) => {
    const { disconnect } = useConnectWallet()

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
                    Are you sure you want to disconnect your wallet?
                </p>
                <p className={styles.modalSubtitle}>
                    This will end your session.
                </p>
                <button onClick={handleClick} className={styles.modalBtn}>
                    Disconnect Wallet
                </button>
            </div>
        </>
    );
};

export default DisConnect;
