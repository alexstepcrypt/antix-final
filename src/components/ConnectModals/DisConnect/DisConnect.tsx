import React from "react";
import styles from "./DisConnect.module.scss";

import CloseIcon from "/public/dashboard/svg/close-icon.svg";
import DisconnectIcon from "/public/dashboard/svg/disconnect-icon.svg";

import Image from "next/image";
import Link from "next/link";

const DisConnect = ({ closeClick }: { closeClick: () => void }) => {
    return (
        <>
            <div className={styles.bg} />
            <div className={styles.modal}>
                <button className={styles.closeBtn} onClick={closeClick}>
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
                <Link href={"/"} className={styles.modalBtn}>
                    Disconnect Wallet
                </Link>
            </div>
        </>
    );
};

export default DisConnect;
