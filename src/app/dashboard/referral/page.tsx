"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.scss";
import Image from "next/image";

import CopyIcon from "/public/svg/copy-icon.svg";
import TetherIcon from "/public/svg/tether-icon.svg";
import ETHIcon from "/public/svg/ether-icon.svg";
import WalletIcon from "/public/svg/white-wallet-icon.svg";
import Faq from "@/components/Faq/Faq";
import { useReferralStore } from "@/stores/useReferralStore";
import { generateReferralLink } from "@/utils/generateReferralLink";
import useWalletStore from "@/stores/useWalletStore";
import { formatAddress } from "@/utils/utils";
import CurrencyButton from "@/DashboardStages/components/CurrencyButton/CurrencyButton";

const referralFaq = [
    {
        id: 1,
        title: "How does the referral program work?",
        content: "The Antix referral program lets users earn rewards by inviting friends to join the platform. For each successful referral, both the referrer and the new user may receive rewards."
    },
    {
        id: 2,
        title: "How do I refer someone?",
        content: "You can refer friends by sharing your unique referral link, found in your Antix account. When they join and meet specific conditions, you both benefit."
    },
    {
        id: 3,
        title: "Is there a limit to the rewards I can earn?",
        content: "There may be limits to rewards based on the program’s rules, but users are encouraged to refer as many people as possible for maximum benefits."
    },
    {
        id: 4,
        title: "When will I receive my referral rewards?",
        content: "Rewards are typically credited after the referred user completes specific actions or meets certain requirements."
    },
    {
        id: 5,
        title: "What are the conditions for a referral to be valid?",
        content: "Referrals are usually considered valid when the invited person completes registration and fulfills initial activity criteria on the Antix platform."
    }
];

const Referral = () => {
    const [isGenerated, setIsGenerated] = useState(false);
    const [isCopied, setIsCopied] = useState(false);
    const [refCode, setRefCode] = useState(
        "https://antix/referral?code=YOURCODE"
    );

    const { referralLink, setReferralLink } = useReferralStore();
    const { account, signer, checkConnection } = useWalletStore();

    useEffect(() => {
        if (account) checkConnection();
    }, []);

    const handleGenerateReferralLink = async () => {
        if (referralLink) {
            setRefCode(referralLink);
            setIsGenerated(true);
            return;
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
                    setReferralLink(link);
                    setRefCode(link);
                    setIsGenerated(true);
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
                {isGenerated ? (
                    <span>Active</span>
                ) : (
                    <span className={styles.inactive}>Inactive</span>
                )}
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
                    <div
                        className={`${styles.infoWrapper} ${styles.codeWrapper}`}
                    >
                        <h4>Invite Your Friend and Earn Rewards</h4>
                        <div className={styles.codeContainer}>
                            <input
                                value={refCode}
                                readOnly
                                className={`${styles.code} ${
                                    isGenerated ? styles.genCode : ""
                                }`}
                            />
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
                    <div className={styles.faq}>
                        <Faq faqItems={referralFaq} />
                    </div>
                </div>
                <div className={styles.rightCol}>
                    <div className={styles.infoWrapper}>
                        <div className={styles.topRefBalance}>
                            <h4>Total Referral Balance</h4>
                            <div className={styles.walletBtn}>
                                <Image
                                    src={WalletIcon}
                                    alt="Wallet"
                                    width={24}
                                    height={24}
                                />
                                {account
                                    ? formatAddress(account)
                                    : "loading..."}
                            </div>
                        </div>
                        <div className={styles.bottomRefBalance}>
                            <span className={styles.balance}>0.00</span>
                            <CurrencyButton
                                displayCurrency="USDT"
                                icon={TetherIcon}
                            />
                        </div>
                    </div>
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
                                        src={ETHIcon}
                                        alt=""
                                        width={24}
                                        height={24}
                                    />
                                    <span>
                                        Your Referral ETH Current Phase Balance
                                    </span>
                                </div>
                                <span>0.00</span>
                            </div>
                        </div>
                        <button className={styles.claimBtn}>
                            Claim Referral Earnings
                        </button>
                    </div>
                    <div className={styles.mobileFaq}>
                        <Faq faqItems={referralFaq} />
                    </div>
                </div>
            </div>

            <div className={styles.refWrapper}>
                <h3 className={styles.refTitle}>My Referrals</h3>
                <div className={styles.refContainer}>
                    <div className={styles.refMessage}>You don't have any referrals yet</div>
                </div>
            </div>
        </section>
    );
};

export default Referral;
