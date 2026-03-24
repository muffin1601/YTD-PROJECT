'use client';

import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.topSection}>
          <div className={styles.leftTitle}>
            <h2>ARE YOU READY<br/>FOR THE NEW ?</h2>
          </div>
          <div className={styles.infoColumns}>
            <div className={styles.col}>
              <h3>OFFICES</h3>
              <ul>
                <li>Dubai, UAE</li>
                <li>Los Angeles, USA</li>
                <li>Kyiv, Ukraine</li>
                <li>Montreal, Canada</li>
              </ul>
            </div>
            <div className={styles.col}>
              <h3>PHONES</h3>
              <ul>
                <li>+971 5018 77644</li>
                <li>+1 916 516 47 31</li>
                <li>+380 98 080 77 07</li>
                <li>+1 4384053284</li>
              </ul>
            </div>
            <div className={styles.col}>
              <h3>E-MAIL</h3>
              <ul>
                <li>office@nkeyarchitects.com</li>
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.bottomSection}>
          <div className={styles.navLinks}>
            <Link href="#projects">PROJECTS</Link>
            <Link href="#services">SERVICES</Link>
            <Link href="#about">ABOUT US</Link>
            <Link href="#careers">CAREERS</Link>
            <Link href="#contacts">CONTACTS</Link>
          </div>
          <div className={styles.socials}>
            <a href="#">f</a>
            <a href="#" className={styles.iconLink}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a href="#">P</a>
            <a href="#">Bē</a>
            <a href="#" className={styles.iconLink}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
              </svg>
            </a>
            <a href="#">in</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
