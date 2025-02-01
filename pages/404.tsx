import React, { useState, useEffect } from "react";
import styles from "./404.module.scss";
import LogoFull from "../public/svg/404/Logo.svg";
import LogoPhone from "../public/svg/404/LogoPhone.svg";
import Image from "next/image";
import Link from "next/link"; 

const Custom404: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 480);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={styles.notFound}>
      <Image src={isMobile ? LogoPhone : LogoFull} alt="Antix Logo" className={styles.logo} />
      <div className={styles.content}>
        <h1 className={styles.title}>Not found (404)</h1>
        <p className={styles.subtitle}>Sorry, the page you are looking for does not exist.</p>
        <Link href="/" className={styles.button}>Go back to the Antix homepage</Link>
      </div>
    </div>
  );
};

export default Custom404;