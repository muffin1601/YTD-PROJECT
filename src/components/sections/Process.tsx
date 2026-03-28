'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';
import styles from './Process.module.css';

const processSteps = [
  {
    id: '01',
    title: 'CONCEPT',
    desc: 'Every masterpiece begins with a deep exploration of space, context, and the client\'s unique aspirations.',
    image: '/2J3A7901 copy.jpg'
  },
  {
    id: '02',
    title: 'DESIGN',
    desc: 'We translate abstract ideas into precise architectural diagrams and functional layouts that define the soul of the project.',
    image: '/SOFA WALL.jpg (2).jpeg'
  },
  {
    id: '03',
    title: 'CRAFTING',
    desc: 'Experience the future through hyper-realistic digital twin visualizations for each interior and structural element.',
    image: '/Picture10.jpg'
  },
  {
    id: '04',
    title: 'DELIVERY',
    desc: 'A comprehensive architectural portfolio containing technical blueprints and final visualizations is finalized for execution.',
    image: '/Picture8.jpg'
  }
];

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Diagonal movement: both X and Y
  const x = useTransform(smoothProgress, [0, 1], ["30%", "-80%"]);
  const y = useTransform(smoothProgress, [0, 1], ["30%", "-80%"]);
  const bgX = useTransform(smoothProgress, [0, 1], ["0%", "-40%"]);

  return (
    <section ref={containerRef} className={styles.processSection} id="process">
      <div className={styles.stickyContainer}>
        <motion.div style={{ x: bgX }} className={styles.bgTextDecor}>
          STAGES WORK STAGES WORK STAGES WORK
        </motion.div>

        <div className={styles.header}>
            <span className={styles.subtitle}>
              STAGES OF WORK
            </span>
            <div className={styles.titleWrapper}>
              <h2 className={styles.title}>ARCHITECTURE, THAT</h2>
              <h2 className={`${styles.title} ${styles.titleRight}`}>REDEFINES LIVING</h2>
            </div>
        </div>

        <div className={styles.diagonalWrapper}>
          <motion.div style={{ x, y }} className={styles.processList}>
            {processSteps.map((step, idx) => (
              <div key={step.id} className={styles.processCard}>
                 <div className={styles.cardHeader}>
                    <span className={styles.cardIndex}>{step.id}</span>
                    <h3 className={styles.cardTitle}>{step.title}</h3>
                 </div>
                 <div className={styles.cardImageContainer}>
                    <img src={step.image} alt={step.title} className={styles.cardImage} />
                 </div>
                 <p className={styles.cardDesc}>{step.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* <div className={styles.diamondBadge}>
          <div className={styles.diamondText}>
             <span>FREE</span>
             <span>3D TOUR</span>
          </div>
        </div> */}
      </div>
    </section>
  );
}
