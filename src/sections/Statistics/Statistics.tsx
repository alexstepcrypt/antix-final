import styles from "./Statistics.module.scss";

import Img1 from "@/public/images/statistics/1.png";
import Img2 from "@/public/images/statistics/2.png";
import Img3 from "@/public/images/statistics/3.png";
import Img4 from "@/public/images/statistics/4.png";
import Img5 from "@/public/images/statistics/5.png";
import Img6 from "@/public/images/statistics/6.png";
import Img7 from "@/public/images/statistics/7.png";
import Img8 from "@/public/images/statistics/8.png";

import Percent20 from "@/public/svg/statistics/20.svg";
import Percent50 from "@/public/svg/statistics/50.svg";
import Percent90 from "@/public/svg/statistics/90.svg";
import StickIcon from "@/public/svg/statistics/stick.svg";
import DollarIcon from "@/public/svg/statistics/dollar.svg";
import Icon15m from "@/public/svg/statistics/15m.svg";
import ArrovButtom from "@/public/svg/statistics/arrovButtom.svg";

import { FadeInNew } from "../../components/FadeInNew/FadeInNew";
import { ImgBox } from "./ui/ImgBox/ImgBox";
import Image from "next/image";

const Statistics = () => {
    return (
        <>
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
                                <p>
                                    Antix digital humans: Seen by 100M+ viewers
                                    globally across films, marketing, and games.
                                </p>
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
                                <p>
                                    Cost of Pre-Antix digital characters:{" "}
                                    Ultra-realistic digital characters cost
                                    $100K-$500K, weeks of production time.
                                </p>
                            </div>
                        </div>
                    </FadeInNew>
                    <FadeInNew direction="left" distance={"50%"}>
                        <div>
                            <div>
                                <Image src={Percent50} alt="50%" />
                                <p>
                                    Adoption in Gaming and VR/AR Industries: 40%
                                    of new games and 50% of VR content to
                                    feature digital humans by 2025.
                                </p>
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
                                <p>
                                    Yearly market growth: $10B in 2023,
                                    projected to $30B by 2030, 20% CAGR.
                                </p>
                                <Image src={Percent20} alt="20%" />
                            </div>
                        </div>
                    </FadeInNew>
                    <FadeInNew direction="left" distance={"50%"}>
                        <div>
                            <div>
                                <Image src={Icon15m} alt="" />
                                <p>
                                    Virtual influencers market growth: $15B
                                    market by 2025, triple the engagement of
                                    human.
                                </p>
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
                                <Image src={Percent90} alt="90%" />
                                <p>
                                    Production cost and time reduction: Antix
                                    cuts digital human creation time from weeks
                                    to hours, costs down by 90%.
                                </p>
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
