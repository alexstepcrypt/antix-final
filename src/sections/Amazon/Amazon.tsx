import React from "react";
import styles from "./Amazon.module.scss";
import Img from "@/public/images/amazon.png";
import Image from "next/image";

const Amazon = () => {
    return (
        <section className={styles.container}>
            <Image src={Img} alt={"Amazon"} className={styles.img} />
            <div className={styles.mobileBg} />
            <div className={styles.textWrapper}>
                <h3 className={styles.title}>
                    Amazon of
                    <span>AI digital avatars</span>
                </h3>
                <p className={styles.desc}>
                    Your digital twin, with all the unique features, belongs to
                    you as a unique NFT, ready to tune, trade or rent.
                </p>
            </div>
        </section>
    );
};

export default Amazon;
