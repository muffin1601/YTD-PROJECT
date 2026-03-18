'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import styles from './Loader.module.css';

export default function Loader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 2800;
    const interval = 30;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = Math.min(prev + Math.random() * 2, 100);
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => setLoading(false), 900);
          return 100;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className={styles.loader}
          exit={{ 
            y: '-100%',
            transition: { duration: 1, ease: [0.76, 0, 0.24, 1] }
          }}
        >
          {/* Radial ambient glow */}
          <div className={styles.ambientGlow} />

          {/* Logo */}
          <motion.div
            className={styles.logoWrap}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <img src="/logo.png" alt="YTD Architects" className={styles.logo} />

            {/* Thin separator line */}
            <motion.div
              className={styles.sep}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            />

            {/* Tagline */}
            <motion.span
              className={styles.tagline}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.4, delay: 0.9 }}
            >
              DESIGN & ARCHITECTURE STUDIO
            </motion.span>
          </motion.div>

          {/* Progress line at bottom */}
          <div className={styles.progressWrap}>
            <motion.div
              className={styles.progressLine}
              style={{ scaleX: progress / 100, transformOrigin: 'left' }}
            />
          </div>

          {/* Counter — subtle, bottom right */}
          <motion.span
            className={styles.counter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 0.5 }}
          >
            {Math.floor(progress).toString().padStart(2, '0')}%
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
