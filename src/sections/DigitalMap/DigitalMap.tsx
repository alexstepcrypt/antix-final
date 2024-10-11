"use client";

import React, { useState } from "react";
import styles from "./DigitalMap.module.scss";
import Image from "next/image";

import VideoModal from "@/components/VideoModal/VideoModal";

import Bg from "@/public/images/digital-map/digital-map-bg.png";
import PlayIcon from "@/public/svg/play-video.svg";
import PlayImage from "@/public/images/digital-map/map-video-img.png";
import Point1 from "@/public/images/digital-map/point-1.png";
import Point2 from "@/public/images/digital-map/point-2.png";
import Point3 from "@/public/images/digital-map/point-3.png";
import { FadeInNew } from "@/components/FadeInNew/FadeInNew";

const DigitalMap = () => {
    const [openVideo, setOpenVideo] = useState("");
    return (
        <section className={styles.container}>
            {openVideo && (
                <VideoModal videoUrl={openVideo} onClose={setOpenVideo} />
            )}
            <div
                className={styles.bgMap}
                style={{ backgroundImage: `url(${Bg.src})` }}
            />
            <div className={styles.topContent}>
                <div className={styles.descWrapper}>
                    <p className={styles.desc}>
                        <span>Yesterday:</span> exclusively available to large
                        Hollywood studios, $50000+, weeks of work
                    </p>
                    <p className={styles.desc}>
                        <span>Today:</span> available to YOU, instantly created
                        with AI, starting from $100
                    </p>
                </div>
                <h4 className={styles.title}>Digital humans everywhere</h4>
            </div>

            <div className={styles.pointsWrapper}>
                <FadeInNew direction="down">
                    <div className={styles.point1}>
                        <Image src={Point1} alt="" draggable={false} />

                        <div
                            className={styles.videoWrapper}
                            onClick={() =>
                                setOpenVideo(
                                    "https://www.youtube.com/embed/3FxZYSKfcE0"
                                )
                            }
                        >
                            <Image src={PlayImage} alt="" draggable={false} />
                            <div className={styles.play}>
                                <Image
                                    src={PlayIcon}
                                    alt=""
                                    draggable={false}
                                />
                            </div>
                        </div>
                    </div>
                </FadeInNew>

                <FadeInNew direction="down">
                    <div className={styles.point2}>
                        <Image src={Point2} alt="" draggable={false} />
                        <div
                            className={styles.videoWrapper}
                            onClick={() =>
                                setOpenVideo(
                                    "https://www.youtube.com/embed/FBzkC5uFZLg"
                                )
                            }
                        >
                            <Image src={PlayImage} alt="" draggable={false} />
                            <div className={styles.play}>
                                <Image
                                    src={PlayIcon}
                                    alt=""
                                    draggable={false}
                                />
                            </div>
                        </div>
                    </div>
                </FadeInNew>

                <FadeInNew direction="down">
                    <div className={styles.point3}>
                        <Image src={Point3} alt="" draggable={false} />

                        <div
                            className={styles.videoWrapper}
                            onClick={() =>
                                setOpenVideo(
                                    "https://www.youtube.com/embed/F1YDHYELweI"
                                )
                            }
                        >
                            <Image src={PlayImage} alt="" draggable={false} />
                            <div className={styles.play}>
                                <Image
                                    src={PlayIcon}
                                    alt=""
                                    draggable={false}
                                />
                            </div>
                        </div>
                    </div>
                </FadeInNew>
            </div>
        </section>
    );
};

export default DigitalMap;
