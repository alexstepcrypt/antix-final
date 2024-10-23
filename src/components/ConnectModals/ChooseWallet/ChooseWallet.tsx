import React from "react";
import styles from "./ChooseWallet.module.scss";
import Image from "next/image";

interface ChooseWalletProps {
    buttonsList: {
        icon: any;
        label: string;
        isPopular: boolean;
    }[];
    onclick: () => void;
}

const ChooseWallet = ({ buttonsList, onclick }: ChooseWalletProps) => {
    return (
        <>
            <div className={styles.bg} />
            <div className={styles.modal}>
                <p className={styles.modalTitle}>Connect Your Wallet</p>
                <div className={styles.modalBtns}>
                    {buttonsList.map((button) => (
                        <button className={styles.modalBtn} onClick={onclick}>
                            <Image
                                src={button.icon.src}
                                alt={button.label}
                                width={24}
                                height={24}
                            />
                            <p>Connect Wallet</p>
                            {button.isPopular && <span>Popular</span>}
                        </button>
                    ))}
                </div>
            </div>
        </>
    );
};

export default ChooseWallet;
