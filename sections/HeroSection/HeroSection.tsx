"use client";

import styles from "./HeroSection.module.scss";
import Image from "next/image";

import Xlogo from "/public/svg/social-x.svg";
import Tglogo from "/public/svg/social-telegram.svg";
import Discordlogo from "/public/svg/social-discord.svg";

import Awords1 from "/public/svg/team/ico1.svg";
import Awords2 from "/public/svg/team/ico2.svg";
import Awords3 from "/public/svg/team/ico3.svg";
import Awords4 from "/public/svg/team/ico4.svg";
import Awords5 from "/public/svg/team/top10.svg";
import Awords6 from "/public/svg/team/ico5.svg";

// import BgHead from "/public/images/hero-timer-bg-head.png";
import { FadeInNew } from "@/components/FadeInNew/FadeInNew";
import Link from "next/link";
import { useState } from "react";
import ReferalModal from "./ui/ReferalModal/ReferalModal";
import TokenSaleDeposit from "@/components/TokenSaleForm/TokenSaleDeposit/TokenSaleDeposit";
import TokenSaleDeposit2 from "@/components/TokenSaleForm/TokenSaleDeposit2/TokenSaleDeposit2";
import { useTranslation } from "react-i18next";
import { sendSocialGAEvent } from "@/utils/utils";
// import TokenSaleStage1AS from "@/components/TokenSaleForm/TokenSaleStage1AS/TokenSaleStage1AS";
// import TokenSaleStage1 from "@/components/TokenSaleForm/TokenSaleStage1/TokenSaleStage1";
// import TokenSaleStage1SO from "@/components/TokenSaleForm/TokenSaleStage1SO/TokenSaleStage1SO";
// import RaisedProgressBar from '@/DashboardStages/Stage1/DashboardTop/RaisedProgressBar/RaisedProgressBar'

const HeroSection = () => {
    const [isRefModal, setIsRefModal] = useState(false);
    // const { account } = useConnectWallet();

    // DATES FOR CONDITIONS BETWEEN STAGES
    const stage1DateStr = "2024-11-28T17:00:00Z";
    const stage1Date = new Date(stage1DateStr);
    const currentDate = new Date();
    const stage2DateStr = "2024-12-17T17:00:00Z";
    const stage3DateStr = "2024-12-22T17:00:00Z";
    const stage4DateStr = "2025-01-11T17:00:00Z";
    const { t } = useTranslation('landing');

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
                                {t('heroSection.subtitle')}
                            </span>
                            <h1 className={styles.title}>
                                {t('heroSection.title.line1')}
                                <br />
                                <span>{t('heroSection.title.line2')}</span>
                            </h1>
                            <p className={styles.description}>
                                {t('heroSection.description.text1')}{" "}
                                <span>{t('heroSection.description.span')}</span>{" "}
                                {t('heroSection.description.text2')}
                            </p>
                        </>
                    </FadeInNew>
                    <div className={styles.actions}>
                        <Link
                            onClick={()=>sendSocialGAEvent('x')}
                            className={styles.socialLink}
                            href="https://x.com/antix_in"
                            target="_blank"
                        >
                            <div className={styles.socialIcon}>
                                <Image src={Xlogo} alt="X" />
                            </div>
                            <span>44K</span>
                        </Link>
                        <Link
                            className={styles.socialLink}
                            onClick={()=>sendSocialGAEvent('telegram')}
                            href="https://t.me/antix_in"
                            target="_blank"
                        >
                            <div className={styles.socialIcon}>
                                <Image src={Tglogo} alt="Telegram" />
                            </div>
                            <span>53K</span>
                        </Link>
                        <Link
                            className={styles.socialLink}
                            onClick={()=>sendSocialGAEvent('discord')}
                            href="https://discord.com/invite/bKcMXChRRT"
                            target="_blank"
                        >
                            <div className={styles.socialIcon}>
                                <Image src={Discordlogo} alt="Discord" />
                            </div>
                            <span>7K</span>
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
                            onClick={() =>{
                                sendSocialGAEvent('instagram')
                                window.open(
                                    "https://www.instagram.com/p/CiUgU4cK0YG/",
                                    "_blank"
                                )
                            }}
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
                    {t('heroSection.videoFallbackText')}
                </video>
                {/* <TokenSaleDeposit stage1DateStr={stage1DateStr} setIsRefModal={setIsRefModal} /> */}
                
                {/* Stage 1 is about to start! */}
                {/* <TokenSaleStage1AS stage1DateStr={stage1DateStr} setIsRefModal={setIsRefModal} /> */}
                
                {/* Stage 1 */}
                {/* <TokenSaleStage1 stage1DateStr={stage1DateStr} setIsRefModal={setIsRefModal} /> */}
                
                {/* Stage 1 Sold Out */}
                {/* <TokenSaleStage1SO stage1DateStr={stage1DateStr} setIsRefModal={setIsRefModal} /> */}

                <TokenSaleDeposit2 stage1DateStr={stage4DateStr} setIsRefModal={setIsRefModal} />

            </div>
        </section>
    );
};

export default HeroSection;
