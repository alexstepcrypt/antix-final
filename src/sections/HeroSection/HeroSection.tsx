"use client"

import styles from "./HeroSection.module.scss";

import Xlogo from "@/public/svg/social-x.svg";
import Tglogo from "@/public/svg/social-telegram.svg";
import Discordlogo from "@/public/svg/social-discord.svg";

import LogoSmall from "@/public/svg/logo-small.svg" 

import { LoaderSvg } from "./ui/LoaderSvg/LoaderSvg";
import { HeroTimer } from "./ui/HeroTimer/HeroTimer";
import FadeIn from "../../components/FadeIn/FadeIn";

import Awords1 from "@/public/svg/team/ico1.svg";
import Awords2 from "@/public/svg/team/ico2.svg";
import Awords3 from "@/public/svg/team/ico3.svg";
import Awords4 from "@/public/svg/team/ico4.svg";
import Awords5 from "@/public/svg/team/top10.svg";
import Image from "next/image";

import Bg from "@/public/images/hero-timer-bg.png"

const HeroSection = () => {
    return (
        <section className={styles.wrapper} id="Hero">
            <video className={styles.backgroundVideo} autoPlay loop muted>
                <source
                    src={require("@/public/video/hero-video.webm")}
                    type="video/webm"
                />
                Ваш браузер не поддерживает видео.
            </video>
            <div className={styles.container}>
                <div className={styles.leftColumn}>
                    <FadeIn direction="right" distance="50%">
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
                            <span>ANTIX token</span>. Hyper-realistic digital
                            twins for film, content, and beyond
                        </p>
                    </FadeIn>
                    <div className={styles.actions}>
                        <a
                            className={styles.socialLink}
                            href="https://x.com/antix_in"
                            target="_blank"
                        >
                            <div className={styles.socialIcon}>
                                <Image src={Xlogo} alt="X" />
                            </div>
                            <span>43К</span>
                        </a>
                        <a
                            className={styles.socialLink}
                            href="https://t.me/antix_in"
                            target="_blank"
                        >
                            <div className={styles.socialIcon}>
                                <Image src={Tglogo} alt="Telegram" />
                            </div>
                            <span>75К</span>
                        </a>
                        <a
                            className={styles.socialLink}
                            href="https://discord.com/invite/bKcMXChRRT"
                            target="_blank"
                        >
                            <div className={styles.socialIcon}>
                                <Image src={Discordlogo} alt="Discord" />
                            </div>
                            <span>12К</span>
                        </a>
                    </div>
                    <div className={styles.awords}>
                        <Image src={Awords1} alt="" />
                        <Image src={Awords2} alt="" />
                        <Image src={Awords3} alt="" />
                        <Image src={Awords4} alt="" />
                        <Image src={Awords5} alt="" />
                    </div>
                </div>
                <div className={styles.rightColumn} style={{backgroundImage: `url(${Bg.src})`}}>
                    <div className={styles.timerWrapperTitle}>
                        <Image src={LogoSmall} width={30} height={30} alt="Logo" className={styles.logo}/>
                        ANTIX Presale
                    </div>
                    <div className={styles.timer}>
                        <span className={styles.title}>Coming Soon</span>
                        <div className={styles.loader}>
                            <LoaderSvg percent={30} />
                        </div>
                        <HeroTimer
                            targetDate={new Date("2024-12-31T23:59:59")}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
