"use client";

import styles from "./DepositForm.module.scss";
import React from "react";
import Image from "next/image";
import TetherIcon from "/public/svg/tether-icon.svg";
import EtherIcon from "/public/svg/ether-icon.svg";
import { useDeposit } from "@/hooks/useDeposit";
import { ethers } from "ethers";
import { ETH_CONTRACT_ADDRESS } from "@/utils/constants";

const DepositForm = () => {
    const {
        amount,
        setAmount,
        balance,
        displayCurrency,
        toggleCurrency,
        handleInputChange,
        handleMax,
    } = useDeposit();

    const handleDeposit = async () => {
        if (typeof window.ethereum === "undefined") {
            console.error("MetaMask is not installed");
            return;
        }

        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();

            const transaction = {
                to: ETH_CONTRACT_ADDRESS,
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
        <div className={styles.sendingWrapepr}>
            <div className={styles.sending}>
                <div className={styles.sendingTop}>
                    <span className={styles.sendingTitle}>You send</span>
                    <div className={styles.sendingBalance}>
                        <span>
                            Balance: {balance ? `${balance} ${displayCurrency}` : "loading..."}
                        </span>
                        <button
                            className={styles.sendingBalanceBtn}
                            onClick={() => handleMax(balance ? balance : "")}
                        >
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
                        style={{
                            color: amount === "0" ? "rgba(255, 255, 255, 0.4)" : "#fff",
                        }}
                    />
                    <button
                        className={styles.sendingChooseCurr}
                        onClick={toggleCurrency}
                    >
                        {displayCurrency === "USDT" ? (
                            <Image src={TetherIcon} alt="USDT" width={24} height={24} />
                        ) : (
                            <Image src={EtherIcon} alt="ETH" width={24} height={24} />
                        )}
                        
                        <span>{displayCurrency}</span>
                    </button>
                </div>
            </div>
            <button
                className={styles.depositBtn}
                onClick={handleDeposit}
                disabled={balance ? Number(amount) > Number(balance) : true}
            >
                Deposit Now
            </button>
        </div>
    );
};

export default DepositForm;
