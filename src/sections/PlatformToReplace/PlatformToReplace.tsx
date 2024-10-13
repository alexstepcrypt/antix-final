"use client";
import styles from "./PlatformToReplace.module.scss";
import Bg from "@/public/images/platoform-to-replace-bg.png";
import BgMobile from "@/public/images/platoform-to-replace-bg-mobile.png";
import VerticalCarusel from "@/components/VerticalCarusel/VerticalCarusel";

const words = [
    "Actors",
    "TV hosts",
    "Pop singers",
    "Personal Assistants",
    "Fitness Instructors",
    "Game Characters",
    "Virtual Companions",
    "support agents",
    "Brand Ambassadors",
    "influencers",
    "Event Hosts",
];

const PlatformToReplace = () => {
    return (
        <section
            className={styles.wrapper}
            id="AboutProject"
            style={{
                backgroundImage: `url(${Bg.src})`,
            }}
        >
            <div className={styles.container}>
                <h4 className={styles.title}>
                    Build and monetize AI digital characters that{" "}
                    <span>replace</span>
                </h4>
                <VerticalCarusel listOfWords={words} />
            </div>
        </section>
    );
};

export default PlatformToReplace;
