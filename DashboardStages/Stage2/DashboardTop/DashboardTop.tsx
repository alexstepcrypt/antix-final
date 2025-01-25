"use client";

import React, { useState } from "react";
import styles from "./DashboardTop.module.scss";
import Image from "next/image";

import TetherIcon from "/public/svg/tether-icon.svg";
import TokenIcon from "/public/svg/token-icon.svg";
import EtherIcon from "/public/svg/ether-icon.svg";

import { Steps } from "../../components/Steps/Steps";
import { DashboardPopover } from "../../components/Popover/Popover";
import { DashboardList } from "../../components/List/List";
import { Timer } from "./Timer/Timer";
import Input from "./Input/Input";
import { firstList, popoverList, secondList, thirdList } from '../../constants/list-values';
import { DashboardCard } from '../../components/Card/Card'
import { stage2Steps } from "../../constants/steps";

const ANTIX_RATE = 0.08;

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
                <Steps stages={stage2Steps} />
            </div>

            <div className={styles.leftCol}>
                <div className={styles.timer}>
                    <h5 className={styles.timerTitle}>Price increase in:</h5>
                    <Timer targetDate={new Date("2024-11-28T16:00:00.000Z")} />
                </div>
                <div className={styles.statisticWrapper}>
                    <DashboardPopover
                        list={popoverList}
                        customRender={(item, i) => (
                            <li
                                style={{ display: 'flex', gap: 4 }}
                                key={i}
                            >
                                <p>{item.title}</p>
                                {item.subtitle !== '' && (
                                    <span>{item.subtitle}</span>
                                )}
                            </li>
                        )}
                    />
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
                        price={"$0.08"}
                        style={{
                            background: 'unset',
                            border: '1px solid rgba(255, 255, 255, .1)',
                        }}
                    />
                </div>
                <button className={styles.depositBtn}>Deposit Now</button>
            </div>
        </div>
    );
};

export default DashboardTopStage2;
