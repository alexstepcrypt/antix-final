"use client";

import { useState } from "react";
import styles from "./page.module.scss";
import Image from "next/image";

import CopyIcon from "/public/svg/copy-icon.svg";
import TetherIcon from "/public/svg/tether-icon.svg";
import { faqItems } from "@/DashboardStages/Stage1/DashboardTop/FaqAccordion/mocdata";
import Faq from "@/components/Faq/Faq";
import { useReferralStore } from "@/stores/useReferralStore";
import { generateReferralLink } from "@/utils/generateReferralLink";
import useWalletStore from "@/stores/useWalletStore";

const Referral = () => {
    const [isGenerated, setIsGenerated] = useState(false);
    const [isCopied, setIsCopied] = useState(false);
    const [refCode, setRefCode] = useState('https://antix/referral?code=YOURCODE');

    const { referralLink, setReferralLink } = useReferralStore();
    const { account, signer } = useWalletStore();

    const handleGenerateReferralLink = async () => {
        if(referralLink) {
            setRefCode(referralLink)
            setIsGenerated(true)
            return
        }
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
                    setIsGenerated(true)
                }
            } catch (error) {
                console.error("Ошибка авторизации:", error);
            }
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(refCode).then(() => {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        });
    };

    return (
        <section className={styles.container}>
            <div className={styles.titleWrapper}>
                <h1 className={styles.title}>Referral</h1>
                <span>Referral Active</span>
            </div>

            <div className={styles.wrapper}>
                <div className={styles.leftCol}>
                <div className={styles.topInfo}>
                        <h3>Thank уоu for choosing to promote Antix!</h3>
                        <p>
                            Earn up to 10% reward in USDT on purchases made
                            through your referral link!
                        </p>
                    </div>
                    <div className={`${styles.infoWrapper} ${styles.codeWrapper}`}>
                        <h4>Invite Your Friend and Earn Rewards</h4>
                        <div className={styles.codeContainer}>
                            <span className={`${styles.code} ${isGenerated ? styles.genCode : ""}`}>
                                {refCode}
                            </span>
                            {!isGenerated ? (
                                <button
                                    className={styles.codeBtn}
                                    onClick={handleGenerateReferralLink}
                                >
                                    Generate Code
                                </button>
                            ) : (
                                <button
                                    className={styles.codeBtnGenerated}
                                    onClick={handleCopy}
                                >
                                    <Image
                                        src={CopyIcon}
                                        alt="Copy"
                                        width={24}
                                        height={24}
                                    />
                                    {isCopied ? "Copied" : "Copy Link"}
                                </button>
                            )}
                        </div>
                    </div>
                    <Faq faqItems={faqItems} />
                </div>
                <div className={styles.rightCol}>

                    <div className={styles.infoWrapper}>
                        <div className={styles.balancesWrapper}>
                            <div className={styles.balanceContainer}>
                                <div className={styles.balanceTop}>
                                    <Image
                                        src={TetherIcon}
                                        alt=""
                                        width={24}
                                        height={24}
                                    />
                                    <span>
                                        Your Referral USDT Current Phase Balance
                                    </span>
                                </div>
                                <span>0.00</span>
                            </div>
                            <div className={styles.balanceContainer}>
                                <div className={styles.balanceTop}>
                                    <Image
                                        src={TetherIcon}
                                        alt=""
                                        width={24}
                                        height={24}
                                    />
                                    <span>
                                        Your Referral USDT Current Phase Balance
                                    </span>
                                </div>
                                <span>0.00</span>
                            </div>
                        </div>
                        <button className={styles.claimBtn}>
                            Claim Referral Earnings
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Referral