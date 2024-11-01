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

import Bg from "/public/images/hero-timer-bg.png";
import BgHead from "/public/images/hero-timer-bg-head.png";
import { FadeInNew } from "@/components/FadeInNew/FadeInNew";
import Link from "next/link";

const HeroSection = () => {
    const isIOS = typeof navigator !== 'undefined' ? /iPhone|iPad|iPod/i.test(navigator.userAgent) : false;
    const startDate = "20241114T160000Z";
    const endDate = "20241114T170000Z";

    function addToCalendar() {
        if (isIOS) {
            const icsContent = `
      BEGIN:VCALENDAR
      VERSION:2.0
      BEGIN:VEVENT
      DTSTART:${startDate}
      DTEND:${endDate}
      SUMMARY:Мое событие
      DESCRIPTION:Описание события
      LOCATION:Онлайн
      END:VEVENT
      END:VCALENDAR`;

            const blob = new Blob([icsContent], { type: "text/calendar" });
            const url = URL.createObjectURL(blob);

            window.open(url, "_blank");
            setTimeout(() => URL.revokeObjectURL(url), 1000);
        } else {
            const title = "ANTIX Deposit Stage starts";
            const location = "Online";
            const startDate = new Date("2024-11-14T16:00:00Z");

            const start = startDate.toISOString().replace(/-|:|\.\d+/g, "");
            const end = new Date(startDate.getTime() + 60 * 60 * 1000)
                .toISOString()
                .replace(/-|:|\.\d+/g, "");

            const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
                title
            )}&dates=${start}/${end}&location=${encodeURIComponent(location)}`;

            window.open(googleCalendarUrl, "_blank");
        }
    }

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
            <div className={styles.container}>
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
                            <span>56К</span>
                        </Link>
                        <Link
                            className={styles.socialLink}
                            href="https://discord.com/invite/bKcMXChRRT"
                            target="_blank"
                        >
                            <div className={styles.socialIcon}>
                                <Image src={Discordlogo} alt="Discord" />
                            </div>
                            <span>5К</span>
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
                            Deposit Stage
                        </div>
                    </div>

                    <div
                        className={styles.timer}
                        style={{ backgroundImage: `url(${Bg.src})` }}
                    >
                        <span className={styles.title}>
                            Deposit Stage starts in
                        </span>
                        {/* <div className={styles.loader}>
                            <LoaderSvg percent={0} />
                        </div> */}
                        <HeroTimer
                            targetDate={new Date("2024-11-14T16:00:00Z")}
                        />
                        <button
                            className={styles.timerButton}
                            onClick={addToCalendar}
                        >
                            Notify me about the start
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
