import React from "react";
import styles from "./Advisors.module.scss";
import TeamComponent from "../../components/TeamComponent/TeamComponent";
import { advisorsList } from "./mocdata";
import { useTranslation } from "react-i18next";
import { teamItemsTextType } from "../Team/components/TeamCarousel/mocdata";

const Advisors = () => {
    const { t } = useTranslation('landing');
    const advisorsItems = t('advisors.list', { returnObjects: true }) as Array<teamItemsTextType>;

    const transformedList = advisorsItems.map((item, i) => ({
        ...item,
        image: advisorsList[i].image,
        socialLink: advisorsList[i].socialLink,
    }));

    return (
        <section className={styles.container} id="Advisors">
            <h3 className={styles.title}>{t('advisors.title')}</h3>
            <p className={styles.desc}>
                {t('advisors.description.text_1')}
                <span>{t('advisors.description.span')}</span>
                {t('advisors.description.text_2')}
            </p>
            <div className={styles.advisorsWrapper}>
                {transformedList.map((advisor) => (
                    <TeamComponent key={advisor.name} {...advisor} />
                ))}
            </div>
        </section>
    );
};

export default Advisors;
