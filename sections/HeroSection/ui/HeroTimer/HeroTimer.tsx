"use client"

import React, { useEffect, useState } from "react";
import styles from "./HeroTimer.module.scss";
import { useTranslation } from "react-i18next";

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}
export const HeroTimer: React.FC<{ targetDate: Date }> = ({ targetDate }) => {
    const { t } = useTranslation('landing');
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
        <div className={styles.container}>
            <div className={styles.timeSegment}>
                <span className={styles.time}>
                    {timeLeft.days.toString().padStart(2, "0")}
                </span>
                <span className={styles.label}>{t('heroTimer.days')}</span>
            </div>
            <span className={styles.separator}>:</span>
            <div className={styles.timeSegment}>
                <span className={styles.time}>
                    {timeLeft.hours.toString().padStart(2, "0")}
                </span>
                <span className={styles.label}>{t('heroTimer.hours')}</span>
            </div>
            <span className={styles.separator}>:</span>
            <div className={styles.timeSegment}>
                <span className={styles.time}>
                    {timeLeft.minutes.toString().padStart(2, "0")}
                </span>
                <span className={styles.label}>{t('heroTimer.minutes')}</span>
            </div>
            <span className={styles.separator}>:</span>
            <div className={styles.timeSegment}>
                <span className={styles.time}>
                    {timeLeft.seconds.toString().padStart(2, "0")}
                </span>
                <span className={styles.label}>{t('heroTimer.seconds')}</span>
            </div>
        </div>
    );
};
