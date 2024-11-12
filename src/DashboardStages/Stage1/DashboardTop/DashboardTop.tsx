"use client";

import dynamic from 'next/dynamic';
import { useEffect, useState } from "react";

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
import Faq from '@/components/Faq/Faq';
import useStageStore from '@/stores/useStageStore';
import { ethers } from 'ethers';
// import RaisedProgressBar from "./RaisedProgressBar/RaisedProgressBar";

import contractABI from "@/app/abi.json";
import { CONTRACT_ADDRESS } from '@/utils/constants';
// const contractAddress = "0x05beb3e8eef142C659b0e2081f9Cf734636df1C6";

const DashboardTop = () => {
    const [depositBalance, setDepositBalance] = useState("0");
    const { stageData} = useStageStore()

    useEffect(() => {
        if(stageData) console.log(stageData)
    }, [stageData])


    useEffect(() => {
        // Load initial balance when component mounts
        loadBalance();
    }, []);

    const loadBalance = async () => {
        try {
            if (typeof window.ethereum !== 'undefined') {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);

                const balance = await contract.getDepositBalance(signer.getAddress());
                setDepositBalance(ethers.formatUnits(balance, 6)); 
            }
        } catch (error) {
            console.error("Error loading balance:", error);
        }
    };

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
                    <h3 className={styles.balanceTitle}>Deposit Balance</h3>

                    <div className={styles.balanceItemsWrapper}>
                        <BalanceItem
                            currencySrc={TetherIcon}
                            title="USDT"
                            balance={depositBalance}
                        />

                        <BalanceItem
                            currencySrc={EtherIcon}
                            title="ETH"
                            balance="0"
                        />
                    </div>
                </DashboardCard>

                <div className={styles.faq}>
                    <Faq faqItems={faqItems} />
                </div>
            </div>
            <div className={styles.rightCol}>
                <div className={styles.headTitle}>
                    <h2>Add Deposit</h2>
                    <div className={styles.discount}>
                        <p>-79%</p>
                    </div>
                </div>
                <div className={styles.timer}>
                    <h5 className={styles.timerTitle}>
                        Stage 1 starts in
                    </h5>
                    <Timer targetDate={new Date("2024-12-31T23:59:59")} />
                </div>

                <div className={styles.stagePrice}>
                    <h5>Deposit Stage Price</h5>
                    <div className={styles.depositPriceWrapper}>
                        <h4>0.030 USD</h4>
                        <h4 className={styles.prevPrice}>0.14 USD</h4>
                        <div className={styles.depositDiscount}>
                            <p>-79% to TGE Price</p>
                        </div>
                    </div>
                </div>

                <DepositForm loadBalance={loadBalance}/>
            </div>
            <div className={styles.mobileFaq}>
                <Faq faqItems={faqItems} />
            </div>
        </div>
    );
};

export default DashboardTop;
