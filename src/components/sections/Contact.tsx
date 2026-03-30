'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useRef, FormEvent, useState } from 'react';
import styles from './Contact.module.css';

const services = [
  "INTERIOR DESIGN",
  "ARCHITECTURAL DESIGN",
  "AUTHOR'S SUPERVISION",
  "EQUIPMENT & RENOVATION",
  "REALIZATION"
];

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <section className={styles.section} id="contacts">
      <div className={styles.container}>
        
        {/* Left Side: Rotating Signature Request Badge */}
        <div className={styles.leftSide}>
           <div className={styles.stickyBadge}>
              <motion.div 
                className={styles.rotatingCircle}
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              >
                 <svg viewBox="0 0 100 100" className={styles.rotatingSvg}>
                    <path id="badgePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="transparent" />
                    <text>
                       <textPath xlinkHref="#badgePath" className={styles.badgeText}>
                          • SEND REQUEST • SEND REQUEST • SEND REQUEST •
                       </textPath>
                    </text>
                 </svg>
              </motion.div>
              <div className={styles.centerDot}></div>
              <div className={styles.badgeLabel}>
                 <span>YTD</span>
                 <span>DESIGN</span>
              </div>
           </div>
        </div>

        {/* Right Side: High-End Minimalist Form */}
        <div className={styles.rightSide}>
           <div className={styles.header}>
              <span className={styles.subtitle}>START A JOURNEY</span>
              <h2 className={styles.title}>HAVE A PROJECT</h2>
              <h2 className={`${styles.title} ${styles.accent}`}>IN MIND?</h2>
           </div>

           <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.inputGroup}>
                 <span className={styles.inputNum}>01</span>
                 <input type="text" placeholder="OBJECT LOCATION" className={styles.input} required />
                 <div className={styles.line}></div>
              </div>

              {/* CUSTOM DESIGNED DROPDOWN */}
              <div className={styles.inputGroup}>
                 <span className={styles.inputNum}>02</span>
                 <div 
                   className={`${styles.customDropdown} ${isDropdownOpen ? styles.open : ''}`}
                   onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                 >
                    <div className={styles.dropdownTrigger}>
                       <span className={selectedService ? styles.selectedVal : styles.placeholder}>
                          {selectedService || "WHICH SERVICE IS OF INTEREST"}
                       </span>
                       <motion.span 
                         animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                         className={styles.arrow}
                       >
                         ▼
                       </motion.span>
                    </div>
                    
                    <AnimatePresence>
                      {isDropdownOpen && (
                        <motion.ul 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className={styles.dropdownList}
                        >
                           {services.map((service) => (
                             <li 
                               key={service} 
                               className={styles.dropdownItem}
                               onClick={(e) => {
                                 e.stopPropagation();
                                 setSelectedService(service);
                                 setIsDropdownOpen(false);
                               }}
                             >
                               {service}
                             </li>
                           ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                 </div>
                 <div className={styles.line}></div>
              </div>

              <div className={styles.inputRow}>
                 <div className={styles.inputGroup}>
                    <span className={styles.inputNum}>03</span>
                    <input type="text" placeholder="YOUR NAME" className={styles.input} required />
                    <div className={styles.line}></div>
                 </div>
                 <div className={styles.inputGroup}>
                    <span className={styles.inputNum}>04</span>
                    <input type="email" placeholder="YOUR E-MAIL" className={styles.input} required />
                    <div className={styles.line}></div>
                 </div>
              </div>

              <div className={styles.submitSection}>
                 <button type="submit" className={styles.submitBtn}>
                    {isSubmitted ? 'SUBMITTED' : 'SEND'}
                    <div className={styles.btnArrow}>
                       <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                       </svg>
                    </div>
                 </button>
              </div>
           </form>

           {isSubmitted && (
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={styles.success}>
                THANK YOU FOR YOUR REQUEST. WE WILL CONTACT YOU SOON.
             </motion.div>
           )}
        </div>
      </div>

      {/* <div className={styles.bgTypography}>
         CONTACT US
      </div> */}
    </section>
  );
}
