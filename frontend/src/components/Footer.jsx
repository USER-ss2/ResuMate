import React from 'react';
import styles from "../styles/Footer.module.css";
import { FaFacebookF, FaEnvelope, FaPhoneAlt} from "react-icons/fa";

export const Footer = () => {
  return (
<footer className={styles.footer}>
<div className="wrapper">
      <div className="box">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  <div className={styles.footerContent}>
    <div className={styles.socials}>
      <a href="https://facebook.com" className={styles.socialIcon}>
        <FaFacebookF />
      </a>
      <a href="mailto:contact@resumate.com" className={styles.socialIcon}>
        <FaEnvelope />
      </a>
      <a href="tel:+21677777777" className={styles.socialIcon}>
        <FaPhoneAlt />
      </a>
    </div>
    <p className={styles.footerText}>
      © 2024 ResuMate. All Rights Reserved.
    </p>
  </div>
</footer>
  )
}

export default Footer;