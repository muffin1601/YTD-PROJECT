'use client';

import { motion } from 'framer-motion';
import styles from './Marquee.module.css';

interface MarqueeProps {
  text: string;
  speed?: number;
  reverse?: boolean;
}

export default function Marquee({ text, speed = 20, reverse = false }: MarqueeProps) {
  return (
    <div className={styles.marquee}>
      <motion.div 
        className={styles.track}
        animate={{ x: reverse ? [0, -1000] : [-1000, 0] }}
        transition={{ 
          duration: speed, 
          repeat: Infinity, 
          ease: "linear" 
        }}
      >
        {[...Array(10)].map((_, i) => (
          <span key={i} className={styles.item}>{text}</span>
        ))}
      </motion.div>
    </div>
  );
}
