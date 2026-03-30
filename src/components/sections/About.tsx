'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';
import styles from './About.module.css';

export default function About() {
  return (
    <section className={styles.root} id="about">
      
      {/* Background Fixed Marquee */}
      <div className={styles.marqueeContainer}>
        <motion.div 
          animate={{ x: ["-50%", "0%"] }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          className={styles.marqueeTrack}
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className={i % 2 === 0 ? styles.mOutline : styles.mFilled}>
              PHILOSOPHY
            </span>
          ))}
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i + 8} className={i % 2 === 0 ? styles.mOutline : styles.mFilled}>
              PHILOSOPHY
            </span>
          ))}
        </motion.div>
      </div>

      <div className={styles.header}>
        <span className={styles.premiumLabel}>Essence</span>
        <h2 className={styles.headline}>Our Studio Philosophy</h2>
      </div>

      <div className={styles.verticalList}>
        <AboutSectionCard 
          title="CRAFTING THE SYNERGY"
          subtitle="ARCHITECTURAL PURITY"
          desc="At YTD Architects, we don’t just build structures; we curate emotional landscapes that harmonize the human spirit with the environment."
          image="/2J3A7880-HDR.jpg"
          index={0}
        />
        <AboutSectionCard 
          title="TIMLESS DIALOGUE"
          subtitle="FORM & MATERIAL"
          desc="Our practice is dedicated to the pursuit of architectural purity and the creation of spaces that redefine light, form, and material."
          image="/2J3A7836-HDR.jpg"
          index={1}
        />
      </div>
    </section>
  );
}

function AboutSectionCard({ title, subtitle, desc, image, index }: { 
  title: string, 
  subtitle: string, 
  desc: string, 
  image: string,
  index: number 
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  const springProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // 3D Tilt Logic matching site-wide architectural signature
  const rotateX = useTransform(springProgress, [0, 0.5, 1], [30, 0, -30]);
  const rotateY = useTransform(springProgress, [0, 0.5, 1], index % 2 === 0 ? [-15, 0, 15] : [15, 0, -15]);
  const scale = useTransform(springProgress, [0, 0.5, 1], [0.85, 1, 0.85]);
  const opacity = useTransform(springProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  
  // Parallax for sub-elements
  const textY = useTransform(springProgress, [0, 1], [50, -50]);
  const imgY = useTransform(springProgress, [0, 1], ["-12%", "12%"]);

  return (
    <div ref={cardRef} className={styles.stepWrapper}>
      <motion.div 
        style={{ 
          opacity, 
          scale,
          rotateX,
          rotateY,
          perspective: 1200
        }} 
        className={styles.processCard}
      >
        <div className={styles.cardContent} style={{ flexDirection: index % 2 !== 0 ? 'row-reverse' : 'row' }}>
          
          <div className={styles.imageBox}>
             <motion.img 
               src={image} 
               alt={title} 
               className={styles.mainImg}
               style={{ y: imgY }}
             />
             <div className={styles.imageOverlay}></div>
             <span className={styles.stepNum}>0{index + 1}</span>
          </div>

          <motion.div style={{ y: textY }} className={styles.infoBox} style={{ textAlign: index % 2 !== 0 ? 'right' : 'left', alignItems: index % 2 !== 0 ? 'flex-end' : 'flex-start' }}>
             <span className={styles.subtitle}>{subtitle}</span>
             <h3 className={styles.title}>{title}</h3>
             <p className={styles.desc}>{desc}</p>
             
             <div className={styles.technicalDetail} style={{ justifyContent: index % 2 !== 0 ? 'flex-end' : 'flex-start' }}>
                <div className={styles.dot}></div>
                <div className={styles.line}></div>
             </div>
          </motion.div>

        </div>
      </motion.div>
    </div>
  );
}
