import React from "react";

import styles from "./AntixFeatures.module.scss";

import Bg from "/public/images/antix-features-bg.png";
import VerticalCarusel from "../../components/VerticalCarusel/VerticalCarusel";
import { useTranslation } from "react-i18next";

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
    const { t } = useTranslation('landing');
    return (
        <section
            className={styles.wrapper}
            id="AboutProject"
            style={{ backgroundImage: `url(${Bg.src})` }}
        >
            <div className={styles.container}>
                <h4 className={styles.title}>
                    {t('antixFeatures.title')}{" "}
                    <span>{t('antixFeatures.highlightedText')}</span>
                </h4>
                <VerticalCarusel listOfWords={t('antixFeatures.wordsList', { returnObjects: true })} />
            </div>
        </section>
    );
};

export default AntixFeatures;
