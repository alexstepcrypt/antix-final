"use client";

import styles from "./DepositForm.module.scss";
import React, { useEffect, useState } from "react";
import Image from "next/image";

import TetherIcon from "/public/svg/tether-icon.svg";
import EtherIcon from "/public/svg/ether-icon.svg";
import USDCIcon from "/public/svg/usdc-icon.svg";

import Mastercard from "/public/dashboard/svg/mastercard-logo.svg";
import Visa from "/public/dashboard/svg/visa-logo.svg";
import TokenBalance from '@/components/TokenBalance'

import DepositButton from "./DepositButton";
import { DepositPopover } from "./DepositPopover/DepositPopover";
import { DepositCheckbox } from "./DepositCheckbox/DepositCheckbox";
import { useConnectWallet } from '@/hooks/useConnectWallet'

import CurrencyButton from "../../../components/CurrencyButton/CurrencyButton";
import { TgIcon } from "./icons/TgIcon";


const tokens:any = {
	1: {
        ETH  : '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
		USDT : '0xdAC17F958D2ee523a2206206994597C13D831ec7',
		USDC : '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
	},
	56: {

	}
}
const tokensIcons:any = {
    ETH  : EtherIcon,
    USDT : TetherIcon,
    USDC : USDCIcon
}

interface IDepositForm {
}

const errString =
    "Not enough funds to make the deposit. Please top up your balance.";

const DepositForm: React.FC<IDepositForm> = () => {
    const { chainId } = useConnectWallet();
    const [amount, setAmount] = useState<string>("0");
    const [balance, setMaxBalance] = useState<string | null>(null);
    const [displayCurrency, setDisplayCurrency] = useState<"ETH" | "USDT" | "USDC" | "CARD">("USDT");
    const [openDebit, setOpenDebit] = useState(false);
    const [openETH, setOpenETH] = useState(false);
    const [isBuyChecked, setIsBuyChecked] = useState(true); // условие для чекбокса
    const [error, setError] = useState<string | null>(null);
    const [transactionInProgress, setTransactionInProgress] = useState(false);

    const handleMax = () => { if (balance) setAmount(balance) }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (balance === null || +balance < +amount) setError(errString);

        let value = e.target.value;
        let cleanedValue = value
            .replace(/[^0-9.,]/g, "")
            .replace(",", ".")
            .replace(/(\..*)\./g, "$1")
            .replace(/^0+(?=\d)/, "");

        // Ensure that entered value doesn't exceed balance
        if (Number(cleanedValue) > Number(balance)) {
            setAmount(parseFloat(balance || "0").toFixed(6)); // Reset to max balance if exceeded
        } else {
            setAmount(cleanedValue === "" ? "0" : cleanedValue);
        }
    }

    return <div className={styles.sendingWrapepr}>
        <div className={styles.chooseCurrWrapper}>
            <button
                onClick={()=>setDisplayCurrency('USDT')}
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
                onClick={()=>setDisplayCurrency('USDC')}
                className={`${styles.chooseCurrBtn} ${
                    displayCurrency === "USDC"
                        ? styles.activeChooseCurrBtn
                        : ""
                }`}
            >
                <Image src={USDCIcon} alt="USDC" width={24} height={24} />
                <span>USDC</span>
            </button>

            <span className={styles.divider} />

            <DepositPopover open={openETH} text="Coming Soon" style={{left: "35%"}} />
            <button
                onClick={() => setOpenETH((p) => !p)}
                onBlur={() => setOpenETH(false)}
                className={styles.chooseCurrBtn}
            >
                <Image src={EtherIcon} alt="ETH" width={24} height={24} />
                <span>ETH</span>
            </button>

            <DepositPopover open={openDebit} text="Coming Soon" />
            <button
                onClick={() => setOpenDebit((p) => !p)}
                onBlur={() => setOpenDebit(false)}
                className={styles.chooseCurrBtn}
            >
                <Image src={Visa} alt="visa" width={46.5} height={15.28} />
                <Image
                    src={Mastercard}
                    alt="mastercard"
                    width={36}
                    height={27.78}
                />
            </button>
        </div>

        <div
            style={{ border: error ? "1px solid #BF3434" : "" }}
            className={styles.sending}
        >
            <div className={styles.sendingTop}>
                <span className={styles.sendingTitle}>You send</span>
                <div className={styles.sendingBalance}>
                    <span>
                    <TokenBalance tokenAddress={tokens[chainId][displayCurrency]} onChange={setMaxBalance} />
                    </span>
                    <button onClick={handleMax} className={styles.sendingBalanceBtn}>
                        Max
                    </button>
                </div>
            </div>

            <div className={styles.sendingBottom}>
                <input
                    value={amount}
                    onChange={handleInputChange}
                    className={styles.sendingInput}
                    type="text"
                    placeholder="Enter amount"
                    style={{
                        color:
                            amount === "0"
                                ? "rgba(255, 255, 255, 0.4)"
                                : "#fff",
                    }}
                />
                <CurrencyButton displayCurrency={displayCurrency} icon={tokensIcons[displayCurrency]} />
            </div>
        </div>

        {error && <span className={styles.err}>{error}</span>}


        <DepositButton 
            amount={amount}
            type={isBuyChecked ? 'BUY' : 'DEPOSIT'} 
            tokenAddress={tokens[chainId][displayCurrency]} 
        />

        <div className={styles.agreement}>
            <DepositCheckbox
                isChecked={isBuyChecked}
                onChange={()=>setIsBuyChecked(prev=>!prev)}
                children="Automatically buy ANTIX from deposit when Stage 1 starts"
            />
        </div>

        <div className={styles.questions}>
            <p>Got questions?</p>
            <button
                className={styles.btn}
                onClick={() =>
                    window.open("https://t.me/antixtoken_bot", "_blank")
                }
            >
                {/* <TgIcon /> */}
                We're here to help!
            </button>
        </div>
    </div>
};

export default DepositForm;
