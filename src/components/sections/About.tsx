'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';
import styles from './About.module.css';

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  const springProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Floating background elements
  const bgY = useTransform(springProgress, [0, 1], ["0%", "-20%"]);
  const bgScale = useTransform(springProgress, [0, 1], [1, 1.2]);
  
  // Staggered text movement
  const textX1 = useTransform(springProgress, [0, 0.5], ["0%", "-10%"]);
  const textX2 = useTransform(springProgress, [0.2, 0.7], ["0%", "15%"]);
  const textX3 = useTransform(springProgress, [0.4, 0.9], ["0%", "-5%"]);

  // Image reveal circle
  const imageClip = useTransform(springProgress, [0, 1], [" circle(20% at 50% 50%)", "circle(100% at 50% 50%)"]);
  const imageY = useTransform(springProgress, [0, 1], ["10%", "-10%"]);

  return (
    <section ref={sectionRef} className={styles.aboutSection}>
      <div className={styles.stickyContainer}>
        {/* Parallax Background Text */}
        <motion.div 
          style={{ y: bgY, scale: bgScale }} 
          className={styles.bgText}
        >
          PHILOSOPHY OUR PHILOSOPHY PHILOSOPHY
        </motion.div>
        
        <div className={styles.container}>
          <div className={styles.textContent}>
            <div className={styles.headLineWrapper}>
              <motion.div style={{ x: textX1 }} className={styles.line}>
                <h2 className={styles.lineText}>CRAFTING</h2>
              </motion.div>
              <motion.div style={{ x: textX2 }} className={styles.line}>
                <h2 className={styles.lineText}>THE</h2>
              </motion.div>
              <motion.div style={{ x: textX3 }} className={styles.line}>
                <h2 className={`${styles.lineText} ${styles.lineTextThin}`}>UNEXPECTED</h2>
              </motion.div>
              <motion.div style={{ x: textX1 }} className={styles.line}>
                <h2 className={styles.lineText}>SYNERGY</h2>
              </motion.div>
            </div>

            <div className={styles.bodyText}>
              <motion.p 
                className={styles.pLead}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2 }}
              >
                At YTD Architects, we don’t just build structures; we curate emotional landscapes that harmonize the human spirit with the environment.
              </motion.p>
              <motion.p className={styles.pSub}>
                Our practice is dedicated to the pursuit of architectural purity and the creation of timeless spaces that redefine the dialogue between light, form, and material.
              </motion.p>
            </div>
          </div>

          <div className={styles.imageRevealZone}>
            <motion.div 
              className={styles.imageMask}
              style={{ clipPath: imageClip }}
            >
              <motion.img 
                src="/2J3A7880-HDR.jpg" 
                alt="Portrait" 
                className={styles.aboutImg}
                style={{ y: imageY }}
              />
            </motion.div>
            
            <motion.div 
              className={styles.rotatingLabel}
              animate={{ rotate: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            >
              <svg viewBox="0 0 100 100" width="150" height="150">
                <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="transparent" />
                <text>
                  <textPath xlinkHref="#circlePath" className={styles.svgText}>
                    • YTD ARCHITECTS • DESIGN STUDIO •
                  </textPath>
                </text>
              </svg>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
