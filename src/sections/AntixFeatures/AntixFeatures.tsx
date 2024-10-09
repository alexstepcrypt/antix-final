import React from "react";

import styles from "./AntixFeatures.module.scss";

import Bg from "@/public/images/antix-features-bg.png";
import VerticalCarusel from "@/components/VerticalCarusel/VerticalCarusel";

const words = [
    "digital twins",
    "skills",
    "gestures",
    "clothes",
    "haircuts",
    "languages",
    "accessories",
    "full outfits",
    "voices",
];

const AntixFeatures = () => {
    return (
        <section
            className={styles.wrapper}
            id="AboutProject"
            style={{ backgroundImage: `url(${Bg.src})` }}
        >
            <div className={styles.container}>
                <h4 className={styles.title}>
                    Antix features a unique marketplace to{" "}
                    <span>buy, rent, or sell</span>
                </h4>
                <VerticalCarusel listOfWords={words} />
            </div>
        </section>
    );
};

export default AntixFeatures;
