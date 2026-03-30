"use client";

import { useScroll, useTransform, motion, useSpring } from "framer-motion";
import { useRef } from "react";
import styles from "./Process.module.css";

const processSteps = [
  {
    id: "01",
    title: "CONCEPT",
    subtitle: "CONCEPT & VISION",
    desc: "Every masterpiece begins with a deep exploration of space, context, and the client's unique aspirations.",
    image: "/2J3A7901 copy.jpg",
  },
  {
    id: "02",
    title: "DESIGN",
    subtitle: "DESIGN & DEVELOPMENT",
    desc: "We translate abstract ideas into precise architectural diagrams and functional layouts that define the soul of the project.",
    image: "/SOFA WALL.jpg (2).jpeg",
  },
  {
    id: "03",
    title: "CRAFTING",
    subtitle: "DIGITAL VISUALIZATION",
    desc: "Experience the future through hyper-realistic digital twin visualizations for each interior and structural element.",
    image: "/Picture10.jpg",
  },
  {
    id: "04",
    title: "DELIVERY",
    subtitle: "PORTFOLIO DELIVERY",
    desc: "A comprehensive architectural portfolio containing technical blueprints and final visualizations is finalized for execution.",
    image: "/Picture8.jpg",
  },
];

export default function Process() {
  return (
    <section className={styles.root} id="process">
      {/* Immersive Background Marquee */}
      <div className={styles.marqueeContainer}>
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
          className={styles.marqueeTrack}
        >
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i} className={i % 2 === 0 ? styles.mFilled : styles.mOutline}>
              PROCESS
            </span>
          ))}
          {/* Duplicate for seamless loop */}
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i + 10} className={i % 2 === 0 ? styles.mFilled : styles.mOutline}>
              PROCESS
            </span>
          ))}
        </motion.div>
      </div>

      <div className={styles.header}>
        <span className={styles.premiumLabel}>Methodology</span>
        <h2 className={styles.headline}>The Creative Process</h2>
      </div>

      <div className={styles.verticalList}>
        {processSteps.map((step, i) => (
          <ProcessStep 
            key={step.id} 
            step={step} 
            index={i} 
          />
        ))}
      </div>
    </section>
  );
}

function ProcessStep({ step, index }: { 
  step: typeof processSteps[0], 
  index: number 
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  const springProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Increased 3D Tilt and Extreme Perspective
  const rotateX = useTransform(springProgress, [0, 0.5, 1], [45, 0, -45]);
  const rotateY = useTransform(springProgress, [0, 0.5, 1], [-20, 0, 20]);
  const scale = useTransform(springProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const opacity = useTransform(springProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  
  // High-end parallax offsets
  const imgY = useTransform(springProgress, [0, 1], ["-15%", "15%"]);
  const textY = useTransform(springProgress, [0, 1], [50, -50]);

  return (
    <div ref={cardRef} className={styles.stepWrapper}>
      <motion.div 
        style={{ 
          opacity, 
          scale,
          rotateX,
          rotateY,
          perspective: 800 /* More extreme 3D depth */
        }} 
        className={styles.processCard}
      >
        <div className={styles.cardContent}>
          
          <div className={styles.imageBox}>
             <motion.img 
               src={step.image} 
               alt={step.title} 
               className={styles.mainImg}
               style={{ y: imgY }}
             />
             <div className={styles.imageOverlay}></div>
             <span className={styles.stepNum}>0{index + 1}</span>
          </div>

          <motion.div style={{ y: textY }} className={styles.infoBox}>
             <span className={styles.subtitle}>{step.subtitle}</span>
             <h3 className={styles.title}>{step.title}</h3>
             <p className={styles.desc}>{step.desc}</p>
             <div className={styles.technicalDetail}>
                <div className={styles.dot}></div>
                <div className={styles.line}></div>
             </div>
          </motion.div>

        </div>
      </motion.div>
    </div>
  );
}
