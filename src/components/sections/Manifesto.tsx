'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import styles from './Manifesto.module.css';

export default function Manifesto() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const x1 = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);
  const x3 = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.95]);

  return (
    <section ref={containerRef} className={styles.manifestoSection}>
      {/* Background Parallax Layers */}
      <div className={styles.layers}>
        <motion.div 
          style={{ x: x1 }}
          className={`${styles.layer} ${styles.layerOutline}`}
        >
          AESTHETIC • AESTHETIC
        </motion.div>
        <motion.div 
          style={{ x: x2 }}
          className={`${styles.layer} ${styles.layerSolid}`}
        >
          NATURE • NATURE • NATURE
        </motion.div>
        <motion.div 
          style={{ x: x3 }}
          className={`${styles.layer} ${styles.layerOutline}`}
        >
          INSPIRED • INSPIRED
        </motion.div>
      </div>

      <div className={styles.decorLine}></div>

      <div className={styles.container}>
        <motion.div 
          className={styles.mainContent}
          style={{ opacity, scale }}
        >
          <span className={styles.preTitle}>OUR CORE MANIFESTO</span>
          <h2 className={styles.mainHeading}>
            WE ARE IN FAVOR OF <br />
            <span className={styles.highlight}>AESTHETIC DESIGN</span> <br />
            <span className={styles.thin}>THAT IS INSPIRED BY</span> <br />
            <span className={styles.highlight}>NATURE</span>
          </h2>
          <p className={styles.description}>
            We believe that the external environment has the power to transform 
            the internal state, and that a well-designed space can become 
            a catalyst for clarity and balance.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
