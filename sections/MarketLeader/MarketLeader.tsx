"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import styles from "./MarketLeader.module.scss";
import { allLogos } from "./data";
import Image from "next/image";
import { useTranslation } from "react-i18next";

const MarketLeader = () => {
    const logoRefs = useRef<HTMLDivElement[]>([]);
    const sectionRef = useRef<HTMLDivElement>(null);
    const hasAnimated = useRef(false);
    const { t } = useTranslation('landing');

    const leftGroup = [0, 1, 3];
    const rightGroup = [2, 4, 5];
    const remainingGroup = [6, 7];

    useEffect(() => {
        const animateLogos = (indexes: number[], delayStart: number) => {
            indexes.forEach((index, i) => {
                gsap.fromTo(
                    logoRefs.current[index],
                    { opacity: 0, scale: 0.8 },
                    {
                        opacity: 1,
                        scale: 1,
                        duration: 1,
                        delay: delayStart + i * 0.1,
                        ease: "power3.out",
                    }
                );
            });
        };

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            if (entries[0].isIntersecting && !hasAnimated.current) {
                animateLogos(leftGroup, 1);
                animateLogos(rightGroup, 0.5);
                // animateLogos(centerGroup, 3);
                animateLogos(remainingGroup, 0);
                hasAnimated.current = true;
            }
        };

        const observer = new IntersectionObserver(observerCallback, {
            root: null,
            threshold: 0.1,
        });

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    return (
        <section className={styles.wrapper} id="Partners" ref={sectionRef}>
            <div className={styles.mobileBg} />
            <h4 className={styles.title}>{t('marketLeader.title')}</h4>
            <div className={styles.container}>
                {allLogos.map((url, index) => (
                    <div
                        key={index}
                        className={styles.item}
                        ref={(el) => {
                            if (el) logoRefs.current[index] = el;
                        }}
                    >
                        <Image src={url} alt="Logo" />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default MarketLeader;
