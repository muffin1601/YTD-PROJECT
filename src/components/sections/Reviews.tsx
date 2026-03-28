'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';
import styles from './Reviews.module.css';

const reviews = [
  {
    id: 1,
    name: 'MARCUS CHEN',
    location: 'DUBAI, UAE',
    text: "YTD Architects transformed our industrial shell into a living sanctuary. Their attention to structural rhythm is unparalleled.",
    image: '/2J3A7704-HDR.jpg'
  },
  {
    id: 2,
    name: 'SARA AL-SAYED',
    location: 'ABU DHABI, UAE',
    text: "The most professional design journey I've experienced. From first sketch to final delivery, the team was flawless.",
    image: '/2J3A7836-HDR.jpg'
  },
  {
    id: 3,
    name: 'OLIVER KNIGHT',
    location: 'NEW YORK, USA',
    text: "Their ability to blend sustainable materials with ultra-luxury aesthetics is what sets them apart in the global market.",
    image: '/DSC_9276.jpg'
  }
];

export default function Reviews() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const springProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Floating background Typography
  const bgX = useTransform(springProgress, [0, 1], ["0%", "-50%"]);

  return (
    <section ref={containerRef} className={styles.reviewsSection} id="reviews">
      <div className={styles.stickyContainer}>
        <motion.div style={{ x: bgX }} className={styles.bgText}>
          REVIEWS CLIENTS REVIEWS CLIENTS
        </motion.div>

        <div className={styles.header}>
           <span className={styles.subtitle}>04 / TESTIMONIALS</span>
           <h2 className={styles.title}>EVERY DETAIL</h2>
           <h2 className={`${styles.title} ${styles.accent}`}>MATTERS</h2>
        </div>

        <div className={styles.slidesWrapper}>
           {reviews.map((review, i) => (
             <ReviewMaskSlide 
                key={review.id} 
                review={review} 
                index={i} 
                total={reviews.length} 
                progress={springProgress} 
             />
           ))}
        </div>
      </div>
    </section>
  );
}

function ReviewMaskSlide({ review, index, total, progress }: { 
  review: typeof reviews[0], 
  index: number, 
  total: number, 
  progress: any 
}) {
  const start = index / total;
  const end = (index + 1) / total;
  
  // Match the Circle reveal style of Section 4 (About)
  const clipPath = useTransform(progress, [start, start + 0.1, end - 0.1, end], [
    "circle(0% at 50% 50%)", 
    "circle(100% at 50% 50%)", 
    "circle(100% at 50% 50%)", 
    "circle(0% at 50% 50%)"
  ]);

  const scale = useTransform(progress, [start, end], [1.2, 1]);
  const textX = useTransform(progress, [start, start + 0.2], [100, 0]);
  const textOpacity = useTransform(progress, [start, start + 0.1, end - 0.1, end], [0, 1, 1, 0]);

  return (
    <motion.div 
      className={styles.maskSlide}
      style={{ clipPath }}
    >
      <motion.img 
        src={review.image} 
        alt="Project reveal" 
        className={styles.bgImg} 
        style={{ scale }}
      />
      <div className={styles.overlay}></div>

      <motion.div 
        style={{ x: textX, opacity: textOpacity }} 
        className={styles.textContainer}
      >
         <div className={styles.quoteMark}>“</div>
         <p className={styles.reviewText}>{review.text}</p>
         <div className={styles.authorBadge}>
            <div className={styles.badgeLine}></div>
            <h4 className={styles.authorName}>{review.name}</h4>
         </div>
      </motion.div>
    </motion.div>
  );
}
