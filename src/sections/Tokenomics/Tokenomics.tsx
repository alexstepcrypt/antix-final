"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Tokenomics.module.scss";
import DonutChart from "@/components/DonutChart/DonutChart";

import Bg from "@/public/images/tokenomics-bg.png";
import TokenomicsLabel from "@/public/images/tokenomics-labels.png";

gsap.registerPlugin(ScrollTrigger);

const Tokenomics = () => {
    const sectionRef = useRef<HTMLDivElement>(null);

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
        >
            <h4 className={styles.title}>Tokenomics</h4>
            <div className={styles.chartWrapper} ref={sectionRef}>
                <div className={styles.innerChartText}>
                    <span>1B</span>
                    Tokens
                </div>
                <DonutChart />
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
