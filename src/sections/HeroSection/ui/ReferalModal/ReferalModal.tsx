"use client";

import React, { useEffect, useState } from "react";
import styles from "./ReferalModal.module.scss";
import { formatAddress } from "@/utils/utils";

import Image from "next/image";
import CloseIcon from "/public/dashboard/svg/close-icon.svg";
import CopyIcon from "/public/svg/copy-icon.svg";
import ChooseWallet from "@/components/ConnectModals/ChooseWallet/ChooseWallet";
import { ethers } from "ethers";
import { generateReferralLink } from "@/utils/generateReferralLink";
import { useReferralStore } from "@/stores/useReferralStore";
import useWalletStore from "@/stores/useWalletStore";

interface IReferalModal {
    onClose: () => void;
}

const ReferalModal: React.FC<IReferalModal> = ({ onClose }) => {
    const { account, signer } = useWalletStore();
    const { referralLink, setReferralLink } = useReferralStore();
    const [stage, setStage] = useState<0 | 1 | 2>(referralLink === "" ? 0 : 1);
    const [isCopied, setIsCopied] = useState(false);
    const [refCode, setRefCode] = useState(referralLink);

    const handleCopy = () => {
        navigator.clipboard.writeText(refCode).then(() => {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        });
    };

    useEffect(() => {
        if(referralLink && account) {
            setStage(1)
        } else {
            setStage(0)
        }
    }, [account]);

    const handleGenerateReferralLink = async () => {
        if (window.ethereum && account && signer) {
            try {
                const msg = "I am signing in to confirm my referral link";
                const sign = await signer.signMessage(msg);

                const link = await generateReferralLink({
                    wallet: account,
                    sign: sign,
                    msg: msg,
                });
                if (link) {
                    setReferralLink(link)
                    setRefCode(link);
                    setStage(1);
                }
            } catch (error) {
                console.error("Ошибка авторизации:", error);
            }
        }
    };

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
                    {!account && (
                        <span className={styles.disConnectInfo}>
                            То get your unique referral link, <br /> please
                            connect your wallet first.
                        </span>
                    )}
                    {account ? (
                        <button
                            className={styles.connectBtn}
                            onClick={handleGenerateReferralLink}
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
                    {account && (
                        <div className={styles.generateBtn}>
                            Connected Wallet {formatAddress(account)}
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
                        <input type="text" value={refCode} readOnly />
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
                        Connected Wallet {account && formatAddress(account)}
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

export default ReferalModal;
