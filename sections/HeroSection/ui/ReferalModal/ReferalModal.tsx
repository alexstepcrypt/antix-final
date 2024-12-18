"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./ReferalModal.module.scss";
import { formatAddress } from "@/utils/utils";
import { useConnectWallet } from '@/hooks/useConnectWallet'
import Image from "next/image";
import CloseIcon from "/public/dashboard/svg/close-icon.svg";
import CopyIcon from "/public/svg/copy-icon.svg";
import { DepositPopover } from "@/DashboardStages/Stage1/DashboardTop/DepositForm/DepositPopover/DepositPopover";
import { useTranslation } from "react-i18next";
import Api from "@/utils/api";


interface IReferalModal {
    onClose: () => void;
}

const ReferalModal: React.FC<IReferalModal> = ({ onClose }) => {
    const router = useRouter()
    const { account, profile } = useConnectWallet();
    const [stage, setStage] = useState<0 | 1 | 2>(0);
    const [isCopied, setIsCopied] = useState(false);
    const [refCode, setRefCode] = useState("");
    const [openPopover, setOpenPopover] = useState(false);
    const { t } = useTranslation('landing');

    const handleCopy = () => {
        const link = Api.genReferralLink(refCode)
        if (navigator.clipboard) {
            navigator.clipboard
                .writeText(link)
                .then(() => {
                    setIsCopied(true);
                    setTimeout(() => setIsCopied(false), 2000);
                })
                .catch((err) => {
                    console.error("Ошибка при копировании:", err);
                });
        } else {
            const textArea = document.createElement("textarea");
            textArea.value = link;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand("copy");
            document.body.removeChild(textArea);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        }
    };

    useEffect(() => {
        if(account) {
            setStage(0)
        }
    }, [account]);


    const handleGenerateReferralLink = async () => {
        if (!account) return
        router.push('/dashboard/referral')
    };


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
                        {t('referalModal.subtitle')}
                    </p>
                    <h3 className={styles.title}>
                        {t('referalModal.title')}
                    </h3>
                    {!account && (
                        <span className={styles.disConnectInfo}>
                            {t('referalModal.disconnectedInfo.line1')} <br /> {t('referalModal.disconnectedInfo.line2')}
                        </span>
                    )}
                    {account ? (
                        <button
                            className={styles.connectBtn}
                            onClick={handleGenerateReferralLink}
                        >
                            {profile?.refcode ? "Referral" : "Generate Code"}
                        </button>
                    ) : (
                        <button
                            className={styles.connectBtn}
                            onClick={() => setStage(2)}
                        >
                            {t('referalModal.connectButton')}
                        </button>
                    )}
                    {account && (
                        <div className={styles.generateBtn}>
                            {t('referalModal.connectedWallet')} {formatAddress(account)}
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
                        {t('referalModal.subtitle')}
                    </p>
                    <h3 className={styles.title}>
                        {t('referalModal.title')}
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
                            {isCopied ? t('referalModal.copyLink.copied') : t('referalModal.copyLink.default')}
                        </button>
                    </div>

                    <div className={styles.generateBtn}>
                        {t('referalModal.connectedWallet')} {account && formatAddress(account)}
                    </div>

                    <div className={styles.hr} />

                    <div className={styles.bottomInfo}>
                        <span className={styles.refStatus}>
                            {t('referalModal.referralStatus')}
                        </span>
                        <div className={styles.balanceInfo}>
                            {t('referalModal.balanceInfo.currentPhase')}{" "}
                            <span>0.00</span>
                        </div>
                        <div className={styles.balanceInfo}>
                            {t('referalModal.balanceInfo.claimable')}{" "}
                            <span>0.00</span>
                        </div>

                        <div className={styles.claimBtnWrapper}>
                            <DepositPopover
                                style={{bottom: "120%", top: "auto", width: "200%", left: 50}}
                                open={openPopover}
                                text={t('referalModal.claimPopoverText')}
                            >
                                <button
                                    className={styles.claimBtn}
                                    onClick={() => setOpenPopover((p) => !p)}
                                    onBlur={() => setOpenPopover(false)}
                                >
                                    {t('referalModal.claimButton')}
                                </button>
                            </DepositPopover>
                        </div>
                    </div>
                </div>
            </>
        );
    }
};

export default ReferalModal;
