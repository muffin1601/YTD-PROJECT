'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import styles from './Loader.module.css';

export default function Loader() {
  const [loading, setLoading] = useState(true);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const interval = 20; // update every 20ms
    const totalSteps = duration / interval;
    const increment = 100 / totalSteps;

    const timer = setInterval(() => {
      setCounter((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setLoading(false), 500);
          return 100;
        }
        return Math.min(prev + (Math.random() * 2), 100);
      });
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const columns = [0, 1, 2, 3, 4];

  return (
    <AnimatePresence>
      {loading && (
        <motion.div 
          className={styles.loader}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {/* Background Columns */}
          <div className={styles.columnsContainer}>
            {columns.map((i) => (
              <motion.div
                key={i}
                className={styles.column}
                exit={{ y: '-100%' }}
                transition={{ 
                  duration: 0.8, 
                  ease: [0.76, 0, 0.24, 1],
                  delay: 0.1 * i 
                }}
              />
            ))}
          </div>

          <div className={styles.centerContent}>
            <motion.div 
              className={styles.percentage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className={styles.number}>
                {Math.floor(counter).toString().padStart(3, '0')}
              </div>
              <div className={styles.label}>
                LOADING
              </div>
            </motion.div>
            
            <motion.div 
              className={styles.brand}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 1 }}
            >
              <img src="/logo.png" alt="NKEY LOGO" className={styles.loaderLogo} />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
