"use client";

import React, { useState, useEffect } from "react";
import styles from "./FloatingWidget.module.scss";
import Image from "next/image";

import TopArrow from "/public/svg/top-arrow.svg";

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

const FloatingWidget = () => {
    const [isVisible, setIsVisible] = useState(false);
    const targetDate = new Date("2024-11-28T16:00:00.000Z");
    const handleScroll = () => {
        const secondBlock = document.getElementById("Partners");

        if (secondBlock) {
            const blockPosition = secondBlock.getBoundingClientRect();
            const scrollPosition = window.scrollY + window.innerHeight;

            if (scrollPosition > blockPosition.top + window.scrollY) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const [timeLeft, setTimeLeft] = useState<TimeLeft>({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const difference = targetDate.getTime() - now;

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                });
            } else {
                clearInterval(interval);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [targetDate]);

    return (
        <div
            id="floatingElement"
            className={`${styles.floatingWidget} ${
                isVisible ? styles.visible : ""
            }`}
        >
            <div className={styles.sale}>
                <p>Join Token Sale Now!</p>
                <div>
                    $0.06 <span>- 70% discount!</span>
                </div>
            </div>
            <div className={styles.timer}>
                <p>The Stage Ends After:</p>
                <div className={styles.countdown}>
                    <div>
                        <span>{timeLeft.days.toString().padStart(2, "0")}</span> days
                    </div>{" "}
                    :
                    <div>
                        <span>{timeLeft.hours.toString().padStart(2, "0")}</span> hours
                    </div>{" "}
                    :
                    <div>
                        <span>{timeLeft.minutes.toString().padStart(2, "0")}</span> min
                    </div>{" "}
                    :
                    <div>
                        <span>{timeLeft.seconds.toString().padStart(2, "0")}</span> sec
                    </div>
                </div>
            </div>
            <button
                className={styles.topButton}
                onClick={() => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                }}
            >
                <Image src={TopArrow} alt={"To top"} width={20} height={8} />
            </button>
        </div>
    );
};

export default FloatingWidget;
