"use client";
import styles from "./PlatformToReplace.module.scss";
import Bg from "/public/images/platoform-to-replace-bg.png";
import BgMobile from "/public/images/platoform-to-replace-bg-mobile.png";
import VerticalCarusel from "../../components/VerticalCarusel/VerticalCarusel";
import { useTranslation } from "react-i18next";

// const words = [
//     "Actors",
//     "TV hosts",
//     "Pop singers",
//     "Personal Assistants",
//     "Fitness Instructors",
//     "Game Characters",
//     "Virtual Companions",
//     "support agents",
//     "Brand Ambassadors",
//     "influencers",
//     "Event Hosts",
// ];

const PlatformToReplace = () => {
    const { t } = useTranslation('landing');
    
    return (
        <section className={styles.wrapper} id="AboutProject">
            <div
                className={styles.bg}
                style={{ backgroundImage: `url(${Bg.src})` }}
            />
            <div
                className={styles.mobileBg}
                style={{ backgroundImage: `url(${BgMobile.src})` }}
            />
            <div className={styles.container}>
                <h4 className={styles.title}>
                    {t('platformToReplace.title')}{" "}
                    <span>{t('platformToReplace.highlightedWord')}</span>
                </h4>
                <VerticalCarusel listOfWords={t('platformToReplace.listOfRoles', { returnObjects: true })} />
            </div>
        </section>
    );
};

export default PlatformToReplace;
