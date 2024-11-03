"use client";

import { useState } from "react";
import styles from "./page.module.scss";
import Image from "next/image";

import CopyIcon from "/public/svg/copy-icon.svg";
import TetherIcon from "/public/svg/tether-icon.svg";

const Referral = () => {
    const [isGenerated, setIsGenerated] = useState(false);
    const [isCopied, setIsCopied] = useState(false);
    const [refCode, setRefCode] = useState('https://antix/referral?code=YOURCODE');

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
                <div className={styles.leftCol}></div>
                <div className={styles.rightCol}>
                    <div className={styles.topInfo}>
                        <h3>Thank уоu for choosing to promote Antix!</h3>
                        <p>
                            Earn up to 10% reward in USDT on purchases made
                            through your referral link!
                        </p>
                    </div>
                    <div className={styles.info}>
                        <h4>Invite Your Friend and Earn Rewards</h4>
                        <div className={styles.codeContainer}>
                            <span className={`${styles.code} ${isGenerated ? styles.genCode : ""}`}>
                                {refCode}
                            </span>
                            {!isGenerated ? (
                                <button
                                    className={styles.codeBtn}
                                    onClick={() => setIsGenerated(true)}
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
                    <div className={styles.info}>
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