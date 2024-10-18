import { FadeInNew } from "../../components/FadeInNew/FadeInNew";
import styles from "./Why.module.scss";

import Bg from "/public/images/why/why-bg.png";
import Bg1 from "/public/images/why/why-item-bg1.png";
import Bg2 from "/public/images/why/why-item-bg2.png";
import Bg3 from "/public/images/why/why-item-bg3.png";

const Why = () => {
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
                        <h4>Create and Earn from avatars</h4>
                        <p>
                            Design, customize, and monetize digital avatars with
                            Antix across various platforms.
                        </p>
                    </div>
                </FadeInNew>
                <FadeInNew direction="right" delay={0.3}>
                    <div
                        className={styles.item}
                        style={{ backgroundImage: `url(${Bg2.src})` }}
                    >
                        <h4>True IP ownership with a blockchain</h4>
                        <p>
                            Your avatars are protected and owned through NFTs,
                            fully tradable and secure.
                        </p>
                    </div>
                </FadeInNew>
                <FadeInNew direction="right" delay={0.5}>
                    <div
                        className={styles.item}
                        style={{ backgroundImage: `url(${Bg3.src})` }}
                    >
                        <h4>ANTIX token drives the platform</h4>
                        <p>
                            Use ANTIX tokens for payments, customization, and
                            rewards, with exclusive discounts.
                        </p>
                    </div>
                </FadeInNew>
            </div>
        </section>
    );
};

export default Why;
