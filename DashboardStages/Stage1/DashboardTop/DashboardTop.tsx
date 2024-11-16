"use client"

import dynamic from 'next/dynamic';
import { useEffect } from "react";

import styles from "./DashboardTop.module.scss";
import TetherIcon from "/public/svg/tether-icon.svg";
// import EtherIcon from "/public/svg/ether-icon.svg";
import USDCIcon from "/public/svg/usdc-icon.svg";
import vAntixIcon from "/public/dashboard/svg/antix_currency.svg";

import { Timer } from "./Timer/Timer";
const DepositForm = dynamic(() => import("./DepositForm/DepositForm"), { ssr: false });
import { Steps } from "../../components/Steps/Steps";
import { stage1Steps } from "../../constants/steps";
import { DashboardCard } from "../../components/Card/Card";
import { BalanceItem } from "./BalanceItem/BalanceItem";
import { faqItems } from "./FaqAccordion/mocdata";
// import { FaqAccordion } from "./FaqAccordion/FaqAccordion";
import Faq from '@/components/Faq/Faq';
import useStageStore from '@/stores/useStageStore';
import { useUserDepositedBalance } from '@/hooks/useUserDepositedBalance'


const DashboardTop = () => {
    const { balances } = useUserDepositedBalance()
    const { stageData } = useStageStore()

    useEffect(() => {
        if(stageData) console.log(stageData)
    }, [stageData])

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Dashboard</h2>
            <Steps
                style={{ margin: "10px 0 30px 0", width: "100%" }}
                stages={stage1Steps}
            />
            <div className={styles.leftCol}>
                <div className={styles.info}>
                    <h5 className={styles.infoTitle}>
                        Deposit to get whitelisted for Stage 1
                    </h5>
                    <p className={styles.infoText}>
                        Make a deposit to gain priority access to the ANTIX token sale with{" "}
                        <span>-79% to TGE Price.</span>{" "}
                        Limited availability — act promptly to secure the best conditions.
                    </p>
                </div>
                <DashboardCard style={{ width: "100%" }}>
                    <h3 className={styles.balanceTitle}>
                        Deposit to get whitelisted for Stage 1
                    </h3>

                    <div className={styles.balanceItemsWrapper}>
                        <BalanceItem
                            currencySrc={vAntixIcon}
                            title="vANTIX"
                            balance={String(balances.vesting)}
                        />
                        <p className={styles.vested}>
                            <b>Vested Antix (vANTIX)</b> tokens will be converted to ANTIX tokens according to the unlock and vesting schedule.
                        </p>
                    </div>
                </DashboardCard>

                <DashboardCard style={{ width: "100%" }}>
                    <h3 className={styles.balanceTitle}>Deposit Balance</h3>

                    <div className={styles.balanceItemsWrapper}>
                        <BalanceItem
                            currencySrc={TetherIcon}
                            title="USDT"
                            balance={String(balances.usdt)}
                        />

                        <BalanceItem
                            currencySrc={USDCIcon}
                            title="USDC"
                            balance={String(balances.usdc)}
                        />
                    </div>
                </DashboardCard>

                <div className={styles.faq}>
                    <Faq faqItems={faqItems} />
                </div>
            </div>
            <div className={styles.rightCol}>
                <div className={styles.headTitle}>
                    <h2>Get early access</h2>
                    <div className={styles.discount}>
                        <p>-79%</p>
                    </div>
                </div>
                <div className={styles.timer}>
                    <h5 className={styles.timerTitle}>
                        Deposits end in
                    </h5>
                    <Timer targetDate={new Date("2024-11-28T16:00:00.000Z")} />
                </div>

                <div className={styles.stagePrice}>
                    <h5>Deposit Stage Price</h5>
                    <div className={styles.depositPriceWrapper}>
                        <h4>0.03 USD</h4>
                        <h4 className={styles.prevPrice}>0.14 USD</h4>
                        <div className={styles.depositDiscount}>
                            <p>-79% to TGE Price</p>
                        </div>
                    </div>
                </div>

                <DepositForm />
            </div>
            <div className={styles.mobileFaq}>
                <Faq faqItems={faqItems} />
            </div>
        </div>
    );
};

export default DashboardTop;
