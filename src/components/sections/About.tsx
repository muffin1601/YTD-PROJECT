'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';
import styles from './About.module.css';

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const springProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 20 });

  const numOpacity = useTransform(springProgress, [0, 0.2, 0.5], [0, 0.05, 0.02]);
  const numScale = useTransform(springProgress, [0, 0.5], [0.8, 1.1]);
  const imageScale = useTransform(springProgress, [0, 0.5], [1.2, 1]);
  const clipWidth = useTransform(springProgress, [0.1, 0.4], ["20%", "100%"]);
  
  // Link lines to start appearing as soon as section enters
  const lineY = useTransform(springProgress, [0.1, 0.4], ["100%", "0%"]);
  const lineOpacity = useTransform(springProgress, [0.1, 0.3], [0, 1]);

  const lines = [
    { text: "10 YEARS", type: "bold" },
    { text: "EXPERIENCE", type: "bold" },
    { text: "IN COMBINATION", type: "thin" },
    { text: "WITH", type: "thin" },
    { text: "A PERFECT", type: "bold" },
    { text: "TASTE", type: "bold" }
  ];

  return (
    <section ref={sectionRef} className={styles.aboutSection}>
      <motion.div style={{ opacity: numOpacity, scale: numScale }} className={styles.bgNumber}>10</motion.div>
      
      <div className={styles.container}>
        <div className={styles.textContent}>
           <div className={styles.headLineWrapper}>
              {lines.map((line, i) => (
                <div key={i} className={styles.line}>
                   <motion.h2 
                     className={`${styles.lineText} ${line.type === 'thin' ? styles.lineTextThin : ''}`}
                     style={{ y: lineY, opacity: lineOpacity }}
                   >
                     {line.text}
                   </motion.h2>
                </div>
              ))}
           </div>

           <div className={styles.bodyText}>
              <motion.p 
                className={styles.pLead}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                 Our mission goes beyond creating aesthetically refined spaces.
              </motion.p>
              <motion.p 
                className={styles.pSub}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.7 }}
              >
                 Through design, we help individuals uncover and express their inner world — 
                 their character, values, and unspoken desires.
              </motion.p>
           </div>
        </div>

        <div className={styles.imageContainer}>
           <motion.div 
             className={styles.imageFrame}
             style={{ width: clipWidth }}
           >
              <motion.img 
                src="/2J3A7880-HDR.jpg" 
                alt="Architect" 
                className={styles.portraitImage}
                style={{ scale: imageScale }}
              />
           </motion.div>
           <div className={styles.decorLine}></div>
           
           <motion.div 
             className={styles.contactBadge}
             animate={{ rotate: 360 }}
             transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
           >
              <span className={styles.contactBadgeText}>
                 YTD • CONTACT • YTD •
              </span>
           </motion.div>
        </div>
      </div>
    </section>
  );
}
