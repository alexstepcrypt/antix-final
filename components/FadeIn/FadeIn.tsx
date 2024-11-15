"use client"

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface FadeInProps {
    direction?: "up" | "down" | "left" | "right";
    duration?: number;
    distance?: number | string;
    delay?: number;
    children: React.ReactNode;
}

const FadeIn: React.FC<FadeInProps> = ({
    direction = "up",
    duration = 1,
    distance = 50,
    delay = 0,
    children,
}) => {
    const fadeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = fadeRef.current;
        let x: number | string = 0,
            y: number | string = 0;

        switch (direction) {
            case "up":
                y = typeof distance === "string" ? distance : distance;
                break;
            case "down":
                y = typeof distance === "string" ? `-${distance}` : -distance;
                break;
            case "left":
                x = typeof distance === "string" ? distance : distance;
                break;
            case "right":
                x = typeof distance === "string" ? `-${distance}` : -distance;
                break;
        }

        gsap.fromTo(
            element,
            { opacity: 0, x, y },
            {
                opacity: 1,
                x: 0,
                y: 0,
                duration,
                delay,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: element,
                    start: "top 80%",
                    toggleActions: "play none none none",
                },
            }
        );
    }, [direction, duration, distance, delay]);

    return <div ref={fadeRef}>{children}</div>;
};

export default FadeIn;
