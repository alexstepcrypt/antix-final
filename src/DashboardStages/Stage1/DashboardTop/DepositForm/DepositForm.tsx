"use client";

import styles from "./DepositForm.module.scss";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import TetherIcon from "/public/svg/tether-icon.svg";
import EtherIcon from "/public/svg/ether-icon.svg";
import Mastercard from '/public/dashboard/svg/mastercard-logo.svg';
import Visa from '/public/dashboard/svg/visa-logo.svg';
import { ethers } from "ethers";
import {
    CONTRACT_ADDRESS,
    ERC20_ABI,
    USDT_CONTRACT_ADDRESS,
} from "@/utils/constants";
import contractABI from "@/app/abi.json";
import { DepositPopover } from './DepositPopover/DepositPopover';
import { DepositCheckbox } from './DepositCheckbox/DepositCheckbox';
import useWalletStore from "@/stores/useWalletStore";
import CurrencyButton from "@/DashboardStages/components/CurrencyButton/CurrencyButton";
import { TgIcon } from './icons/TgIcon';
import { saveTransaction } from "@/utils/saveTransaction";
import { auth } from "@/utils/auth";

interface IDepositForm {
    loadBalance: () => Promise<void>
}

const errString = 'Not enough funds to make the deposit. Please top up your balance.';

const DepositForm: React.FC<IDepositForm> = ({loadBalance}) => {
    const { account, provider, signer, checkConnection } = useWalletStore();

    const [amount, setAmount] = useState<string>("0");
    const [balance, setBalance] = useState<string | null>(null);
    const [displayCurrency, setDisplayCurrency] = useState<"ETH" | "USDT" | "CARD">("USDT");
    const [open, setOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [transactionHash, setTransactionHash] = useState("");
    const [transactionInProgress, setTransactionInProgress] = useState(false);
    const [isBuyChecked, setIsBuyChecked] = useState(false); // условие для чекбокса
    const [authToken, setAuthToken] = useState<string | null>(null);

    const handleMax = (balance: string) => {
        if (balance) setAmount(balance);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (balance === null || +balance < +amount) setError(errString);

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
    };

    useEffect(() => {
        if (displayCurrency === "ETH") {
            getEthBalance();
        } else {
            getUsdtBalance();
        }
    }, [displayCurrency]);

    const getEthBalance = async () => {
        if (!account || !provider) return;
        try {
            const balance = await provider.getBalance(account);
            const balanceInEth = ethers.formatEther(balance);
            setBalance(balanceInEth);
        } catch (error) {
            console.error("Ошибка при получении баланса:", error);
        }
    };

    const getUsdtBalance = async () => {
        if (!provider || !signer) return;
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

    const initializeBalances = async () => {
        displayCurrency === "ETH" ? await getEthBalance() : await getUsdtBalance();
    };

    useEffect(() => {
        checkConnection();
    }, []);
    
    useEffect(() => {
        initializeBalances();
    }, [provider, signer, balance]);

    const handleCheckboxChange = () => {
        setIsBuyChecked((prev) => !prev);
    };

    const authenticateUser = async () => {
        if (!authToken && account && signer) {
            const token = await auth({wallet: account, signer});
            setAuthToken(token);
        }
    };

    const handleDeposit = async () => {
        if (!amount || transactionInProgress) return;

        try {
            setTransactionInProgress(true);
            
            await authenticateUser();

            if (typeof window.ethereum !== 'undefined') {
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);

                let transaction;
                let tokenAddress = displayCurrency === "USDT" ? USDT_CONTRACT_ADDRESS : "0x0000000000000000000000000000000000000000";

                if (isBuyChecked) {
                    transaction = await contract.buy(tokenAddress, ethers.parseUnits(amount, 6), { gasLimit: 100000 });
                } else {
                    const usdtAmount = ethers.parseUnits(amount, 6);

                    if (displayCurrency === "USDT") {
                        const usdtContract = new ethers.Contract(USDT_CONTRACT_ADDRESS, ERC20_ABI, signer);
                        const allowance = await usdtContract.allowance(signer.address, CONTRACT_ADDRESS);
                        if (allowance < usdtAmount) {
                            const approveTx = await usdtContract.approve(CONTRACT_ADDRESS, usdtAmount);
                            await approveTx.wait();
                        }

                        transaction = await contract.deposit(USDT_CONTRACT_ADDRESS, usdtAmount, { gasLimit: 100000 });
                    } else {
                        const ethAmount = ethers.parseUnits(amount, 18);
                        transaction = await contract.deposit(tokenAddress, ethAmount, { value: ethAmount, gasLimit: 100000 });
                    }
                }

                setTransactionHash(transaction.hash);
                await transaction.wait();
                await loadBalance();
                setAmount('');

                if(authToken)
                // Pass details object and auth token in the request
                await saveTransaction({
                    hash: transaction.hash,
                    stage: "1",
                    chainId: 1,
                    status: "SUCCESS",
                    type: isBuyChecked ? "BUY" : "DEPOSIT",
                    token: tokenAddress, 
                    amount: Number(amount),
                    details: { extraInfo: 'Transaction details here' }, 
                    tokenAuthorization: authToken,
                });
            }
        } catch (error) {
            console.error("Ошибка транзакции:", error);
            alert("Транзакция не удалась");
        } finally {
            setTransactionInProgress(false);
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
            <div
                style={{ border: error ? '1px solid #BF3434' : '' }}
                className={styles.sending}
            >
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
            {error && (
                <span className={styles.err}>
                    {error}
                </span>
            )}
            <button
                className={styles.depositBtn}
                onClick={handleDeposit}
                disabled={error !== null || balance === null || +balance < +amount || transactionInProgress}
            >
                Deposit Now
            </button>

            <div className={styles.agreement}>
                <DepositCheckbox value={isBuyChecked} onChange={handleCheckboxChange} children="Automatically buy ANTIX from deposit when Stage 1 starts" />
            </div>

            <div className={styles.questions}>
                <p>Got questions?</p>
                <button
                    className={styles.btn}
                    onClick={() => window.open("https://t.me/antixtoken_bot", "_blank")}
                >
                    <TgIcon />
                    We're here to help!
                </button>
            </div>
        </div>
    );
};

export default DepositForm;
