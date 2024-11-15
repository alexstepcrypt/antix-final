import React from "react";
import styles from "./Advisors.module.scss";
import TeamComponent from "../../components/TeamComponent/TeamComponent";
import { advisorsList } from "./mocdata";

const Advisors = () => {
    return (
        <section className={styles.container} id="Advisors">
            <h3 className={styles.title}>Advisors</h3>
            <p className={styles.desc}>
                The Antix advisory team brings{" "}
                <span>80 years of combined experience </span>
                in successful investing, offering deep business expertise and
                exceptional knowledge of the Web3 sector.
            </p>
            <div className={styles.advisorsWrapper}>
                {advisorsList.map((advisor) => (
                    <TeamComponent key={advisor.name} {...advisor} />
                ))}
            </div>
        </section>
    );
};

export default Advisors;
