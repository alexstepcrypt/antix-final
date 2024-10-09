"use client"

import React, { ReactElement, useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface FadeInProps {
    direction?: "up" | "down" | "left" | "right";
    duration?: number;
    distance?: number | string;
    delay?: number;
    children: ReactElement;
}

export const FadeInNew = (props: FadeInProps) => {
    const {
        direction = "up",
        duration = 1,
        distance = 50,
        delay = 0,
        children,
    } = props;
    const fadeRef = useRef<HTMLDivElement>(null);
    const childProps = useMemo(
        () => ({
            ...children.props,
            ref: fadeRef,
        }),
        [children]
    );
    const cloneElement = useMemo(
        () => React.cloneElement(children, childProps),
        [childProps, children]
    );

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

    return <>{cloneElement}</>;
};
