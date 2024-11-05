"use client";

import dynamic from 'next/dynamic';
import { useState } from "react";

import styles from "./DashboardTop.module.scss";
import TetherIcon from "/public/svg/tether-icon.svg";
import EtherIcon from "/public/svg/ether-icon.svg";

import { Timer } from "./Timer/Timer";
const DepositForm = dynamic(() => import("./DepositForm/DepositForm"), { ssr: false });
import { Steps } from "@/DashboardStages/components/Steps/Steps";
import { stage1Steps } from "@/DashboardStages/constants/steps";
import { DashboardCard } from "@/DashboardStages/components/Card/Card";
import { BalanceItem } from "./BalanceItem/BalanceItem";
import { faqItems } from "./FaqAccordion/mocdata";
import { FaqAccordion } from "./FaqAccordion/FaqAccordion";
// import RaisedProgressBar from "./RaisedProgressBar/RaisedProgressBar";

const DashboardTop = () => {
    const [openedId, setOpenedId] = useState<number | null>(null);

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
                        Get whitelisted for Stage 1
                    </h5>
                    <p className={styles.infoText}>
                        Make a deposit to gain priority access to the ANTIX
                        token sale with a{" "}
                        <span>70% discount from listing price.</span> Limited
                        availability — act promptly to secure the best
                        conditions.
                    </p>
                </div>
                <DashboardCard style={{ width: "100%" }}>
                    <h3 className={styles.balanceTitle}>Deposit Balance</h3>

                    <div className={styles.balanceItemsWrapper}>
                        <BalanceItem
                            currencySrc={TetherIcon}
                            title="USDT"
                            balance="1,472,231.31"
                        />

                        <BalanceItem
                            currencySrc={EtherIcon}
                            title="ETH"
                            balance="4,344.87"
                        />
                    </div>
                </DashboardCard>

                <div className={styles.faq}>
                    <h5 className={styles.faqTitle}>FAQ</h5>

                    <div className={styles.faqItems}>
                        {faqItems.map((item, i) => (
                            <FaqAccordion
                                key={i}
                                openedId={openedId}
                                setOpenedId={setOpenedId}
                                {...item}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <div className={styles.rightCol}>
                <div className={styles.headTitle}>
                    Stage 1
                    <div className={styles.headTitleRight}>
                        Pre-Sale price: <span>0.025 USD</span>
                        <span className={styles.headTitleDiscount}>
                            -72% to TGE Price
                        </span>
                    </div>
                </div>
                <div className={styles.timer}>
                    <h5 className={styles.timerTitle}>
                        Deposit stage closes in:
                    </h5>
                    <Timer targetDate={new Date("2024-12-31T23:59:59")} />
                </div>

                {/* <RaisedProgressBar
                    currentAmount={4201470}
                    targetAmount={4800000}
                    segments={15}
                /> */}

                <DepositForm />
            </div>
            <div className={styles.mobileFaq}>
                <h5 className={styles.faqTitle}>FAQ</h5>
                <div className={styles.faqItems}>
                    {faqItems.map((item, i) => (
                        <FaqAccordion
                            key={i}
                            openedId={openedId}
                            setOpenedId={setOpenedId}
                            {...item}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DashboardTop;
