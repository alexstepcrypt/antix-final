"use client";

import React, { useState } from "react";
import styles from "./DashboardTop.module.scss";
import { Timer } from "./Timer/Timer";
import Image from "next/image";

import TetherIcon from "/public/svg/tether-icon.svg";
import { ethers } from "ethers";

const DashboardTop = () => {
    const [amount, setAmount] = useState<string>("0");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const cleanedValue = value.replace(/\D/g, "").replace(/^0+/, "");
        setAmount(cleanedValue === "" ? "0" : cleanedValue);
    };

    const handleDeposit = async () => {
        if (typeof window.ethereum === "undefined") {
            console.error("MetaMask is not installed");
            return;
        }

        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();

            const transaction = {
                to: "0x0610FB7da1D8509B0bBF3f8372Af47781cDED6fB",
                value: ethers.parseEther(amount),
            };

            const txResponse = await signer.sendTransaction(transaction);
            await txResponse.wait();

            console.log("Deposit successful:", txResponse);
        } catch (error) {
            console.error("Error during deposit:", error);
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Dashboard</h2>
            <div className={styles.leftCol}>
                <div className={styles.info}>
                    <h5 className={styles.infoTitle}>
                        Get whitelisted for Stage 1
                    </h5>
                    <p className={styles.infoText}>
                        Make a deposit to gain priority access to the ANTIX
                        token sale with a{" "}
                        <span>70% discount from listing price.</span> Limited
                        availability — act promptly to secure the best
                        conditions.
                    </p>
                </div>
                <div className={styles.timer}>
                    <h5 className={styles.timerTitle}>
                        Deposit stage closes in:
                    </h5>
                    <Timer targetDate={new Date("2024-12-31T23:59:59")} />
                </div>
            </div>
            <div className={styles.rightCol}>
                <div className={styles.balanceWrapper}>
                    <div className={styles.balanceTitle}>
                        Deposit Balance
                        <span>Up to 70% discount</span>
                    </div>
                    <div className={styles.balance}>
                        <Image
                            src={TetherIcon}
                            alt="Tether"
                            width={40}
                            height={40}
                        />
                        <span>1,900.15 USDT</span>
                    </div>
                </div>
                <div className={styles.sendingWrapepr}>
                    <div className={styles.sending}>
                        <div className={styles.sendingTop}>
                            <span className={styles.sendingTitle}>
                                You send
                            </span>
                            <div className={styles.sendingBalance}>
                                <span>Balance: 450,59 USDT</span>
                                <button className={styles.sendingBalanceBtn}>
                                    Max
                                </button>
                            </div>
                        </div>
                        <div className={styles.sendingBottom}>
                            <input
                                type="text"
                                className={styles.sendingInput}
                                value={amount}
                                onChange={handleInputChange}
                            />
                            <button className={styles.sendingChooseCurr}>
                                <Image
                                    src={TetherIcon}
                                    alt="Tether"
                                    width={24}
                                    height={24}
                                />
                                <span>USDT</span>
                            </button>
                        </div>
                    </div>
                    <button
                        className={styles.depositBtn}
                        onClick={handleDeposit}
                    >
                        Deposit Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DashboardTop;
