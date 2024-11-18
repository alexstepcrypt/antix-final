"use client";

import styles from "./DepositForm.module.scss";
import React, { useEffect, useState } from "react";
import Image from "next/image";

import TetherIcon from "/public/svg/tether-icon.svg";
import BNBIcon from "/public/svg/bnb-icon.svg";
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
import { DepositErrIcon } from './icons/DepositErrIcon'


const tokensByChains:any = {
	1: {
        ETH  : '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
		USDT : '0xdAC17F958D2ee523a2206206994597C13D831ec7',
		USDC : '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
	},
	56: {
        ETH  : '0x0000000000000000000000000000000000000000', // native coin
        // Token USDT (busd) 
		USDT :'0x55d398326f99059fF775485246999027B3197955',
		//  Token USDС 
		USDC :'0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d'
	}
}
const tokensIcons:any = {
    BNB  : BNBIcon,
    USDT : TetherIcon,
    USDC : USDCIcon
}

interface IDepositForm {
}

const errString = "Not enough funds to make the deposit";

const DepositForm: React.FC<IDepositForm> = () => {
    const { chainId } = useConnectWallet();
    const [amount, setAmount] = useState<string>("0");
    const [balance, setMaxBalance] = useState<string | null>(null);
    const [displayCurrency, setDisplayCurrency] = useState<"BNB" | "USDT" | "USDC" | "CARD">("USDT");
    const [openDebit, setOpenDebit] = useState(false);
    const [openBNB, setOpenBNB] = useState(false);
    const [isBuyChecked, setIsBuyChecked] = useState(true); // условие для чекбокса
    const [error, setError] = useState<string | null>(null);

    const tokens = tokensByChains[chainId || 1]

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

            <DepositPopover open={openBNB} text="Coming Soon">
                <button
                    onClick={() => setOpenBNB((p) => !p)}
                    onBlur={() => setOpenBNB(false)}
                    className={styles.chooseCurrBtn}
                    style={{ width: 100 }}
                >
                    <Image src={BNBIcon} alt="BNB" width={24} height={24} />
                    <span>BNB</span>
                </button>
            </DepositPopover>

            <DepositPopover open={openDebit} text="Coming Soon">
                <button
                    onClick={() => setOpenDebit((p) => !p)}
                    onBlur={() => setOpenDebit(false)}
                    className={styles.chooseCurrBtn}
                    style={{ width: 100 }}
                >
                    <Image src={Visa} alt="visa" width={37.7} height={12.73} />
                    <Image
                        src={Mastercard}
                        alt="mastercard"
                        width={29.2}
                        height={22.5}
                    />
                </button>
            </DepositPopover>
        </div>

        <div
            style={{ border: error ? "1px solid #BF3434" : "" }}
            className={styles.sending}
        >
            <div className={styles.sendingTop}>
                <span className={styles.sendingTitle}>You send</span>
                <div className={styles.sendingBalance}>
                    <span>
                    <TokenBalance tokenAddress={tokens[displayCurrency]} onChange={setMaxBalance} />
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

            {error && (
                <div className={styles.errWrapper}>
                    <DepositErrIcon />
                    <span className={styles.err}>{error}</span>
                </div>
            )}
        </div>

        <DepositButton 
            amount={amount}
            type={isBuyChecked ? 'BUY' : 'DEPOSIT'} 
            tokenAddress={tokens[displayCurrency]} 
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
