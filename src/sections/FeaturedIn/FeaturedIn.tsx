"use client"

import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/scss";
import styles from "./FeaturedIn.module.scss";
// import { logos } from "./mocdata";

import Logo1 from "@/public/svg/featuredIn/1.svg";
import Logo2 from "@/public/svg/featuredIn/2.svg";
import Logo3 from "@/public/svg/featuredIn/3.svg";
import Logo4 from "@/public/svg/featuredIn/4.svg";
import Logo5 from "@/public/svg/featuredIn/5.svg";
import Logo6 from "@/public/svg/featuredIn/6.svg";
import Logo7 from "@/public/svg/featuredIn/7.svg";
import Image from "next/image";

export const logos = [Logo1, Logo2, Logo3, Logo4, Logo5, Logo6, Logo7, Logo1, Logo2, Logo3, Logo4, Logo5, Logo6, Logo7, Logo1, Logo2, Logo3, Logo4, Logo5, Logo6, Logo7];


const FeaturedIn: React.FC = () => {
    const swiperRef = useRef<any>(null);

    return (
        <section className={styles.wrapper}>
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
                    slidesPerView={5}
                    loop={true}
                    speed={typeof window === 'undefined' ? 0 : window.innerWidth > 1200 ? 2000 : 1500}
                    autoplay={{
                        delay: 0,
                        disableOnInteraction: true,
                    }}
                    allowTouchMove={false}
                    grabCursor={false}
                >
                    {logos.map((url, index) => (
                        <SwiperSlide key={index} className={styles.item}>
                            <a href="">
                                <Image src={url} alt="Featured in" height={40} />
                            </a>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default FeaturedIn;
