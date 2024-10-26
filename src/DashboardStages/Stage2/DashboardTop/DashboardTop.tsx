"use client";

import React, { useState } from "react";
import styles from "./DashboardTop.module.scss";
import Image from "next/image";

import TetherIcon from "/public/svg/tether-icon.svg";
import TokenIcon from "/public/svg/token-icon.svg";
import EtherIcon from "/public/svg/ether-icon.svg";

import { Steps } from "@/DashboardStages/Stage1/DashboardBottom/components/Steps/Steps";
import { DashboardPopover } from "@/DashboardStages/Stage1/DashboardBottom/components/Popover/Popover";
import { DashboardList } from "@/DashboardStages/Stage1/DashboardBottom/components/List/List";
import { Timer } from "./Timer/Timer";
import Input from "./Input/Input";
import { firstList, secondList, thirdList } from '@/DashboardStages/Stage1/DashboardBottom/constants/list-values'
import { DashboardCard } from '@/DashboardStages/Stage1/DashboardBottom/components/Card/Card'
import { steps } from "@/DashboardStages/Stage1/DashboardBottom/constants/steps";

const ANTIX_RATE = 0.01;

const DashboardTopStage2 = () => {
    const [payValue, setPayValue] = useState("0");
    const [receiveValue, setReceiveValue] = useState("0");
    const [claimValue, setClaimValue] = useState("");
    const [currency, setCurrency] = useState<"USDT" | "ETH">("USDT");

    const handlePayValueChange = (value: string) => {
        setPayValue(value);
        const updatedReceiveValue = (parseFloat(value) / ANTIX_RATE).toFixed(0);
        setReceiveValue(updatedReceiveValue);
    };

    const handleReceiveValueChange = (value: string) => {
        setReceiveValue(value);
        const updatedPayValue = (parseFloat(value) * ANTIX_RATE).toFixed(2);
        setPayValue(updatedPayValue);
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Dashboard</h2>
            <div className={styles.stepsWrapper}>
                <Steps stages={steps} />
            </div>

            <div className={styles.leftCol}>
                <div className={styles.timer}>
                    <h5 className={styles.timerTitle}>Price increase in:</h5>
                    <Timer targetDate={new Date("2024-12-31T23:59:59")} />
                </div>
                <div className={styles.statisticWrapper}>
                    <DashboardPopover />
                    <div className={styles.statistic}>
                        <DashboardList values={firstList} />
                        <DashboardList values={secondList} />
                        <DashboardList values={thirdList} />
                    </div>
                </div>
                <DashboardCard style={{ width: '100%' }}>
                    <div className={styles.receive}>
                        <Image
                            src={TokenIcon}
                            alt="ANTIX Token"
                            width={40}
                            height={40}
                        />
                        <div className={styles.receiveContainer}>
                            <div className={styles.receiveTitle}>
                                <section className={styles.vested}>
                                    <h2>ANTIX</h2>
                                    <p>Vested</p>
                                </section>
                                <div className={styles.next}>
                                    <p className={styles.unlock}>Next Unlock:</p>
                                    <p>YYYY-MM-DD</p>
                                </div>
                            </div>
                            <p className={styles.claimText}>0</p>
                        </div>
                    </div>
                    <div className={styles.claimContainer}>
                        <div className={styles.claim}>
                            <p>Available for claim:</p>
                            <p>0 ANTIX</p>
                        </div>
                        <button>
                            Claim ANTIX
                        </button>
                    </div>
                </DashboardCard>
            </div>
            <div className={styles.rightCol}>
                <div className={styles.balanceWrapper}>
                    <div className={styles.depositBalance}>
                        <div className={styles.balanceTitle}>
                            Deposit Balance
                        </div>
                        <div className={styles.balance}>
                            <Image
                                src={TetherIcon}
                                alt="Tether"
                                width={40}
                                height={40}
                            />
                            <span>1,900.15 USDT</span>
                        </div>
                    </div>
                    <div className={styles.tokenBalance}>
                        <div className={styles.balanceTitle}>Token Balance</div>
                        <div className={styles.balance}>
                            <Image
                                src={TokenIcon}
                                alt="ANTIX Token"
                                width={40}
                                height={40}
                            />
                            <span>1,900.15 USDT</span>
                        </div>
                    </div>
                </div>
                <div className={styles.chooseCurrWrapper}>
                    <button
                        onClick={() => setCurrency("USDT")}
                        className={`${styles.chooseCurrBtn} ${
                            currency === "USDT"
                                ? styles.activeChooseCurrBtn
                                : ""
                        }`}
                    >
                        <Image
                            src={TetherIcon}
                            alt="USDT"
                            width={24}
                            height={24}
                        />
                        <span>USDT</span>
                    </button>
                    <button
                        className={`${styles.chooseCurrBtn} ${
                            currency === "ETH" ? styles.activeChooseCurrBtn : ""
                        }`}
                        onClick={() => setCurrency("ETH")}
                    >
                        <Image
                            src={EtherIcon}
                            alt="ETH"
                            width={24}
                            height={24}
                        />
                        <span>ETH</span>
                    </button>
                </div>
                <div className={styles.sendingWrapper}>
                    <Input
                        value={payValue}
                        onChangeValue={handlePayValueChange}
                        title="USDT you pay"
                        icon={TetherIcon}
                    />
                    <Input
                        value={receiveValue}
                        onChangeValue={handleReceiveValueChange}
                        title="ANTIX you receive"
                        icon={TokenIcon}
                        price={"$0.010"}
                    />
                    <span className={styles.sendingNetwork}>
                        Network: Ethereum
                    </span>
                </div>
                <button className={styles.depositBtn}>Deposit Now</button>
            </div>
        </div>
    );
};

export default DashboardTopStage2;
