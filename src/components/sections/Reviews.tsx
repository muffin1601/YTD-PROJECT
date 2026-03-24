'use client';

import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import styles from './Reviews.module.css';

const reviews = [
  {
    id: 1,
    name: 'John',
    text: "The studio's systematic approach and exceptional organization exceeded my expectations. They were attentive to every detail, ensuring nothing was overlooked. The final project reflects a perfect blend of style and function.",
    stars: 5,
  },
  {
    id: 2,
    name: 'Ahmed',
    text: "This team knows how to make things happen! Their organizational skills and methodical approach ensured a smooth process, and their ability to focus on the smallest details made the transition from concept to reality effortless.",
    stars: 5,
  },
  {
    id: 3,
    name: 'Elena',
    text: "A truly visionary team. They took our vague ideas and transformed them into a coherent, stunning architectural masterpiece. Their dedication to quality and professional execution is unmatched in the industry.",
    stars: 5,
  }
];

export default function Reviews() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <section className={styles.reviewsSection} id="reviews">
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <motion.h2 
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className={styles.title}
          >
            CUSTOMER
          </motion.h2>
          <motion.h2 
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className={`${styles.title} ${styles.titleRight}`}
          >
            REVIEWS
          </motion.h2>
        </div>

        <div className={styles.carouselContainer}>
          <div className={styles.cardsWrapper}>
            <div className={styles.cardsGrid}>
              {[0, 1].map((offset) => {
                const index = (currentIndex + offset) % reviews.length;
                const review = reviews[index];
                return (
                  <ReviewCard 
                    key={`${review.id}-${index}`}
                    review={review}
                    index={index}
                  />

                );
              })}
            </div>
          </div>
        </div>

        <div className={styles.navSection}>
          <div className={styles.pagination}>
            {reviews.map((_, i) => (
              <div 
                key={i} 
                className={`${styles.dot} ${currentIndex === i ? styles.active : ''}`}
                onClick={() => setCurrentIndex(i)}
              />
            ))}
          </div>

          <div className={styles.controls}>
             <button className={styles.navBtn} onClick={prevReview} aria-label="Previous review">
               <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                 <path d="M15 18l-6-6 6-6" />
               </svg>
             </button>
             <button className={styles.navBtn} onClick={nextReview} aria-label="Next review" style={{ marginLeft: '-1px' }}>
               <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                 <path d="M9 18l6-6-6-6" />
               </svg>
             </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function ReviewCard({ review, index }: { review: typeof reviews[0], index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  const scrollRotateX = useTransform(scrollYProgress, [0, 0.4, 1], [15, 0, -10]);
  const scrollRotateY = useTransform(scrollYProgress, [0, 0.4, 1], [index % 2 === 0 ? -10 : 10, 0, index % 2 === 0 ? 5 : -5]);
  const scrollZ = useTransform(scrollYProgress, [0, 0.4, 1], [-50, 0, -30]);
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <motion.div 
      ref={cardRef}
      className={styles.reviewCard}
      style={{
        rotateX: scrollRotateX,
        rotateY: scrollRotateY,
        z: scrollZ,
        opacity: scrollOpacity,
        perspective: 2000,
        transformStyle: "preserve-3d"
      }}
    >
      <div className={styles.cardHeader}>
        <h3 className={styles.reviewerName}>{review.name}</h3>
      </div>
      <div className={styles.cardBody}>
        <p className={styles.reviewText}>{review.text}</p>
        <button className={styles.readMore}>
          READ FULL STORY
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
             <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      <div className={styles.cardFooter}>
        <div className={styles.stars}>
          {[...Array(review.stars)].map((_, i) => (
            <span key={i} className={styles.star}>★</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
