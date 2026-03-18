'use client';

import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useRef } from 'react';
import styles from './Process.module.css';

const processSteps = [
  {
    id: '01',
    title: 'START',
    desc: 'We start by studying your project, taking all needed measurements and choosing style for it.',
    image: '/2J3A7880-HDR.jpg'
  },
  {
    id: '02',
    title: 'PLAN',
    desc: 'Then, we process a point-by-point plan and present several examples for you.',
    image: '/2J3A7892-HDR.jpg'
  },
  {
    id: '03',
    title: 'VISUALIZATION',
    desc: 'At this stage we create detailed visualization for each room to provide you with an overall picture.',
    image: '/DSC_9276.jpg'
  },
  {
    id: '04',
    title: 'ALBUM',
    desc: 'The design project album with all plans and visualizations is ready.',
    image: '/BED WALL.jpg.jpeg'
  }
];

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scrollY1 = useTransform(scrollYProgress, [0, 1], [-150, 150]);
  const scrollY2 = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const titleX = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section ref={containerRef} className={styles.processSection} id="process">
     
      <div className={styles.bgTitleContainer}>
        <motion.h2 
          style={{ x: titleX }}
          className={styles.bgTitle}
        >
          OUR PROCESS • OUR PROCESS
        </motion.h2>
      </div>

      <div className={styles.decorLines}>
        <motion.div 
          className={styles.diagonalLine}
          style={{ y: scrollY1 }}
          initial={{ scaleY: 0, opacity: 0 }}
          whileInView={{ scaleY: 1, opacity: 0.1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        ></motion.div>
        <motion.div 
          className={styles.diagonalLine}
          style={{ y: scrollY2 }}
          initial={{ scaleY: 0, opacity: 0 }}
          whileInView={{ scaleY: 1, opacity: 0.1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        ></motion.div>
      </div>

      <div className={styles.container}>
        <div className={styles.grid}>
          {processSteps.map((step, idx) => (
            <ProcessCard key={step.id} step={step} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessCard({ step, idx }: { step: typeof processSteps[0], idx: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });


  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [0, 1], [10, -10]);
  const rotateY = useTransform(mouseXSpring, [0, 1], [-10, 10]);


  const scrollRotateX = useTransform(scrollYProgress, [0, 1], [5, -5]);
  const scrollRotateZ = useTransform(scrollYProgress, [0, 1], [idx % 2 === 0 ? -2 : 2, idx % 2 === 0 ? 2 : -2]);

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
      className={`${styles.card} ${styles[`card-${idx + 1}`]}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50, rotateX: 20 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 1.2, 
        ease: [0.16, 1, 0.3, 1],
        delay: idx * 0.1
      }}
      style={{
        rotateX: rotateX,
        rotateY: rotateY,
        rotateZ: scrollRotateZ,
        perspective: 1500,
        transformStyle: "preserve-3d"
      }}
    >
      {/* Background image that reveals on hover */}
      <div 
        className={styles.cardBgImage}
        style={{ backgroundImage: `url(${step.image})` }}
      />

      <div className={styles.cardHeader} style={{ transform: "translateZ(50px)" }}>
        <h3 className={styles.stepTitle}>
          {step.title}
        </h3>
        <span className={styles.stepNumber}>{step.id}</span>
      </div>
      
      <div className={styles.cardContent} style={{ transform: "translateZ(30px)" }}>
        <p className={styles.stepDesc}>{step.desc}</p>
      </div>

      <motion.div 
        className={styles.cardDiagonal}
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, delay: 0.5 + idx * 0.1 }}
      ></motion.div>
    </motion.div>
  );
}
