"use client";

import styles from "./DepositForm.module.scss";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from 'next/link';
import TetherIcon from "/public/svg/tether-icon.svg";
import EtherIcon from "/public/svg/ether-icon.svg";
import Mastercard from '/public/dashboard/svg/mastercard-logo.svg';
import Visa from '/public/dashboard/svg/visa-logo.svg';
import { Eip1193Provider, ethers } from "ethers";
import {
    ERC20_ABI,
    ETH_CONTRACT_ADDRESS,
    USDT_CONTRACT_ADDRESS,
} from "@/utils/constants";
// import { useSDK } from "@metamask/sdk-react";
import { useAuthStore } from "@/stores/useAuthStore";
import contractABI from "@/app/abi.json";
import { SeedSaleSmart } from "@/app/SeedSaleSmart";
import { DepositPopover } from './DepositPopover/DepositPopover'
import { DepositCheckbox } from './DepositCheckbox/DepositCheckbox'

const contractAddress = "0x05beb3e8eef142C659b0e2081f9Cf734636df1C6";
const usdtAddress = "0xdAC17F958D2ee523a2206206994597C13D831ec7";

const DepositForm = () => {
    const { walletAdress } = useAuthStore();

    const [amount, setAmount] = useState<string>("0");
    const [balance, setBalance] = useState<string | null>(null);
    const [displayCurrency, setDisplayCurrency] = useState<"ETH" | "USDT" | "CARD">(
        "USDT"
    );
    const [transactionHash, setTransactionHash] = useState("");
    const [isDepositsEnabled, setIsDepositsEnabled] = useState(false);
    const [open, setOpen] = useState(false);

    const provider = new ethers.BrowserProvider(
        window.ethereum as Eip1193Provider
    );

    const getContract = async () => {
        // if(window.ethereum === undefined) return
        const provider = new ethers.BrowserProvider(window.ethereum as Eip1193Provider);
        const signer = await provider.getSigner();
        return new ethers.Contract(contractAddress, contractABI, signer);
    };

    // const checkDepositsEnabled = async () => {
    //     const contract = await getContract();
    //     const enabled = await contract.isDepositsEnabled();
    //     setIsDepositsEnabled(enabled);
    //   };

    // Проверка, является ли выбранный токен платежным
    // const isTokenAllowed = async () => {
    //     const contract = await getContract();
    //     const tokenAllowed = await contract.isPaymentToken(contractAddress); // Используем функцию isPaymentToken для проверки
    //     return tokenAllowed;
    // };

    // Функция для депозита
    const handleDeposit = async () => {
        const contract = await getContract();
        const usdtAmount = ethers.parseUnits(amount, 6);

        try {
            if (displayCurrency === "USDT") {
                const tx = await contract.deposit(usdtAmount, usdtAddress, {
                    value: 0,
                });
                setTransactionHash(tx.hash);
                await tx.wait();
                alert("Депозит успешно выполнен");
            } else {
                const tx = await contract.deposit(
                    0,
                    0x0000000000000000000000000000000000000000,
                    { value: Number(amount) }
                );
                setTransactionHash(tx.hash);
                await tx.wait();
                alert("Депозит успешно выполнен");
            }

            const updatedBalance = await contract.getUserDeposits(walletAdress);
            setBalance(ethers.formatUnits(updatedBalance, 6));
        } catch (error) {
            console.error("Ошибка депозита:", error);
            alert("Транзакция не удалась");
        }
    };

    const handleMax = (balance: string) => {
        if (balance) setAmount(balance);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;
        let cleanedValue = value
            .replace(/[^0-9.,]/g, "")
            .replace(",", ".")
            .replace(/(\..*)\./g, "$1")
            .replace(/^0+(?=\d)/, "");

        setAmount(cleanedValue === "" ? "0" : cleanedValue);
    };

    const toggleCurrency = () => {
        setDisplayCurrency((prev) => (prev === "ETH" ? "USDT" : "ETH"));
        displayCurrency === "ETH" ? getEthBalance() : getUsdtBalance();
    };

    const getEthBalance = async () => {
        try {
            const balance = await provider.getBalance(walletAdress);
            const balanceInEth = ethers.formatEther(balance);
            setBalance(balanceInEth);
        } catch (error) {
            console.error("Ошибка при получении баланса:", error);
        }
    };

    const getUsdtBalance = async () => {
        try {
            const signer = await provider.getSigner();
            const usdtContract = new ethers.Contract(
                USDT_CONTRACT_ADDRESS,
                ERC20_ABI,
                signer
            );

            const balance = await usdtContract.balanceOf(signer.address);
            const decimals = await usdtContract.decimals();
            const balanceInUsdt = ethers.formatUnits(balance, decimals);
            setBalance(balanceInUsdt);
        } catch (error) {
            console.error("Ошибка при получении баланса USDT:", error);
        }
    };

    useEffect(() => {
        getUsdtBalance();
    }, []);

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
                    <Image src={TetherIcon} alt="USDT" width={24} height={24} />
                    <span>USDT</span>
                </button>
                <button
                    className={`${styles.chooseCurrBtn} ${
                        displayCurrency === "ETH"
                            ? styles.activeChooseCurrBtn
                            : ""
                    }`}
                    onClick={toggleCurrency}
                >
                    <Image src={EtherIcon} alt="ETH" width={24} height={24} />
                    <span>ETH</span>
                </button>
                <DepositPopover open={open} text='Coming Soon' />
                <button
                    onClick={() => setOpen(p => !p)}
                    onBlur={() => setOpen(false)}
                    className={styles.chooseCurrBtn}
                >
                    <Image src={Visa} alt="visa" width={46.5} height={15.28} />
                    <Image src={Mastercard} alt="mastercard" width={36} height={27.78} />
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

            <div className={styles.agreement}>
                <DepositCheckbox children="Automatically buy ANTIX from deposit when Stage 1 starts" />
            </div>

            <div className={styles.questions}>
                <p>Got questions?</p>
                <Link
                    href="https://t.me/antixtoken_bot"
                    target="_blank"
                >
                    We're here to help!
                </Link>
            </div>
        </div>
    );
};

export default DepositForm;
