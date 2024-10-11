import React from "react";
import styles from "./VideoModal.module.scss";

import CloseIcon from "@/public/svg/close-icon.svg";
import Image from "next/image";

interface VideoModalProps {
    videoUrl: string;
    onClose: React.Dispatch<React.SetStateAction<string>>;
}

const VideoModal: React.FC<VideoModalProps> = ({ videoUrl, onClose }) => {
    return (
        <>
            <div className={styles.bg} onClick={() => onClose("")} />
            <div className={styles.container}>
                <button
                    className={styles.closeButton}
                    onClick={() => onClose("")}
                >
                    Go back{" "}
                    <Image
                        src={CloseIcon.src}
                        alt="Close"
                        width={16}
                        height={16}
                    />
                </button>
                <div className={styles.videoWrapper}>
                    <iframe
                        width="100%"
                        height="100%"
                        src={videoUrl}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </div>
            </div>
        </>
    );
};

export default VideoModal;
