"use client";

import styles from "./DepositForm.module.scss";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from 'next/link';
import TetherIcon from "/public/svg/tether-icon.svg";
import EtherIcon from "/public/svg/ether-icon.svg";
import Mastercard from '/public/dashboard/svg/mastercard-logo.svg';
import Visa from '/public/dashboard/svg/visa-logo.svg';
import { ethers } from "ethers";
import {
    ERC20_ABI,
    USDT_CONTRACT_ADDRESS,
} from "@/utils/constants";
import contractABI from "@/app/abi.json";
import { DepositPopover } from './DepositPopover/DepositPopover'
import { DepositCheckbox } from './DepositCheckbox/DepositCheckbox'
import useWalletStore from "@/stores/useWalletStore";
import CurrencyButton from "@/DashboardStages/components/CurrencyButton/CurrencyButton";

const contractAddress = "0x05beb3e8eef142C659b0e2081f9Cf734636df1C6";
const usdtAddress = "0xdAC17F958D2ee523a2206206994597C13D831ec7";

const DepositForm = () => {
    const { account, provider, signer } = useWalletStore();

    const [amount, setAmount] = useState<string>("0");
    const [balance, setBalance] = useState<string | null>(null);
    const [displayCurrency, setDisplayCurrency] = useState<"ETH" | "USDT" | "CARD">(
        "USDT"
    );
    // const [transactionHash, setTransactionHash] = useState("");
    // const [isDepositsEnabled, setIsDepositsEnabled] = useState(false);
    const [open, setOpen] = useState(false);


    const getContract = async () => {
        if(!provider) return
        return new ethers.Contract(contractAddress, contractABI, signer);
    };

    // Функция для депозита
    const handleDeposit = async () => {
        if(!provider || !signer) return

        const contract = await getContract();
        const usdtContract = new ethers.Contract(
            USDT_CONTRACT_ADDRESS,
            ERC20_ABI,
            signer
        );

        const usdtAmount = ethers.parseUnits(amount, 6);

        try {
            if (displayCurrency === "USDT") {
                if (await usdtContract.allowance(signer.address, contractAddress) < usdtAmount){
                    const  txu = await usdtContract.approve(contractAddress, usdtAmount);
                    await txu.wait();
                }
                const tx = await contract?.deposit(usdtAddress, usdtAmount, {
                    value: 0,
                });
                // setTransactionHash(tx.hash);
                await tx.wait();
                alert("Депозит успешно выполнен");
            } else {
                const ethAmount = ethers.parseUnits(amount, 18);
                const tx = await contract?.deposit(
                    "0x0000000000000000000000000000000000000000",
                    ethAmount,
                    { value: Number(ethAmount) }
                );
                // setTransactionHash(tx.hash);
                await tx.wait();
                alert("Депозит успешно выполнен");
            }

            const updatedBalance = await contract?.getUserDeposits(account);
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
        if(!account || !provider) return
        try {
            const balance = await provider.getBalance(account);
            const balanceInEth = ethers.formatEther(balance);
            setBalance(balanceInEth);
        } catch (error) {
            console.error("Ошибка при получении баланса:", error);
        }
    };

    const getUsdtBalance = async () => {
        if(!provider || !signer) return

        try {
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
        getContract();
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
                    {displayCurrency === "USDT" ? (
                        <CurrencyButton
                            displayCurrency="USDT"
                            icon={TetherIcon}
                            onclick={toggleCurrency}
                        />
                    ) : (
                        <CurrencyButton
                            displayCurrency="ETH"
                            icon={EtherIcon}
                            onclick={toggleCurrency}
                        />
                    )}
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
