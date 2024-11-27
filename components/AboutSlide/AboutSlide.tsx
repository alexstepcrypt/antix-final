import React from 'react';
import styles from './AboutSlide.module.scss';
import Image from 'next/image';
import { IVideos } from '@/sections/About/data';
import Play from '@/public/images/about/play.png';

interface AboutSlide extends IVideos {
  setOpenVideo: React.Dispatch<React.SetStateAction<string>>;
}

const AboutSlide: React.FC<AboutSlide> = ({
  title,
  preview,
  avatar,
  followers,
  link,
  setOpenVideo,
}) => {
  return (
    <div className={styles.slide} onClick={() => setOpenVideo(link)}>
      <div className={styles.previewWrapper}>
        <Image
          src={preview}
          alt={title}
          width={310}
          height={170}
          className={styles.preview}
        />
        <div className={styles.play}>
          <Image
            src={Play}
            alt={title}
            width={20}
            height={20}
            className={styles.preview}
          />
        </div>
      </div>
      <div className={styles.titleWrapper}>
        <Image
          src={avatar}
          alt={title}
          width={28}
          height={28}
          className={styles.avatar}
        />
        <h4 className={styles.title}>{title}</h4>
      </div>
      <p className={styles.followers}>{followers}</p>
    </div>
  );
};

export default AboutSlide;
