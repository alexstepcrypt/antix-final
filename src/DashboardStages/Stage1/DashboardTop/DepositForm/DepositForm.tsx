"use client";

import styles from "./DepositForm.module.scss";
import React from "react";
import Image from "next/image";
import TetherIcon from "/public/svg/tether-icon.svg";
import EtherIcon from "/public/svg/ether-icon.svg";
import { useDeposit } from "@/hooks/useDeposit";
import { ethers } from "ethers";
import {
    ERC20_ABI,
    ETH_CONTRACT_ADDRESS,
    USDT_CONTRACT_ADDRESS,
} from "@/utils/constants";
import { useSDK } from "@metamask/sdk-react";
import { useAuthStore } from "@/stores/useAuthStore";

const DepositForm = () => {
    const {
        amount,
        setAmount,
        balance,
        setBalance,
        displayCurrency,
        toggleCurrency,
        handleInputChange,
        handleMax,
    } = useDeposit();
    const { isConnected, walletAdress } = useAuthStore();

    const handleDeposit = async () => {
        if (!amount || parseFloat(amount) <= 0) {
            alert("Введите сумму для депозита.");
            return;
        }

        if (typeof window.ethereum === "undefined") {
            console.error("MetaMask is not installed");
            return;
        }

        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();

            if (displayCurrency === "ETH") {
                // Отправка ETH
                const transaction = {
                    to: ETH_CONTRACT_ADDRESS,
                    value: ethers.parseEther(amount),
                };
                const txResponse = await signer.sendTransaction(transaction);
                await txResponse.wait();

                console.log("ETH deposit successful:", txResponse);
            } else if (displayCurrency === "USDT") {
                // Проверка авторизации и депозит в USDT
                if (!isConnected) {
                    alert("Откройте MetaMask и авторизуйтесь для депозита.");
                    return;
                }

                const usdtContract = new ethers.Contract(
                    USDT_CONTRACT_ADDRESS,
                    ERC20_ABI,
                    signer
                );

                const decimals = await usdtContract.decimals();
                const amountInWei = ethers.parseUnits(amount, decimals);

                // Одобрение смарт-контракту на снятие указанной суммы
                const approveTx = await usdtContract.approve(
                    walletAdress,
                    amountInWei
                );
                await approveTx.wait();

                // Отправка транзакции на депозитный смарт-контракт
                const depositContract = new ethers.Contract(
                    walletAdress,
                    ["function deposit(uint256 amount)"],
                    signer
                );
                const depositTx = await depositContract.deposit(amountInWei);
                await depositTx.wait();

                alert("Депозит в USDT успешно выполнен!");

                // Обновление баланса после депозита
                const updatedBalance = await usdtContract.balanceOf(
                    signer.address
                );
                setBalance(ethers.formatUnits(updatedBalance, decimals));
            } else {
                console.error("Неподдерживаемая валюта депозита");
            }
        } catch (error) {
            console.error("Ошибка при депозите:", error);
        }
    };

    return (
        <div className={styles.sendingWrapepr}>
                            <div className={styles.chooseCurrWrapper}>
                    <button
                        onClick={toggleCurrency}
                        className={`${styles.chooseCurrBtn} ${
                            displayCurrency === "USDT"
                                ? styles.activeChooseCurrBtn
                                : ""
                        }`}
                    >
                        <Image
                            src={TetherIcon}
                            alt="USDT"
                            width={24}
                            height={24}
                        />
                        <span>USDT</span>
                    </button>
                    <button
                        className={`${styles.chooseCurrBtn} ${
                            displayCurrency === "ETH" ? styles.activeChooseCurrBtn : ""
                        }`}
                        onClick={toggleCurrency}
                    >
                        <Image
                            src={EtherIcon}
                            alt="ETH"
                            width={24}
                            height={24}
                        />
                        <span>ETH</span>
                    </button>
                </div>
            <div className={styles.sending}>
                <div className={styles.sendingTop}>
                    <span className={styles.sendingTitle}>You send</span>
                    <div className={styles.sendingBalance}>
                        <span>
                            Balance:{" "}
                            {balance
                                ? `${balance} ${displayCurrency}`
                                : "loading..."}
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
                            color:
                                amount === "0"
                                    ? "rgba(255, 255, 255, 0.4)"
                                    : "#fff",
                        }}
                    />
                    <button
                        className={styles.sendingChooseCurr}
                        onClick={toggleCurrency}
                    >
                        {displayCurrency === "USDT" ? (
                            <Image
                                src={TetherIcon}
                                alt="USDT"
                                width={24}
                                height={24}
                            />
                        ) : (
                            <Image
                                src={EtherIcon}
                                alt="ETH"
                                width={24}
                                height={24}
                            />
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
