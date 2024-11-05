"use client";
import React, { useEffect, useState } from "react";
import styles from "./RefferalModal.module.scss";
import { useAuthStore } from "@/stores/useAuthStore";
import { formatAddress } from "@/utils/utils";

import Image from "next/image";
import CloseIcon from "/public/dashboard/svg/close-icon.svg";
import CopyIcon from "/public/svg/copy-icon.svg";
import ChooseWallet from "@/components/ConnectModals/ChooseWallet/ChooseWallet";

interface IRefferalModal {
    onClose: () => void;
}

const RefferalModal: React.FC<IRefferalModal> = ({ onClose }) => {
    const { walletAdress, isConnected } = useAuthStore();
    const [stage, setStage] = useState<0 | 1 | 2>(0);
    const [isCopied, setIsCopied] = useState(false);
    const [refCode, setRefCode] = useState(
        "https://antix/referral?code=YOURCODE"
    );

    const handleCopy = () => {
        navigator.clipboard.writeText(refCode).then(() => {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        });
    };

    useEffect(() => {
        setStage(0);
    }, [isConnected]);

    if (stage === 2) {
        return <ChooseWallet onClose={onClose} />;
    }

    if (stage === 0) {
        return (
            <>
                <div className={styles.bg} onClick={onClose} />
                <div className={styles.modal}>
                    <button className={styles.closeBtn} onClick={onClose}>
                        <Image
                            src={CloseIcon}
                            alt={"Close"}
                            width={24}
                            height={24}
                        />
                    </button>
                    <p className={styles.subtitle}>
                        Thank уоu for choosing to promote Antix!
                    </p>
                    <h3 className={styles.title}>
                        Earn up to 10% reward in USDT on purchases made through
                        your referral link!
                    </h3>
                    {!isConnected && (
                        <span className={styles.disConnectInfo}>
                            То get your unique referral link, <br /> please
                            connect your wallet first.
                        </span>
                    )}
                    {isConnected ? (
                        <button
                            className={styles.connectBtn}
                            onClick={() => setStage(1)}
                        >
                            Generate Code
                        </button>
                    ) : (
                        <button
                            className={styles.connectBtn}
                            onClick={() => setStage(2)}
                        >
                            Connect Wallet
                        </button>
                    )}
                    {isConnected && (
                        <div className={styles.generateBtn}>
                            Connected Wallet {formatAddress(walletAdress)}
                        </div>
                    )}
                </div>
            </>
        );
    }
    if (stage === 1) {
        return (
            <>
                <div className={styles.bg} onClick={onClose} />
                <div className={styles.modal}>
                    <button className={styles.closeBtn} onClick={onClose}>
                        <Image
                            src={CloseIcon}
                            alt={"Close"}
                            width={24}
                            height={24}
                        />
                    </button>
                    <p className={styles.subtitle}>
                        Thank уоu for choosing to promote Antix!
                    </p>
                    <h3 className={styles.title}>
                        Earn up to 10% reward in USDT on purchases made through
                        your referral link!
                    </h3>

                    <div className={styles.copyWrapper}>
                        <span>antix/referral?code=YOURCODE</span>
                        <button className={styles.copyBtn} onClick={handleCopy}>
                            <Image
                                src={CopyIcon}
                                alt="Copy"
                                width={24}
                                height={24}
                            />
                            {isCopied ? "Copied" : "Copy Link"}
                        </button>
                    </div>

                    <div className={styles.generateBtn}>
                        Connected Wallet {formatAddress(walletAdress)}
                    </div>

                    <div className={styles.hr} />

                    <div className={styles.bottomInfo}>
                        <span className={styles.refStatus}>
                            Referral Active
                        </span>
                        <div className={styles.balanceInfo}>
                            Your Referral USDT Current Phase Balance:{" "}
                            <span>0.00</span>
                        </div>
                        <div className={styles.balanceInfo}>
                            Your Referral USDT Claimable Balance:{" "}
                            <span>0.00</span>
                        </div>

                        <button className={styles.claimBtn}>
                            Claim Referral Earnings
                        </button>
                    </div>
                </div>
            </>
        );
    }
};

export default RefferalModal;
