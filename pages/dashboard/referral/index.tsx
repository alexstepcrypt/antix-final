"use client";

import dynamic from 'next/dynamic';
import ConnectWallet from "@/components/ConnectModals/ConnectWallet/ConnectWallet";
import Header from "@/sections/Header/Header";
import Bg from "/public/images/dashboard-bg.png";
import dashboardStyles from "../dashboard.module.scss";
import ClaimStatusModal from './ClaimModal'


import { useEffect, useState } from "react";
import styles from "./page.module.scss";
import Image from "next/image";

import CopyIcon from "/public/svg/copy-icon.svg";
import TetherIcon from "/public/svg/tether-icon.svg";
import ETHIcon from "/public/svg/ether-icon.svg";
import USDCIcon from "/public/svg/usdc-icon.svg";
import BNBIcon from "/public/svg/bnb-icon.svg";
import UsdtBnbIcon from "/public/dashboard/svg/usdt-bnb-icon.svg";
import vAntixIcon from "/public/svg/vantix-icon.svg";
import ReffIcon from "/public/dashboard/svg/refferals-icon.png";

// import WalletIcon from "/public/svg/white-wallet-icon.svg";
import Faq from "@/components/Faq/Faq";
import { useConnectWallet } from '@/hooks/useConnectWallet'
import { useClaimReward } from '@/hooks/useClaimReward'
import { formatAddress, formatFiat } from "@/utils/utils";
import CurrencyButton from "@/DashboardStages/components/CurrencyButton/CurrencyButton";
import Api from '@/utils/api'
import { BalanceItem } from '@/DashboardStages/Stage1/DashboardTop/BalanceItem/BalanceItem';
import { useUserDepositedBalance } from '@/hooks/useUserDepositedBalance';
import Earnings from '@/components/Earnings/Earnings';
import RefHistory from '@/components/RefHistory/RefHistory';
const Footer = dynamic(() => import("@/sections/Footer/Footer"), { ssr: false });


const referralFaq = [
    {
        id: 1,
        title: "How do I get bonuses for purchases made through a referral link?",
        content: "To get bonuses, a user must click on your referral link and connect their wallet for the first time. If a user has already connected their wallet using a regular link, they will not be able to receive bonuses if they make a purchase through a referral link."
    },
    {
        id: 2,
        title: "What happens if I've already connected my wallet using a regular link and then click on a referral link?",
        content: "If you've already connected your wallet using a regular link, you will not be able to receive bonuses if you make a purchase through a referral link. To get bonuses, you must connect your wallet using a referral link for the first time."
    },
    {
        id: 3,
        title: "Who receives bonuses if I signed up through someone else's link?",
        content: "If you signed up through someone else's link, bonuses for all purchases will go to the creator of that link."
    },
    {
        id: 4,
        title: "Can I reconnect my wallet using a referral link if I've already connected it using a regular link?",
        content: "No, wallets that were previously connected using a referral link cannot be referred by someone else, even if they are reconnected using a referral link."
    }
];

const Referral = () => {
    const [isGenerated, setIsGenerated] = useState(false);
    const [isCopied, setIsCopied] = useState(false);
    const [refCode, setRefCode] = useState("YOURCODE");
    const { profile, chainId } = useConnectWallet();

    const { claimTxHash, status: claimStatus, claimError, makeClaim } = useClaimReward()
    function claimReward(){
        makeClaim()
    }
    useEffect(()=>{
        if (claimStatus === 'success') {
            window.location.reload()
        }
    },[claimStatus])

    const handleGenerateReferralLink = async () => {
        const refcode = await Api.getUserRefcode()
        setRefCode(refcode);
        setIsGenerated(true);
    };
    useEffect(()=>{
        // @ts-ignore
        if (!profile?.refcode) return
        // @ts-ignore
        setRefCode(profile.refcode);
        setIsGenerated(true);
    },[profile])

    const handleCopy = () => {
        const link = process.env.REFERRAL_LINK + refCode
        if (navigator.clipboard) {
            navigator.clipboard
                .writeText(link)
                .then(() => {
                    setIsCopied(true);
                    setTimeout(() => setIsCopied(false), 2000);
                })
                .catch((err) => {
                    console.error("Ошибка при копировании:", err);
                });
        } else {
            const textArea = document.createElement("textarea");
            textArea.value = link
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand("copy");
            document.body.removeChild(textArea);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        }
    };


    const [refStats, setRefStats] = useState<any>({})
    useEffect(()=>{
        if (!chainId) return
        let fetchReferralsTimeout:any = setTimeout(()=>{
            Api.getUserReferrals().then(res=>{
                setRefStats(res)
            })
        }, 333)
        return () => clearTimeout(fetchReferralsTimeout)
    }, [profile, chainId])


    return <>
        <main
            className={dashboardStyles.page}
            style={{ backgroundImage: `url(${Bg.src})` }}
        >
        <Header isDashboard />
        <ConnectWallet />

        <section className={styles.container}>
            <div className={styles.titleWrapper}>
                <h1 className={styles.title}>Referral</h1>
                {isGenerated ? (
                    <span>Active</span>
                ) : (
                    <span className={styles.inactive}>Inactive</span>
                )}
            </div>

            <div className={styles.wrapper}>
                <div className={styles.leftCol}>
                    <div className={styles.topInfo}>
                        <h3>Thank уоu for choosing to promote Antix!</h3>
                        <p>
                            Earn up to 10% USDT (BNB Chain) rewards via your referral link!<br />
                            Payouts start after Stage 2 ends.
                        </p>
                    </div>
                    <div
                        className={`${styles.infoWrapper} ${styles.codeWrapper}`}
                    >
                        <h4>Invite Your Friend and Earn Rewards</h4>
                        <div className={styles.codeContainer}>
                            <input
                                value={process.env.REFERRAL_LINK + refCode}
                                readOnly
                                className={`${styles.code} ${
                                    isGenerated ? styles.genCode : ""
                                }`}
                            />
                            {!isGenerated ? (
                                <button
                                    className={styles.codeBtn}
                                    onClick={handleGenerateReferralLink}
                                >
                                    Generate Code
                                </button>
                            ) : (
                                <button
                                    className={styles.codeBtnGenerated}
                                    onClick={handleCopy}
                                >
                                    <Image
                                        src={CopyIcon}
                                        alt="Copy"
                                        width={24}
                                        height={24}
                                    />
                                    {isCopied ? "Copied" : "Copy Link"}
                                </button>
                            )}
                        </div>
                    </div>
                    <div className={styles.infoWrapper} >
                        <div className={styles.availableEarnings}>
                            <div className={styles.availableEarningsTitle}>
                                <h4>Your available earnings</h4>
                                <span>Stage 1</span>
                            </div>
                            <Earnings
                                icon={UsdtBnbIcon}
                                amount={refStats?.reward?.amount || 0}
                            />
                        </div>
                        <button onClick={claimReward} className={styles.availableEarningsButton} disabled={claimStatus==='pending' || Number(refStats?.reward?.amount || 0) === 0}>
                            {claimStatus === 'pending' ? 'Confirm TX...' : 'Claim Referral Earnings'}
                        </button>

                        {!!Number(refStats?.reward?.claimed) && <><br />
                        <div className={styles.availableEarnings}>
                            <div className={styles.availableEarningsTitle}>
                                <h4>Total claimed</h4>
                            </div>
                            <Earnings
                                icon={UsdtBnbIcon}
                                amount={refStats?.reward?.claimed || 0}
                            />
                        </div></>}
                    </div>
                    <div className={styles.faq}>
                        <Faq faqItems={referralFaq} />
                    </div>
                </div>
                <div className={styles.rightCol}>
                    <div className={styles.infoWrapper}>
                        <div className={styles.topWrapper}>
                            <div className={styles.rightColTitle}>
                                <h4>Your Referral Earnings</h4>
                                <span>Deposit / Stage 3</span>
                            </div>
                            <Earnings icon={UsdtBnbIcon} amount={formatFiat(refStats?.stage?.["2"]?.reward)}/>
                        </div>

                        <div className={styles.refInfo}>
                            <div className={styles.refInfoItem}>
                                <div className={styles.refInfoCard}>
                                    <div className={styles.refInfoCardTop}>
                                        <Image
                                            src={ReffIcon}
                                            alt="Referrals"
                                            width={24}
                                            height={24}
                                        />
                                        Referrals
                                    </div>
                                    <span>{refStats?.count}</span>
                                </div>
                                <p>Users who connected their crypto wallet via your link.</p>
                            </div>
                            <div className={styles.refInfoItem}>
                            <div className={styles.refInfoCard}>
                                    <div className={styles.refInfoCardTop}>
                                        <Image
                                            src={vAntixIcon}
                                            alt="vANTIX"
                                            width={24}
                                            height={24}
                                        />
                                        vANTIX
                                    </div>
                                    <span>{formatFiat(refStats?.stage?.["1"]?.antix)}</span>
                                </div>
                                <p>Vested Antix tokens purchased using your referral link.</p>
                            </div>
                        </div>

                        <button className={styles.claimBtn}>
                            Claim Referral Earnings
                        </button>

                        <div className={styles.disclaimer}>
                            Rewards will be available after the current stage is finished. The next payout will happen once Stage 2 ends.
                        </div>

                        <div className={styles.balancesWrapper}>
                            <BalanceItem
                                currencySrc={TetherIcon}
                                title={'USDT'}
                                balance={formatFiat(refStats?.stage?.["1"]?.usdt)}
                            />
                            <BalanceItem
                                currencySrc={USDCIcon}
                                title={'USDC'}
                                balance={formatFiat(refStats?.stage?.["1"]?.usdc)}
                            />
                            <BalanceItem
                                currencySrc={ETHIcon}
                                title={'ETH'}
                                balance={formatFiat(refStats?.stage?.["1"]?.eth)}
                            />
                            <BalanceItem
                                currencySrc={BNBIcon}
                                title={'BNB'}
                                balance={formatFiat(refStats?.stage?.["1"]?.bnb)}
                            />
                        </div>
                    </div>
                          
                    <div className={styles.mobileFaq}>
                        <Faq faqItems={referralFaq} />
                    </div>
                </div>
            </div>

            {/* <div className={styles.historyWrapper}>
                <h3 className={styles.historyTitle}>History</h3>
                <RefHistory />
                <div className={styles.historyContainer}>
                </div>
            </div> */}
        </section>
        <Footer style={{
            margin: '100px 16px 16px',
            borderRadius: 16,
            overflow: 'hidden'
        }}/>
    </main>

    <ClaimStatusModal txHash={String(claimTxHash)} status={claimStatus} retryFn={claimReward} />

    </>
};

export default Referral;
