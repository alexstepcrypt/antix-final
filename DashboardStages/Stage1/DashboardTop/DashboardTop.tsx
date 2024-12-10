"use client"

import dynamic from 'next/dynamic';

import styles from "./DashboardTop.module.scss";
import TetherIcon from "/public/svg/tether-icon.svg";
import EtherIcon from "/public/svg/ether-icon.svg";
import USDCIcon from "/public/svg/usdc-icon.svg";
import vAntixIcon from "/public/svg/vantix-icon.svg";

import { Timer } from "./Timer/Timer";
const DepositForm = dynamic(() => import("./DepositForm/DepositForm"), { ssr: false });
import { Steps } from "../../components/Steps/Steps";
import { stage1Steps, stage2Steps } from "../../constants/steps";
import { DashboardCard } from "../../components/Card/Card";
import { BalanceItem } from "./BalanceItem/BalanceItem";
import { faqItems } from "./FaqAccordion/mocdata";
// import { FaqAccordion } from "./FaqAccordion/FaqAccordion";
import Faq from '@/components/Faq/Faq';
// import useStageStore from '@/stores/useStageStore';
import { useUserDepositedBalance } from '@/hooks/useUserDepositedBalance'
import Image from 'next/image';
import { useNetwork } from '@/hooks/useNetwork'
import RaisedProgressBar from './RaisedProgressBar/RaisedProgressBar';
import { TgIcon } from '@/components/GotQuestions/icons/TgIcon';
import { useConnectWallet } from '@/hooks/useConnectWallet';
import api from '@/utils/api';
import { useEffect, useState } from 'react';

// DEPOSIT WRAPPER CONTENT AT 19:00
/*
<div className={styles.headTitle}>
                    <h2>Stage 1 is about to start!</h2>
                </div>

                <RaisedProgressBar
                    segments={17}
                    currentAmount={14500000}
                    targetAmount={17000000}
                    color="#12fff1"
                    title="Tokens sold:"
                />

                <div className={styles.timer}>
                    <h5 className={styles.timerTitle}>
                        Stage 1 is coming in
                    </h5>
                    <Timer targetDate={new Date("2024-11-28T16:00:00.000Z")} />
                </div>

                <p className={styles.tg}>
                    Activate{' '}
                    <span onClick={() =>  window.open("https://t.me/antixtoken_bot", "_blank")}>
                        <TgIcon />
                        Telegram bot
                    </span>{' '}
                    to get notified about stage start
                </p>

                <button
                    className={styles.tgBtn}
                    onClick={() => window.open("https://t.me/antixtoken_bot", "_blank")}
                >
                    Notify Me
                </button>
*/

const underDepositInfo = [
    {
        title: "Listing price",
        value: "0.14 USD",
    },
    {
        title: "Initial unlock",
        value: "7%",
    },    {
        title: "LockUp period",
        value: "6 months",
    },
    {
        title: "Vesting period",
        value: "14 months",
    },
    {
        title: "Claim interval",
        value: "1 month",
    }
]

type TokensSolded = {
    current: number;
    target: number;
}

const DashboardTop = () => {
    const { profile } = useConnectWallet()
    const { balances } = useUserDepositedBalance();
    const { network } = useNetwork();

    const bonus = !!profile?.referrer ? balances.vesting * 0.05 : 0;
    const refBonus = bonus
        ? `+${bonus.toLocaleString('en-US')} ANTIX Referral Bonus`
        : "";
    
    // const { stageData } = useStageStore();
    // useEffect(() => {
    //     if(stageData) console.log(stageData)
    // }, [stageData])

    const [tokens, setTokens] = useState<TokensSolded>({ current: 0, target: 0 });

    useEffect(() => { api.receiveTokens().then(r => r && setTokens(r)) }, []);

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Dashboard</h2>
            <Steps
                style={{ margin: "10px 0 30px 0", width: "100%" }}
                stages={stage1Steps}
                // 19:15
                // stages={stage2Steps}
            />
            <div className={styles.leftCol}>
                <div className={styles.info}>
                    <h5 className={styles.infoTitle}>
                        Deposit to get whitelisted for Stage 3
                    </h5>
                    <p className={styles.infoText}>
                        Make a deposit to gain priority access to the ANTIX token sale with{" "}
                        <span>-64% to TGE Price.</span>{" "}
                        Limited availability — act promptly to secure the best conditions.
                    </p>
                </div>
                <DashboardCard style={{ width: "100%" }}>
                    <h3 className={styles.balanceTitle}>
                        Tokens to be received
                    </h3>

                    <div className={styles.balanceItemsWrapper}>
                        <BalanceItem
                            currencySrc={vAntixIcon}
                            title="vANTIX"
                            balance={String(balances.vesting)}
                            bottomText={refBonus}
                        />
                        <p className={styles.vested}>
                            <b>Vested Antix (vANTIX)</b> tokens will be converted to ANTIX tokens according to the unlock and vesting schedule.
                        </p>
                    </div>
                </DashboardCard>

                {Number(balances.usdc) === 0 || Number(balances.usdt) !== 0 ? (
                    <DashboardCard style={{ width: "100%" }}>
                        <div className={styles.balanceTitleWrapper}>
                            <h3 className={styles.balanceTitle}>Deposit Balance</h3>
                            <span className={styles.balanceChain}>
                                <Image
                                    src={network.icon}
                                    alt={network.value}
                                    width={24}
                                    height={24}
                                />
                                {network.value}
                            </span>
                        </div>

                        <div className={styles.balanceItemsWrapper}>
                            <BalanceItem
                                currencySrc={TetherIcon}
                                title="USDT"
                                balance={String(balances.usdt || 0)}
                            />

                            <BalanceItem
                                currencySrc={USDCIcon}
                                title="USDC"
                                balance={String(balances.usdc || 0)}
                            />

                            <BalanceItem
                                currencySrc={network.icon}
                                title={network.value}
                                balance={"0.00"}
                            />
                        </div>
                    </DashboardCard>
                ) : null}


                <div className={styles.faq}>
                    <Faq faqItems={faqItems} />
                </div>
            </div>
            <div className={styles.rightCol}>
                <div className={styles.depositWrapper}>

                {/* final content (19:15 and 20:00) */}
                <div className={styles.headTitle}>
                    {/* <h2>Get early access to Stage 2</h2> */}

                    <h2>Stage 3</h2>
                    <div className={styles.discount}>
                        <p>-64% to TGE Price</p>
                    </div>
                </div>


                <div className={styles.timer}>
                    <h5 className={styles.timerTitle}>
                        Stage 3 ends in
                    </h5>
                    <Timer targetDate={new Date("2024-12-22T17:00:00Z")} />
                </div> 

                {/* <div className={styles.stagePrice}>
                    <h5>Current Price</h5>
                    <div className={styles.depositPriceWrapper}>
                        <h4>0.04 USD</h4>
                        <h4 className={styles.prevPrice}>0.14 USD</h4>
                        <div className={styles.depositDiscount}>
                            <p>-71% to TGE Price</p>
                        </div>
                    </div>
                </div> */}

                <div className={styles.stagePrice}>
                    <div className={styles.stage1Sold}>
                        <h5>Current Price</h5>
                        <h4>0.05 USD</h4>
                    </div>
                    <div className={styles.depositPriceWrapper}>
                        <h4>Listing(TGE) Price</h4>
                        <h4 className={styles.prevPrice}>0.14 USD</h4>
                    </div>
                </div>
                <RaisedProgressBar
                    segments={20}
                    currentAmount={tokens.current}
                    targetAmount={tokens.target}
                    color="#12fff1"
                    title="USDT Collected:"
                />

                {/* STAGE 1*/}
                {/* <div className={styles.stagePrice}>
                    <div className={styles.stage1Sold}>
                        <h5>Current Price</h5>
                        <h4>0.03 USD</h4>
                    </div>
                    <div className={styles.depositPriceWrapper}>
                        <h4>Listing(TGE) Price</h4>
                        <h4 className={styles.prevPrice}>0.14 USD</h4>
                    </div>
                </div> */}

                {/* <p className={styles.tg}>
                    Activate{' '}
                    <span onClick={() =>  window.open("https://t.me/antixtoken_bot", "_blank")}>
                        <TgIcon />
                        Telegram bot
                    </span>{' '}
                    to get notified about stage start
                </p> */}

                <DepositForm />
                </div>
                <div className={styles.underDeposit}>
                    {underDepositInfo.map((item, index) => (
                        <div key={index} className={styles.underDepositItem}>
                            {item.title}
                            <span>{item.value}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.mobileFaq}>
                <Faq faqItems={faqItems} />
            </div>
        </div>
    );
};

export default DashboardTop;
