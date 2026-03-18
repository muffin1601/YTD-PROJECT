'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import styles from './CustomCursor.module.css';

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState('');

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 200 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = target.closest('a, button, [data-cursor]');
      setIsHovering(!!isClickable);

      if (target.closest('[data-cursor-text]')) {
        setCursorText(target.closest('[data-cursor-text]')?.getAttribute('data-cursor-text') || '');
      } else {
        setCursorText('');
      }
    };

    window.addEventListener('mousemove', moveMouse);
    window.addEventListener('mouseover', handleHover);

    return () => {
      window.removeEventListener('mousemove', moveMouse);
      window.removeEventListener('mouseover', handleHover);
    };
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className={styles.cursor}
      style={{
        left: cursorX,
        top: cursorY,
      }}
      animate={{
        scale: isHovering ? 2.5 : 1,
        backgroundColor: isHovering ? 'rgba(198, 166, 103, 0.4)' : 'rgba(255, 255, 255, 0.3)',
      }}
    >
      {cursorText && <span className={styles.cursorText}>{cursorText}</span>}
    </motion.div>
  );
}
