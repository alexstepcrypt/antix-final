"use client";

import styles from "./Statistics.module.scss";

import Img1 from "/public/images/statistics/1.png";
import Img2 from "/public/images/statistics/2.png";
import Img3 from "/public/images/statistics/3.png";
import Img4 from "/public/images/statistics/4.png";
import Img5 from "/public/images/statistics/5.png";
import Img6 from "/public/images/statistics/6.png";
import Img7 from "/public/images/statistics/7.png";
import Img8 from "/public/images/statistics/8.png";

import Percent20 from "/public/svg/statistics/20.svg";
import Percent50 from "/public/svg/statistics/50.svg";
import Percent90 from "/public/svg/statistics/90.svg";
import StickIcon from "/public/svg/statistics/stick.svg";
import DollarIcon from "/public/svg/statistics/dollar.svg";
import Icon15m from "/public/svg/statistics/15m.svg";

import { FadeInNew } from "../../components/FadeInNew/FadeInNew";
import { ImgBox } from "./ui/ImgBox/ImgBox";
import Image from "next/image";
import { mobileText } from "./data";

import MobileBtn from "/public/svg/mobile-hidden-tn.svg";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

const Statistics = () => {
    const [isOpen, setIsOpen] = useState(false);
    const contentRef = useRef<HTMLDivElement | null>(null);
    const { t } = useTranslation('landing');

    useEffect(() => {
        if (contentRef.current) {
            const content = contentRef.current;
            if (isOpen) {
                content.style.height = `${content.scrollHeight}px`;
            } else {
                content.style.height = "0";
            }
        }
    }, [isOpen]);

    const mobileJSText = t('statistics.mobileText', { returnObjects: true }) as Array<{span1:string;description:string}>;
    
    return (
        <>
            <section className={styles.mobileWrapper}>
                <div
                    ref={contentRef}
                    className={`${styles.mobileContent} ${
                        isOpen ? styles.open : ""
                    }`}
                >
                    {mobileJSText.map((item, index) => (
                        <div key={index} className={styles.mobileItem}>
                            <Image src={mobileText[index].img} alt="" />
                            <p className={styles.mobileText}>{item.span1 ? <span>item.span1</span> : ''} {item.description}</p>
                        </div>
                    ))}
                </div>
                <button
                    onClick={() => setIsOpen((prev) => !prev)}
                    className={styles.mobileBtn}
                >
                    {isOpen ? <p>{t('statistics.hideDetails')}</p> : <p>{t('statistics.showDetails')}</p>}
                    <Image
                        src={MobileBtn}
                        alt=""
                        className={`${styles.mobileBtnImg} ${
                            !isOpen ? styles.openMobileBtnImg : ""
                        }`}
                    />
                </button>
            </section>
            <section className={styles.wrapperNew}>
                <div className={styles.topWrapper}>
                    <FadeInNew direction="right" distance={"50%"}>
                        <div>
                            <ImgBox imgSrc={Img2} className={styles.imgBox} />
                        </div>
                    </FadeInNew>
                    <FadeInNew direction="left" distance={"50%"}>
                        <div>
                            <div>
                                <span>100M+</span>
                                <p>{t('statistics.viewers.text')}</p>
                            </div>
                        </div>
                    </FadeInNew>
                    <FadeInNew direction="right" distance={"50%"}>
                        <div>
                            <ImgBox imgSrc={Img5} className={styles.imgBox} />
                        </div>
                    </FadeInNew>
                    <FadeInNew direction="left" distance={"50%"}>
                        <div>
                            <ImgBox imgSrc={Img8} className={styles.imgBox} />
                        </div>
                    </FadeInNew>
                    <FadeInNew direction="right" distance={"50%"}>
                        <div>
                            <div>
                                <div>
                                    <span>$100K</span>
                                    <Image src={StickIcon} alt="" />
                                    <span>$500K</span>
                                </div>
                                <p>{t('statistics.costOfProduction.text')}</p>
                            </div>
                        </div>
                    </FadeInNew>
                    <FadeInNew direction="left" distance={"50%"}>
                        <div>
                            <div>
                                <span>50%</span>
                                <p>{t('statistics.adoptionRate.text')}</p>
                            </div>
                        </div>
                    </FadeInNew>
                    <FadeInNew direction="right" distance={"50%"}>
                        <div>
                            <ImgBox imgSrc={Img1} className={styles.imgBox} />
                        </div>
                    </FadeInNew>
                    <FadeInNew direction="left" distance={"50%"}>
                        <div>
                            <ImgBox imgSrc={Img3} className={styles.imgBox} />
                        </div>
                    </FadeInNew>
                    <FadeInNew direction="right" distance={"50%"}>
                        <div>
                            <div>
                                <p>{t('statistics.marketGrowth.text')}</p>
                                <span>20%</span>
                            </div>
                        </div>
                    </FadeInNew>
                    <FadeInNew direction="left" distance={"50%"}>
                        <div>
                            <div>
                                <div className={styles.title15m}>
                                    <p className={styles.count}>15,000,</p>
                                    <p className={styles.zeros}>000,000</p>
                                </div>
                                <p>{t('statistics.influencersMarket.text')}</p>
                            </div>
                            <div>
                                <ImgBox
                                    imgSrc={DollarIcon}
                                    className={styles.imgBox}
                                    style={{ backgroundSize: "contain" }}
                                />
                            </div>
                        </div>
                    </FadeInNew>
                    <FadeInNew direction="right" distance={"50%"}>
                        <div>
                            <div>
                                <span>90%</span>
                                <p>{t('statistics.costReduction.text')}</p>
                            </div>
                        </div>
                    </FadeInNew>
                    <FadeInNew direction="left" distance={"50%"}>
                        <div>
                            <ImgBox imgSrc={Img4} className={styles.imgBox} />
                        </div>
                    </FadeInNew>
                    <FadeInNew direction="right" distance={"50%"}>
                        <div>
                            <ImgBox imgSrc={Img6} className={styles.imgBox} />
                        </div>
                    </FadeInNew>
                    <FadeInNew direction="left" distance={"50%"}>
                        <div>
                            <ImgBox imgSrc={Img7} className={styles.imgBox} />
                        </div>
                    </FadeInNew>
                </div>
            </section>
        </>
    );
};

export default Statistics;
