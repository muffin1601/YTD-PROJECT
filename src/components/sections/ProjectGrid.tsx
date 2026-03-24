'use client';

import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useRef } from 'react';
import styles from './ProjectGrid.module.css';

const projects = [
  { 
    id: 1, 
    title1: 'ZENITH', 
    title2: 'GROVE', 
    location: 'INDIA / 2025', 
    image: '/project1.png',
  },
  { 
    id: 2, 
    title1: 'NOIR', 
    title2: 'NEST', 
    location: 'USA / 2025', 
    image: '/project2.png',
  },
  { 
    id: 3, 
    title1: 'VILLA', 
    title2: 'CASCADE', 
    location: 'UAE / 2024', 
    image: '/project3.png',
  },
  { 
    id: 4, 
    title1: 'EXQUISITE', 
    title2: 'RESIDENCE', 
    location: 'UAE / 2023', 
    image: '/project4.png',
  },
];

export default function ProjectGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [-200, 200]);

  return (
    <section ref={containerRef} className={styles.projectSection} id="projects">
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerTitle}>
            <span className={styles.subtitle}>Curated Works</span>
            <div className={styles.titleWrapper}>
              <motion.h2 
                initial={{ x: -100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className={styles.title}
              >
                SELECTED
              </motion.h2>
              <motion.h2 
                initial={{ x: 100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                className={`${styles.title} ${styles.titleRight}`}
              >
                PROJECTS
              </motion.h2>
            </div>
          </div>
          <p className={styles.headerDesc}>
            Exploring the intersection of geometry, light, and natural materials to create timeless architectural narratives.
          </p>
        </div>

        <div className={styles.grid}>
          {projects.map((project, idx) => (
            <ProjectCard key={project.id} project={project} index={idx} />
          ))}
        </div>
      </div>

      {/* Background Decorative Element */}
      <motion.div 
        className={styles.bgDecoration}
        style={{ y: bgY }}
      >
        PROJECTS
      </motion.div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: typeof projects[0], index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  // Mouse tilt variables
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [0, 1], [7, -7]);
  const rotateY = useTransform(mouseXSpring, [0, 1], [-7, 7]);

  const scrollRotateX = useTransform(scrollYProgress, [0, 0.4, 1], [30, 0, -10]);
  const scrollRotateY = useTransform(scrollYProgress, [0, 0.4, 1], [index % 2 === 0 ? -15 : 15, 0, index % 2 === 0 ? 5 : -5]);
  const scrollZ = useTransform(scrollYProgress, [0, 0.4, 1], [-100, 0, -50]);
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scrollScale = useTransform(scrollYProgress, [0, 0.4], [0.8, 1]);

  const imgY = useTransform(scrollYProgress, [0, 1], [-80, 80]);
  const textY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (rect) {
      const width = rect.width;
      const height = rect.height;
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      x.set(mouseX / width);
      y.set(mouseY / height);
    }
  }

  function handleMouseLeave() {
    x.set(0.5);
    y.set(0.5);
  }

  return (
    <motion.div 
      ref={cardRef}
      className={`${styles.card} ${index % 2 === 1 ? styles.cardOffset : ''}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      style={{ 
        rotateX: scrollRotateX, 
        rotateY: scrollRotateY,
        z: scrollZ,
        scale: scrollScale,
        opacity: scrollOpacity,
        perspective: 2000,
        transformStyle: "preserve-3d"
      }}
    >
      <div className={styles.imageWrapper}>
        <motion.img 
          src={project.image} 
          alt={project.title1} 
          className={styles.image}
          style={{ y: imgY, scale: 1.15 }}
        />
        <div className={styles.overlay}></div>
        
        <div className={styles.cardContent}>
          <span className={styles.location}>{project.location}</span>
          <motion.h3 className={styles.cardTitle} style={{ y: textY }}>
            <span className={styles.titleLine1}>{project.title1}</span>
            <span className={styles.titleLine2}>{project.title2}</span>
          </motion.h3>
        </div>
      </div>
      
      <div className={styles.cardFooter}>
        <div className={styles.viewLink}>
          EXPLORE PROJECT
          <div className={styles.underline}></div>
        </div>
        <div className={styles.cardNumber}>
          {(index + 1).toString().padStart(2, '0')}
        </div>
      </div>
    </motion.div>
  );
}
