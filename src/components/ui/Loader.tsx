'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import styles from './Loader.module.css';

export default function Loader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 2800;
    const interval = 20;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = Math.min(prev + Math.random() * 4, 100);
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => setLoading(false), 800);
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
            opacity: 0,
            scale: 1.1,
            transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
          }}
        >
          {/* MINIMAL GRID ARCHITECTURE */}
          <div className={styles.gridOverlay}>
             <motion.div 
               className={styles.gridLineH} 
               animate={{ scaleX: 1 }} 
               initial={{ scaleX: 0 }} 
               transition={{ duration: 1.5 }}
             />
             <motion.div 
               className={styles.gridLineV} 
               animate={{ scaleY: 1 }} 
               initial={{ scaleY: 0 }} 
               transition={{ duration: 1.5 }}
             />
          </div>

          <div className={styles.contentWrap}>
            {/* ONLY LOGO - PINNED CENTER */}
            <motion.div 
              style={{ scale: 0.8 + (progress / 500) }}
              className={styles.logoWrap}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2 }}
            >
              <img src="/logo.png" alt="YTD" className={styles.logo} />
            </motion.div>
          </div>

          {/* MINIMAL PROGRESS LINE (CENTER ONLY) */}
          <div className={styles.centerProgressBox}>
             <motion.div 
                className={styles.centerProgressBar} 
                style={{ scaleX: progress / 100 }}
             />
          </div>

          {/* EDGE PROGRESS LINES */}
          <motion.div 
            className={styles.edgeBarTop} 
            style={{ scaleX: progress / 100 }}
          />
          <motion.div 
             className={styles.edgeBarBottom} 
             style={{ scaleX: progress / 100 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
