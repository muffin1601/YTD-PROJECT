"use client";

import { useScroll, useTransform, motion, useSpring } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import styles from "./ProjectGrid.module.css";

const projects = [
  {
    id: 1,
    title: "DESERT OASIS",
    category: "RESIDENTIAL",
    location: "DUBAI, UAE",
    image: "/2J3A7704-HDR.jpg",
    num: "01"
  },
  {
    id: 2,
    title: "THE MONOLITH",
    category: "COMMERCIAL",
    location: "ABU DHABI, UAE",
    image: "/2J3A7880-HDR.jpg",
    num: "02"
  },
  {
    id: 3,
    title: "SKY GARDEN",
    category: "HOSPITALITY",
    location: "DOHA, QATAR",
    image: "/DSC_9276.jpg",
    num: "03"
  }
];

export default function ProjectGrid() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section ref={containerRef} className={styles.projectSection} id="projects">
      {/* Background Marquee */}
      <div className={styles.marqueeContainer}>
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className={styles.marqueeTrack}
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className={i % 2 === 0 ? styles.mFilled : styles.mOutline}>
              PORTFOLIO
            </span>
          ))}
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i + 8} className={i % 2 === 0 ? styles.mFilled : styles.mOutline}>
              PORTFOLIO
            </span>
          ))}
        </motion.div>
      </div>

      <div className={styles.verticalList}>
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>

      <div className={styles.exploreAll}>
        <h2 className={styles.exploreBtn}>Explore All</h2>
        <motion.div 
           whileHover={{ scale: 1.1 }}
           whileTap={{ scale: 0.9 }}
           className={styles.exploreCircle}
        >
           <svg viewBox="0 0 100 100"><path d="M20 50h60M60 30l20 20-20 20" fill="none" stroke="currentColor" strokeWidth="2"/></svg>
        </motion.div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: typeof projects[0], index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  const springProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // 3D Tilt Signature Logic
  const rotateX = useTransform(springProgress, [0, 0.5, 1], [30, 0, -30]);
  const rotateY = useTransform(springProgress, [0, 0.5, 1], [-15, 0, 15]);
  const scale = useTransform(springProgress, [0, 0.5, 1], [0.85, 1, 0.85]);
  const opacity = useTransform(springProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  
  // Parallax for image inside card
  const imgY = useTransform(springProgress, [0, 1], ["-12%", "12%"]);
  // Separate parallax for text
  const textY = useTransform(springProgress, [0, 1], [80, -80]);

  return (
    <div className={styles.cardWrapper}>
      <motion.div 
        ref={cardRef}
        style={{ 
          opacity, 
          scale,
          rotateX,
          rotateY,
          perspective: 1200
        }} 
        className={styles.projectCard}
      >
        <div className={styles.cardContent}>
           {/* IMAGE IS NOW COMPLETELY CLEAR - NO TEXT ON TOP */}
           <div className={styles.imageBox}>
              <motion.img 
                src={project.image} 
                alt={project.title} 
                className={styles.projectImage}
                style={{ y: imgY }}
              />
              <div className={styles.imageOverlay}></div>
           </div>

           {/* TEXT IS NOW OUTSIDE (BELOW OR SIDE) */}
           <motion.div style={{ y: textY }} className={styles.projectInfo}>
              <span className={styles.projectLocation}>{project.location}</span>
              <h3 className={styles.projectTitle}>
                 <span className={styles.boldItalic}>{project.title}</span>
                 <span className={styles.thin}>{project.category}</span>
              </h3>
              <Link href={`/projects/${project.id}`} className={styles.moreLink}>
                 VIEW PROJECT
              </Link>
           </motion.div>
        </div>
        
        <span className={styles.projectNum}>{project.num}</span>
      </motion.div>
    </div>
  );
}
