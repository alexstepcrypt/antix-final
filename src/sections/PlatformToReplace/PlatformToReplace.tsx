"use client";

import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import styles from "./PlatformToReplace.module.scss";
import { useEffect, useRef } from "react";
import Bg from "@/public/images/platoform-to-replace-bg.png";

const words = [
    "actors",
    "Personal Assistants",
    "influencers",
    "Fitness Instructors",
    "TV hosts",
    "Game Characters",
    "Pop singers",
    "Virtual Companions",
    "support agents",
    "Event Hosts",
    "Brand Ambassadors",
];

const PlatformToReplace = () => {
    const swiperRef = useRef<SwiperRef | null>(null);
    useEffect(() => {
        setTimeout(() => {
            if (swiperRef.current && swiperRef.current.swiper) {
                swiperRef.current.swiper.update();
            }
        }, 100);
    }, []);

    return (
        <section
            className={styles.wrapper}
            id="AboutProject"
            style={{ backgroundImage: `url(${Bg.src})` }}
        >
            <div className={styles.container}>
                <h4 className={styles.title}>
                    Build and monetize AI digital characters that{" "}
                    <span>replace</span>
                </h4>
                <Swiper
                    ref={swiperRef}
                    direction={"vertical"}
                    spaceBetween={20}
                    slidesPerView={3}
                    loop={true}
                    centeredSlides={true}
                    autoplay={{
                        delay: 2000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: false,
                    }}
                    speed={1500}
                    modules={[Autoplay]}
                    allowTouchMove={false}
                    className={styles.carousel}
                >
                    {words.map((word) => (
                        <SwiperSlide key={word} className={styles.slide}>
                            {({ isActive }) => (
                                <span className={isActive ? styles.active : ""}>
                                    {word}
                                </span>
                            )}
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default PlatformToReplace;
