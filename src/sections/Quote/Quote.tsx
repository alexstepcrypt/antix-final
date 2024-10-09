import Image from "next/image";
import styles from "./Quote.module.scss";
import Avatar1 from "@/public/images/quote-1.png";
import Dots from "@/public/svg/quote-dots.svg";
import Bg from "@/public/images/quote-bg.png"

const Quote = () => {
    return (
        <div className={styles.container} style={{backgroundImage: `url(${Bg.src})`}}>
            <div className={styles.content}>
                <Image src={Dots} alt="" />
                <div className={styles.infoWrapper}>
                    <p className={styles.quoteText}>
                        Thats not an issue that everyone will own their digital
                        twin in upcoming years. The question is how we will
                        manage their rights?
                    </p>
                    <span className={styles.quoteAuthor}>Alan Kepler</span>
                </div>
                <div className={styles.quoteImage}>
                    <Image src={Avatar1} alt={""} />
                    <span>@lilmiquela</span>
                </div>
            </div>
        </div>
    );
};

export default Quote;
