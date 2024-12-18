import { FadeInNew } from "@/components/FadeInNew/FadeInNew";
import styles from "./Why.module.scss";

import Bg from "/public/images/why/why-bg.png";
import Bg1 from "/public/svg/why/why-item-bg1.svg";
import Bg2 from "/public/svg/why/why-item-bg2.svg";
import Bg3 from "/public/svg/why/why-item-bg3.svg";
import { useTranslation } from "react-i18next";

const Why = () => {
    const { t } = useTranslation('landing');
    return (
        <section
            className={styles.wrapper}
            style={{ backgroundImage: `url(${Bg.src})` }}
        >
            <div className={styles.container}>
                <FadeInNew direction="right" delay={0}>
                    <div
                        className={styles.item}
                        style={{ backgroundImage: `url(${Bg1.src})` }}
                    >
                        <h4>{t('why.block1.title')}</h4>
                        <p>{t('why.block1.description')}</p>
                    </div>
                </FadeInNew>
                <FadeInNew direction="right" delay={0.3}>
                    <div
                        className={styles.item}
                        style={{ backgroundImage: `url(${Bg2.src})` }}
                    >
                        <h4>{t('why.block2.title')}</h4>
                        <p>{t('why.block2.description')}</p>
                    </div>
                </FadeInNew>
                <FadeInNew direction="right" delay={0.5}>
                    <div
                        className={styles.item}
                        style={{ backgroundImage: `url(${Bg3.src})` }}
                    >
                        <h4>{t('why.block3.title')}</h4>
                        <p>{t('why.block3.description')}</p>
                    </div>
                </FadeInNew>
            </div>
        </section>
    );
};

export default Why;
