import React, { useEffect } from "react";
import styles from "./ChooseWallet.module.scss";
import Image from "next/image";
import MataMaskIcon from "/public/dashboard/svg/meta-mask.svg";
import WalletConnectIcon from "/public/dashboard/svg/wallet-connect.svg";
import TrustWalletIcon from "/public/dashboard/svg/trust-wallet.svg";
import CoinbaseWalletIcon from "/public/dashboard/svg/coinbase-wallet.svg";
import { useSDK } from "@metamask/sdk-react";
import { useAuthStore } from "@/stores/useAuthStore";
import { ethers } from "ethers";

interface IChooseWallet {
    onClose: () => void;
}

const ChooseWallet: React.FC<IChooseWallet> = ({ onClose }) => {
    const { sdk, account } = useSDK();
    const { setWalletAdress, setIsConnected, isConnected } = useAuthStore();

    const connectMetamask = async () => {
        try {
            await sdk?.connect();
        } catch (err) {
            console.warn(`No accounts found`, err);
        }
    };

    useEffect(() => {
        if (account) {
            setIsConnected(true);
            setWalletAdress(account);
        }
    }, [account]);


    const connectTrustWallet = async () => {
        if (window.ethereum) {
            try {
                const provider = new ethers.BrowserProvider(window.ethereum);
                await provider.send("eth_requestAccounts", []);
                const signer = await provider.getSigner();
                const address = await signer.getAddress();
                setWalletAdress(address);
                setIsConnected(true);
            } catch (error) {
                console.error("Ошибка подключения к TrustWallet:", error);
            }
        } else {
            alert("Установите TrustWallet!");
        }
    };

    useEffect(() => {
        if (account) {
            setWalletAdress(account);
            setIsConnected(true);
        }
    }, [])

    return (
        <>
            <div className={styles.bg} onClick={onClose} />
            <div className={styles.modal}>
                <p className={styles.modalTitle}>Connect Your Wallet</p>
                <div className={styles.modalBtns}>
                    <button
                        className={styles.modalBtn}
                        onClick={connectMetamask}
                    >
                        <Image
                            src={MataMaskIcon}
                            alt={"MetaMask"}
                            width={24}
                            height={24}
                        />
                        <p>MetaMask</p>
                        <span>Popular</span>
                    </button>
                    <a
                        href="https://walletconnect.ru/"
                        target="_blank"
                        className={styles.modalBtn}
                    >
                        <Image
                            src={WalletConnectIcon}
                            alt={"WalletConnect"}
                            width={24}
                            height={24}
                        />
                        <p>WalletConnect</p>
                    </a>
                    <button
                        onClick={connectTrustWallet}
                        className={styles.modalBtn}
                    >
                        <Image
                            src={TrustWalletIcon}
                            alt={"Trust Wallet"}
                            width={24}
                            height={24}
                        />
                        <p>Trust Wallet</p>
                    </button>
                    <a
                        href="https://www.coinbase.com/"
                        target="_blank"
                        className={styles.modalBtn}
                    >
                        <Image
                            src={CoinbaseWalletIcon}
                            alt={"Coinbase Wallet"}
                            width={24}
                            height={24}
                        />
                        <p>Coinbase Wallet</p>
                    </a>
                </div>
            </div>
        </>
    );
};

export default ChooseWallet;
