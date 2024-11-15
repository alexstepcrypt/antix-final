"use client";

import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/scss";
import styles from "./FeaturedIn.module.scss";
import { logos } from "./mocdata";

import Image from "next/image";

const FeaturedIn: React.FC = () => {
    const swiperRef = useRef<any>(null);
    let slidesPerView;
    let windowWidth = typeof window === "undefined" ? 0 : window.innerWidth;
    switch (windowWidth) {
        case 1200:
            slidesPerView = 4;
            break;
        case 480:
            slidesPerView = 3;
            break;
    }

    return (
        <section className={styles.wrapper} id="FeaturedIn">
            <h4 className={styles.title}>Featured in</h4>
            <div
                className={styles.container}
                onMouseEnter={() => swiperRef.current?.swiper.autoplay.stop()}
                onMouseLeave={() => swiperRef.current?.swiper.autoplay.start()}
            >
                <Swiper
                    ref={swiperRef}
                    modules={[Autoplay]}
                    spaceBetween={0}
                    slidesPerView={
                        typeof window === "undefined"
                            ? 0
                            : window.innerWidth > 960
                            ? 4
                            : 2
                    }
                    loop={true}
                    speed={2000}
                    autoplay={{
                        delay: 0,
                        disableOnInteraction: true,
                    }}
                    allowTouchMove={false}
                    grabCursor={false}
                >
                    {logos.map((logo, index) => (
                        <SwiperSlide key={index} className={styles.item}>
                            <a href={logo.link} target="_blank">
                                <Image
                                    src={logo.logo}
                                    alt="Featured in"
                                    height={60}
                                />
                            </a>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default FeaturedIn;
