'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.branding}>
           <motion.div 
             className={styles.footerLogoContainer}
             whileHover={{ scale: 1.05 }}
           >
              <img src="/logo.png" alt="YTD Architects" className={styles.footerLogoImg} />
           </motion.div>
        </div>

        <div className={styles.mainGrid}>
           <div className={styles.infoCol}>
              <h3 className={styles.colTitle}>ADDRESS</h3>
              <p>DUBAI, UAE</p>
              <p>LOS ANGELES, USA</p>
           </div>
           
           <div className={styles.infoCol}>
              <h3 className={styles.colTitle}>CONNECT</h3>
              <p>+971 00 000 0000</p>
              <p>office@ytdarch.com</p>
           </div>

           <div className={styles.navCol}>
              <Link href="#projects" className={styles.footerLink}>PROJECTS</Link>
              <Link href="#process" className={styles.footerLink}>STAGES</Link>
              <Link href="#about" className={styles.footerLink}>ABOUT</Link>
              <Link href="#contacts" className={styles.footerLink}>CONTACT</Link>
           </div>
        </div>

        <div className={styles.bottomBar}>
           {/* <div className={styles.socialBar}>
              <a href="#" className={styles.socialIcon}>IG</a>
              <a href="#" className={styles.socialIcon}>BE</a>
              <a href="#" className={styles.socialIcon}>LI</a>
              <a href="#" className={styles.socialIcon}>PI</a>
           </div> */}

           <div className={styles.legal}>
              <span>© 2026 YTD ARCHITECTS</span>
              <span className={styles.dot}>•</span>
              <span>PRIVACY POLICY</span>
           </div>

           <button 
             onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
             className={styles.backToTop}
           >
              BACK TO TOP ↑
           </button>
        </div>
      </div>
      
      {/* Structural Decor */}
      <div className={styles.bgGlow}></div>
    </footer>
  );
}
