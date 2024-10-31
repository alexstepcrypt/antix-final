import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useSDK } from "@metamask/sdk-react";
import { ERC20_ABI, USDT_CONTRACT_ADDRESS } from "@/utils/constants";

export const useDeposit = () => {
    const { account } = useSDK();
    const [amount, setAmount] = useState<string>("0");
    const [balance, setBalance] = useState<string | null>(null);
    const [displayCurrency, setDisplayCurrency] = useState<"ETH" | "USDT">(
        "USDT"
    );

    const toggleCurrency = () => {
        setDisplayCurrency((prev) => (prev === "ETH" ? "USDT" : "ETH"));
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

    const handleMax = (balance: string) => {
        if (balance) setAmount(balance);
    };

    const getEthBalance = async (accountAddress: string) => {
        if (typeof window.ethereum === "undefined") return;

        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const balance = await provider.getBalance(accountAddress);
            const balanceInEth = ethers.formatEther(balance);
            setBalance(balanceInEth);
        } catch (error) {
            console.error("Ошибка при получении баланса:", error);
        }
    };

    const getUsdtBalance = async () => {
        if (window.ethereum) {
            try {
                const provider = new ethers.BrowserProvider(window.ethereum);
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
        }
    };

    useEffect(() => {
        if (account) {
            displayCurrency === "ETH"
                ? getEthBalance(account)
                : getUsdtBalance();
        }
    }, [account, displayCurrency]);

    return {
        amount,
        setAmount,
        balance,
        displayCurrency,
        toggleCurrency,
        handleInputChange,
        handleMax,
        getEthBalance,
        getUsdtBalance,
    };
};
