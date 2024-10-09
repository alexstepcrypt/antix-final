"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import styles from "./MarketLeader.module.scss";
import { allLogos } from "./data";
import Image from "next/image";

const MarketLeader = () => {
    const logoRefs = useRef<HTMLDivElement[]>([]);
    const sectionRef = useRef<HTMLDivElement>(null);
    const hasAnimated = useRef(false);

    const leftGroup = [0, 1, 2, 3, 4];
    const rightGroup = [5, 6, 7, 8, 9];
    const centerGroup = [10, 11, 12, 13, 14];
    const remainingGroup = [15, 16, 17, 18, 19, 20, 21, 22, 23, 24];

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
                        delay: delayStart + i * 0.2,
                        ease: "power3.out",
                    }
                );
            });
        };

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            if (entries[0].isIntersecting && !hasAnimated.current) {
                animateLogos(leftGroup, 2);
                animateLogos(rightGroup, 1);
                animateLogos(centerGroup, 3);
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
            <h4 className={styles.title}>Giants tested our skills</h4>
            <div className={styles.container}>
                {allLogos.map((url, index) => (
                    <div
                        key={index}
                        className={styles.item}
                        ref={(el) => {
                            if (el) logoRefs.current[index] = el;
                        }}
                        style={
                            index === 9 ||
                            index === 17 ||
                            index === 19 ||
                            index === 21
                                ? { width: 258, padding: 40 }
                                : {}
                        }
                    >
                        <Image src={url} alt="Logo" />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default MarketLeader;
