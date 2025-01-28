import React, { useEffect, useRef } from 'react';
import styles from './NY.module.scss';
import Image from 'next/image';


export default function NYModal() {

  const modalRef = useRef(null);

  useEffect(() => {
    if (modalRef.current) {
      // @ts-ignore
      modalRef.current.showModal();
    }
  }, []);

  function handleClose() {
    // @ts-ignore
    modalRef.current.close();
  }


  return <dialog ref={modalRef} className={styles.nymodal}><section>
    <button className={styles.close} onClick={handleClose}></button>
    <h2>Happy Lunar New Year!</h2>
    <p>Let’s make this Lunar New Year special!</p>
    <p className={styles.big}>
      For a few days only, at the start of <b>Stage 6</b>, get <b>bonus tokens</b> with every purchase.
    </p>
    <p>How many? That’s a secret. Buy now and find out!</p>

    <button onClick={handleClose}>Buy now</button>
  </section></dialog>
};

