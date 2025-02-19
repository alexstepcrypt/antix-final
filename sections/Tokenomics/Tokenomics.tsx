"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Tokenomics.module.scss";

import Bg from "/public/images/tokenomics-bg.png";
import TokenomicsLabel from "/public/svg/tokenomics-labels.svg";
import TokenomicsChart from "/public/svg/tokenomics-chart.svg";
import TokenomicsLabelMobile from "/public/images/tokenomics-labels-mobile.png";
import { useTranslation } from "react-i18next";

gsap.registerPlugin(ScrollTrigger);

const Tokenomics = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const { t } = useTranslation('landing');

    useEffect(() => {
        const el = sectionRef.current;

        gsap.fromTo(
            el,
            { opacity: 0 },
            {
                opacity: 1,
                duration: 1.5,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: el,
                    start: "top 80%",
                    once: true,
                },
            }
        );
    }, []);

    return (
        <section
            className={styles.container}
            style={{ backgroundImage: `url(${Bg.src})` }}
            id="Tokenomics"
        >
            <h4 className={styles.title}>
                {t('tokenomics.title')}
            </h4>
            <div className={styles.chartWrapper} ref={sectionRef}>
                <div className={styles.innerChartText}>
                    <span>1,000,000,000</span>
                    ANTIX
                </div>
                <div className={styles.chart}>
                    <Image
                        src={TokenomicsChart}
                        alt="Chart"
                        width={530}
                        height={530}
                        draggable={false}
                    />
                    <Image
                        src={TokenomicsLabelMobile}
                        alt="Chart"
                        width={440}
                        height={233}
                        className={styles.labelMobile}
                    />
                </div>
                {/* <DonutChart /> */}
                <div className={styles.bg}>
                    <Image
                        src={TokenomicsLabel}
                        alt="Labels"
                        draggable={false}
                    />
                </div>
            </div>
        </section>
    );
};

export default Tokenomics;
