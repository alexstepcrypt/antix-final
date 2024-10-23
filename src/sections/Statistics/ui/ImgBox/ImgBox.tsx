import styles from "./ImgBox.module.scss";
import { StaticImageData } from "next/image";

type Props = {
    imgSrc: StaticImageData;
    style?: React.CSSProperties;
    className?: string;
    children?: React.ReactNode;
};

export const ImgBox: React.FC<Props> = (props) => {
    const { imgSrc, style, className, ...otherProps } = props;
    return (
        <div
            {...otherProps}
            className={`${styles.wrapper} ${className}`}
            style={{ ...style, backgroundImage: `url(${imgSrc.src})` }}
        />
    );
};
