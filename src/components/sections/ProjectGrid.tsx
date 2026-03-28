'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';
import styles from './ProjectGrid.module.css';

const projects = [
  { 
    id: 1, 
    title1: 'MIRAGE', 
    title2: 'HOUSE', 
    location: 'UAE / 2024', 
    image: '/2J3A7704-HDR.jpg',
  },
  { 
    id: 2, 
    title1: 'ONYX', 
    title2: 'PAVILION', 
    location: 'UAE / 2025', 
    image: '/2J3A7776-HDR.jpg',
  },
  { 
    id: 3, 
    title1: 'GLACIER', 
    title2: 'RESIDENCE', 
    location: 'USA / 2025', 
    image: '/DSC_9276.jpg',
  },
  { 
    id: 4, 
    title1: 'ETHEREAL', 
    title2: 'LOFT', 
    location: 'USA / 2025', 
    image: '/DSC_9309.jpg',
  },
  { 
    id: 5, 
    title1: 'ZENITH', 
    title2: 'VILLA', 
    location: 'USA / 2024', 
    image: '/2J3A7836-HDR.jpg',
  },
  { 
    id: 6, 
    title1: 'NOCTURNAL', 
    title2: 'STUDIO', 
    location: 'USA / 2024', 
    image: '/2J3A7892-HDR.jpg',
  },
  { 
    id: 7, 
    title1: 'VERDANT', 
    title2: 'TOWER', 
    location: 'JORDAN / 2024', 
    image: '/2J3A7901 copy.jpg',
  },
  { 
    id: 8, 
    title1: 'AURORA', 
    title2: 'PENTHOUSE', 
    location: 'UAE / 2024', 
    image: '/2J3A8017 copy.jpg',
  },
];

export default function ProjectGrid() {
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

  const x = useTransform(smoothProgress, [0, 1], ["0%", "-90.5%"]);

  return (
    <section ref={containerRef} className={styles.projectSection} id="projects">
      <div className={styles.stickyContainer}>
        <div className={styles.backgroundText}>
          PROJECTS PROJECTS PROJECTS PROJECTS
        </div>
        
        <motion.div style={{ x }} className={styles.horizontalGrid}>
          {projects.map((project, idx) => (
            <div key={project.id} className={styles.projectCard}>
              <div className={styles.imageOverlay}></div>
              <img 
                src={project.image} 
                alt={project.title1} 
                className={styles.projectImage}
              />
              
              <div className={styles.projectInfo}>
                <span className={styles.projectLocation}>{project.location}</span>
                <h3 className={styles.projectTitle}>
                  <span className={styles.boldItalic}>{project.title1}</span>
                  <span className={styles.thin}>{project.title2}</span>
                </h3>
                <div className={styles.moreLink}>
                   EXPLORE PROJECT
                   <div className={styles.underline}></div>
                </div>
              </div>
              
              <div className={styles.projectNumber}>
                {(idx + 1).toString().padStart(2, '0')}
              </div>
            </div>
          ))}
          
          <div className={styles.viewMoreSlide}>
             <div className={styles.viewMoreContent}>
               <h2 className={styles.viewMoreTitle}>MORE PROJECTS</h2>
               <div className={styles.viewMoreCircle}>
                 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                 </svg>
               </div>
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
