'use client';

import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { useRef } from 'react';
import styles from './Contact.module.css';

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-500, 500], [10, -10]), { stiffness: 100, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-500, 500], [-10, 10]), { stiffness: 100, damping: 20 });

  function handleMouseMove(e: React.MouseEvent) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      x.set(e.clientX - centerX);
      y.set(e.clientY - centerY);
    }
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <section ref={containerRef} className={styles.contactSection} id="contacts" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <div className={styles.bgText}>CON T AC T</div>
      
      <div className={styles.container}>
        <div className={styles.header}>
           <motion.span 
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className={styles.titleSub}
           >
              GET IN TOUCH
           </motion.span>
           <motion.h2 
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             className={styles.titleMain}
           >
              LET'S CRAFT SILENCE
           </motion.h2>
        </div>

        <motion.div 
          className={styles.formBox}
          style={{ rotateX, rotateY, perspective: 1000 }}
        >
          <div className={styles.formGrid}>
             {[
               { label: 'Object location', placeholder: 'PROJECT LOCATION', full: false },
               { label: 'Which service is of interest', type: 'select', items: ['Interior', 'Architecture', 'Urban'], full: false },
               { label: 'Your name', placeholder: 'NAME', full: false },
               { label: 'Select Country', type: 'select', items: ['USA', 'UAE', 'India', 'Other'], full: false },
               { label: 'Tell us more', type: 'textarea', placeholder: 'TELL US MORE ABOUT YOUR PROJECT', full: true }
             ].map((field, idx) => (
               <motion.div 
                 key={idx} 
                 className={`${styles.inputField} ${field.full ? styles.full : ''}`}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: 0.1 * idx }}
               >
                  <label className={styles.label}>{field.label}</label>
                  {field.type === 'select' ? (
                    <select className={styles.select}>
                       {field.items?.map(i => <option key={i}>{i}</option>)}
                    </select>
                  ) : field.type === 'textarea' ? (
                    <textarea className={styles.input} rows={2} />
                  ) : (
                    <input type="text" className={styles.input} placeholder={field.placeholder} />
                  )}
               </motion.div>
             ))}

             <div className={styles.submitArea}>
                <motion.button 
                  className={styles.sendBtn}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className={styles.btnText}>SEND</span>
                </motion.button>
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
