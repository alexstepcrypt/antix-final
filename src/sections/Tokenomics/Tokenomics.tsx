import Image from "next/image";
import styles from "./Tokenomics.module.scss";
import DonutChart from "@/components/DonutChart/DonutChart";

import Bg from "@/public/images/tokenomics-bg.png";
import TokenomicsLabel from "@/public/images/tokenomics-labels.png"

const Tokenomics = () => {
    return (
        <section
            className={styles.container}
            style={{ backgroundImage: `url(${Bg.src})` }}
        >
            <h4 className={styles.title}>Tokenomics</h4>
            <div className={styles.chartWrapper}>
                <div className={styles.innerChartText}>
                    <span>1B</span>
                    Tokens
                </div>
                <DonutChart  />
                <div className={styles.bg}>
                    <Image src={TokenomicsLabel} alt="Labels" draggable={false} />
                </div>
            </div>
        </section>
    );
};

export default Tokenomics;
