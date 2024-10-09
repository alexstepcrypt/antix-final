"use client";

import { useEffect, useRef } from "react";
import styles from "./VerticalCarusel.module.scss";

import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";

const VerticalCarusel = ({ listOfWords }: { listOfWords: string[] }) => {
    const swiperRef = useRef<SwiperRef | null>(null);

    useEffect(() => {
        setTimeout(() => {
            if (swiperRef.current && swiperRef.current.swiper) {
                swiperRef.current.swiper.update();
            }
        }, 100);
    }, []);

    return (
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
            {listOfWords.map((word) => (
                <SwiperSlide key={word} className={styles.slide}>
                    {({ isActive }) => (
                        <span className={isActive ? styles.active : ""}>
                            {word}
                        </span>
                    )}
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default VerticalCarusel;
