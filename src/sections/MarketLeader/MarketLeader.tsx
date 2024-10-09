"use client"

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import styles from "./MarketLeader.module.scss";
import { allLogos } from "./data";
import Image from "next/image";


const MarketLeader = () => {
    const logoRefs = useRef<HTMLDivElement[]>([]);

    // Определяем группы для логотипов в зависимости от мест появления (слева, справа, центр)
    const leftGroup = [0, 1, 2, 3, 4]; // Логотипы, появляющиеся слева
    const rightGroup = [5, 6, 7, 8, 9]; // Логотипы, появляющиеся справа
    const centerGroup = [10, 11, 12, 13, 14]; // Логотипы, появляющиеся по центру
    const remainingGroup = [15, 16, 17, 18, 19]; // Остальные логотипы

    useEffect(() => {
        // Устанавливаем порядок анимации для групп
        const animateLogos = (indexes: number[], delayStart: number, xOffset = 0, yOffset = 0) => {
            indexes.forEach((index, i) => {
                gsap.fromTo(
                    logoRefs.current[index],
                    { opacity: 0, x: xOffset, y: yOffset, scale: 0.8 },
                    {
                        opacity: 1,
                        x: 0,
                        y: 0,
                        scale: 1,
                        duration: 1,
                        delay: delayStart + i * 0.2,
                        ease: "power3.out",
                    }
                );
            });
        };

        // Анимация слева
        animateLogos(leftGroup, 0, -100, 0); // Логотипы появляются немного слева
        // Анимация справа
        animateLogos(rightGroup, 1, 100, 0); // Логотипы появляются немного справа
        // Анимация по центру
        animateLogos(centerGroup, 2, 0, -50); // Логотипы появляются чуть выше центра
        // Анимация остальных логотипов
        animateLogos(remainingGroup, 3); // Остальные логотипы появляются стандартно

    }, []);

    return (
        <section className={styles.wrapper} id="Partners">
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
                            index === 9 || index === 17 || index === 19 || index === 21
                                ? { width: 258, padding: 40 } // Индивидуальные стили
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
