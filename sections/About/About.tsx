import React, { useState } from 'react';
import styles from './About.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/scss';
import 'swiper/scss/navigation';
import { Navigation } from 'swiper/modules';
import Image from 'next/image';

import Arrow from '@/public/svg/top-arrow.svg';
import { videos } from './data';
import AboutSlide from '@/components/AboutSlide/AboutSlide';
import VideoModal from '@/components/VideoModal/VideoModal';
import { useTranslation } from 'react-i18next';

type dropDownItemType = {
  title:string;
  followers:string
} 

const About = () => {
  const [openVideo, setOpenVideo] = useState('');
  const { t } = useTranslation('landing');
  const videosText = t('about.videos', { returnObjects: true }) as Array<dropDownItemType>;

  return (
    <section className={styles.about}>
      {openVideo && <VideoModal videoUrl={openVideo} onClose={setOpenVideo} />}
      <h3 className={styles.aboutTitle}>{t('about.title')}</h3>
      <div className={styles.aboutSlider}>
        <Swiper
          spaceBetween={32}
          slidesPerView={3}
          navigation={{
            nextEl: '#next-slide',
            prevEl: '#prev-slide',
          }}
          modules={[Navigation]}
          loop={true}
        >
          {videos.map((slide, index) => (
            <SwiperSlide
              className={styles.slideWrapper}
              key={`${slide.title}-${index}`}
            >
              <AboutSlide setOpenVideo={setOpenVideo} {...slide} title={videosText[index].title} followers={videosText[index].followers} />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className={styles.prevSlide} id="prev-slide">
          <Image src={Arrow} alt="Previous" width={20} height={10} />
        </div>
        <div className={styles.nextSlide} id="next-slide">
          <Image src={Arrow} alt="Next" width={20} height={10} />
        </div>
      </div>
    </section>
  );
};

export default About;
