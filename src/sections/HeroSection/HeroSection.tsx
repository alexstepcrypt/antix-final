"use client";

import styles from "./HeroSection.module.scss";
import Image from "next/image";

import Xlogo from "/public/svg/social-x.svg";
import Tglogo from "/public/svg/social-telegram.svg";
import Discordlogo from "/public/svg/social-discord.svg";

import LogoSmall from "/public/svg/logo-small.svg";

// import { LoaderSvg } from "./ui/LoaderSvg/LoaderSvg";
import { HeroTimer } from "./ui/HeroTimer/HeroTimer";

import Awords1 from "/public/svg/team/ico1.svg";
import Awords2 from "/public/svg/team/ico2.svg";
import Awords3 from "/public/svg/team/ico3.svg";
import Awords4 from "/public/svg/team/ico4.svg";
import Awords5 from "/public/svg/team/top10.svg";
import Awords6 from "/public/svg/team/ico5.svg";

import BgHead from "/public/images/hero-timer-bg-head.png";
import { FadeInNew } from "@/components/FadeInNew/FadeInNew";
import Link from "next/link";
import { useState } from "react";
import ReferalModal from "./ui/ReferalModal/ReferalModal";
import useWalletStore from '@/stores/useWalletStore'
import RaisedProgressBar from '@/DashboardStages/Stage1/DashboardTop/RaisedProgressBar/RaisedProgressBar'

const HeroSection = () => {
    const [isRefModal, setIsRefModal] = useState(false);
    const { account } = useWalletStore();

    // DATES FOR CONDITIONS BETWEEN STAGES
    const stage1DateStr = "2024-11-20T13:00:00.000Z";
    const stage1Date = new Date(stage1DateStr);
    const currentDate = new Date();

    return (
        <section className={styles.wrapper} id="Hero">
            <video
                className={styles.backgroundVideo}
                autoPlay
                loop
                muted
                playsInline
            >
                <source
                    src={require("/public/video/hero-video.webm")}
                    type="video/webm"
                />
                Ваш браузер не поддерживает видео.
            </video>
            {isRefModal && (
                <ReferalModal onClose={() => setIsRefModal(false)} />
            )}
            <div
                style={{ alignItems: currentDate >= stage1Date ? 'start' : 'center' }}
                className={styles.container}
            >
                <div className={styles.mobileBg1} />
                <div className={styles.mobileBg2} />
                <div className={styles.leftColumn}>
                    <FadeInNew direction="right" distance="50%">
                        <>
                            <span className={styles.subtitle}>
                                The new era of AI-powered digital humans is here
                            </span>
                            <h1 className={styles.title}>
                                Ready to be
                                <br />
                                <span>Replaced by AI?</span>
                            </h1>
                            <p className={styles.description}>
                                Step into the $300 billion industry with the{" "}
                                <span>ANTIX token</span>. Hyper-realistic
                                digital twins for film, content, and beyond
                            </p>
                        </>
                    </FadeInNew>
                    <div className={styles.actions}>
                        <Link
                            className={styles.socialLink}
                            href="https://x.com/antix_in"
                            target="_blank"
                        >
                            <div className={styles.socialIcon}>
                                <Image src={Xlogo} alt="X" />
                            </div>
                            <span>41K</span>
                        </Link>
                        <Link
                            className={styles.socialLink}
                            href="https://t.me/antix_in"
                            target="_blank"
                        >
                            <div className={styles.socialIcon}>
                                <Image src={Tglogo} alt="Telegram" />
                            </div>
                            <span>56K</span>
                        </Link>
                        <Link
                            className={styles.socialLink}
                            href="https://discord.com/invite/bKcMXChRRT"
                            target="_blank"
                        >
                            <div className={styles.socialIcon}>
                                <Image src={Discordlogo} alt="Discord" />
                            </div>
                            <span>5K</span>
                        </Link>
                    </div>
                    <div className={styles.awords}>
                        <Image
                            onClick={() =>
                                window.open(
                                    "https://antix.in/about-company",
                                    "_blank"
                                )
                            }
                            src={Awords1}
                            alt=""
                        />
                        <Image
                            onClick={() =>
                                window.open(
                                    "https://antix.in/about-company",
                                    "_blank"
                                )
                            }
                            src={Awords2}
                            alt=""
                        />
                        <Image
                            onClick={() =>
                                window.open(
                                    "https://antix.in/about-company",
                                    "_blank"
                                )
                            }
                            src={Awords3}
                            alt=""
                        />
                        <Image
                            onClick={() =>
                                window.open(
                                    "https://antix.in/about-company",
                                    "_blank"
                                )
                            }
                            src={Awords4}
                            alt=""
                        />
                        <Image
                            onClick={() =>
                                window.open(
                                    "https://www.instagram.com/p/CiUgU4cK0YG/",
                                    "_blank"
                                )
                            }
                            src={Awords5}
                            alt=""
                        />
                        <Image
                            onClick={() =>
                                window.open(
                                    "https://skynet.certik.com/projects/antix#fundamental-health",
                                    "_blank"
                                )
                            }
                            src={Awords6}
                            alt=""
                        />
                    </div>
                </div>
                <video
                    className={styles.mobileVideo}
                    autoPlay
                    loop
                    muted
                    playsInline
                >
                    <source
                        src={require("/public/video/hero-video.webm")}
                        type="video/webm"
                    />
                    Ваш браузер не поддерживает видео.
                </video>
                <div className={styles.rightColumn}>
                    <div
                        className={styles.timerHead}
                        style={{ backgroundImage: `url(${BgHead.src})` }}
                    >
                        <div className={styles.timerWrapperTitle}>
                            <Image
                                src={LogoSmall}
                                width={30}
                                height={30}
                                alt="Logo"
                                className={styles.logo}
                            />
                            Token Sale
                        </div>
                    </div>

                    <div className={styles.timer}>
                        <div className={styles.timerTitle}>
                            {currentDate <= stage1Date ? (
                                <section>
                                    <h2 className={styles.timerHeading}>Make Deposit</h2>
                                    <p className={styles.timerDesc}>To secure your access to Stage 1</p>
                                </section>
                            ) : (
                                <h2 className={styles.timerHeading}>Stage 1</h2>
                            )}

                            <div className={styles.discount}>
                                <p>-79%</p>
                            </div>
                        </div>

                        <div className={styles.timerContainer}>
                            <span className={styles.title}>
                                Stage 1 starts in
                            </span>

                            <HeroTimer
                                targetDate={new Date(stage1DateStr)}
                            />
                        </div>
                        {/* <div className={styles.loader}>
                            <LoaderSvg percent={0} />
                        </div> */}

                        <section className={styles.stagePrice}>
                            <h3>Stage 1 price</h3>

                            <div className={styles.prices}>
                                <p>0.030 USDT</p>
                                <p className={styles.prevPrice}>0.14 USDT</p>
                            </div>
                        </section>

                        {currentDate >= stage1Date && (
                            <div className={styles.progress}>
                                <RaisedProgressBar
                                    segments={15}
                                    currentAmount={4201470}
                                    targetAmount={4800000}
                                />
                            </div>
                        )}

                        {currentDate >= stage1Date && ( 
                            <p className={styles.warn}>
                                <span>Access is limited</span>—don’t miss the chance to participate on the best terms
                            </p>
                        )}

                        <Link
                            style={{ marginTop: currentDate <= stage1Date ? 36 : 12 }}
                            className={styles.timerButton}
                            href="/dashboard"
                        >
                            {account ? 'Buy Now' : 'Connect Wallet'}
                        </Link>

                        <span className={styles.suggestion}>
                            and get -79% to TGE Price
                        </span>

                        <div className={styles.pays}>
                            <h3 className={styles.paysTitle}>Pay with</h3>
                            
                            <div className={styles.paysCards}>
                                <div className={styles.paysCard}>
                                    <Image src={'/svg/ether-icon.svg'} alt="ETH" width={24} height={24} />
                                    <span>ETH</span>
                                </div>
                                <div className={styles.paysCard}>
                                    <Image src={'/svg/tether-icon.svg'} alt="ETH" width={24} height={24} />
                                    <span>USDT</span>
                                </div>
                                <div className={styles.paysCard}>
                                    <Image src={'/dashboard/svg/visa-logo.svg'} alt="visa" width={46.5} height={15.28} />
                                    <Image src={'/dashboard/svg/mastercard-logo.svg'} alt="mastercard" width={36} height={27.78} />
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={() => setIsRefModal(true)}
                            className={styles.refBtn}
                        >
                            + Get referral link
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
