'use client';

import { motion } from 'framer-motion';
import { useRef, FormEvent } from 'react';
import styles from './Contact.module.css';

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <section className={styles.section} id="contacts" ref={containerRef}>
      
      {/* Decorative top lines */}
      <div className={styles.topDecoration}>
         <div className={styles.horizontalLine}></div>
         <div className={styles.diagonalContainer}>
           <div className={styles.diagonalLeft}></div>
           <div className={styles.diagonalRight}></div>
         </div>
      </div>

      <div className={styles.portfolioFeedback}>
        <div className={styles.container}>
          <div className={styles.header}>
            <span className={styles.subtitle}>GET IN TOUCH</span>
            <div className={styles.titleWrapper}>
              <motion.h2 
                initial={{ x: -100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className={styles.title}
              >
                WANT TO CONTACT
              </motion.h2>
              <motion.h2 
                initial={{ x: 100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                className={`${styles.title} ${styles.titleRight}`}
              >
                <i className={styles.italic}>WITH US ?</i>
              </motion.h2>
            </div>
          </div>

          <div className={styles.formContainer}>


            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGrid}>
                
                {/* Row 1 Left */}
                <div className={styles.formItem}>
                  <label className={styles.inputWrap}>
                    <input className={styles.inputElement} placeholder="Object location" type="text" name="object-location" required />
                    <span className={styles.formItemLabel}>Object location</span>
                  </label>
                </div>

                {/* Row 1 Right */}
                <div className={styles.formItem}>
                  <label className={styles.inputWrap}>
                    <span className={styles.formFloatLabel}>Which service is of interest</span>
                    <div className={styles.selectWrapper}>
                      <select className={styles.selectElement} name="include_blank" required defaultValue="Interior design">
                        <option value="Interior design">Interior design</option>
                        <option value="Architectural design">Architectural design</option>
                        <option value="Author’s supervision">Author’s supervision</option>
                        <option value="Equipment">Equipment</option>
                        <option value="Renovation">Renovation</option>
                        <option value="Realization">Realization</option>
                      </select>
                      <span className={styles.dropdownArrow}>▼</span>
                    </div>
                  </label>
                </div>

                {/* Row 2 Left */}
                <div className={styles.formItem}>
                  <label className={styles.inputWrap}>
                    <input className={styles.inputElement} placeholder="Your name" type="text" name="user-name" required />
                    <span className={styles.formItemLabel}>Your name</span>
                  </label>
                </div>

                {/* Row 2 Right */}
                <div className={`${styles.formItem} ${styles.splitItem}`}>
                  <label className={`${styles.inputWrap} ${styles.flex1}`}>
                    <div className={styles.selectWrapper}>
                      <select className={`${styles.selectElement} ${styles.mutedSelect}`} name="country_list" required defaultValue="Select Country">
                        <option value="Select Country">Select Country</option>
                        <option value="AE">United Arab Emirates +971</option>
                        <option value="US">United States +1</option>
                        <option value="UA">Ukraine +380</option>
                        <option value="GB">United Kingdom +44</option>
                      </select>
                      <span className={styles.dropdownArrow}>▼</span>
                    </div>
                  </label>

                  <label className={`${styles.inputWrap} ${styles.flex1}`}>
                    <input className={`${styles.inputElement} ${styles.phoneInput}`} placeholder="050 123 45 67" type="tel" name="tel-746" required />
                  </label>
                </div>

                {/* Row 3 Left */}
                <div className={styles.formItem}>
                  <label className={styles.inputWrap}>
                    <input className={styles.inputElement} placeholder="Your E-mail" type="email" name="user-email" required />
                    <span className={styles.formItemLabel}>Your E-mail</span>
                  </label>
                </div>

              </div>

              <div className={styles.formSubmit}>
                <button className={styles.submitBtn} type="submit">
                  SEND
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      {/* Background Diamonds */}
      <div className={styles.bgDiamond1}></div>
      <div className={styles.bgDiamond2}></div>
      <div className={styles.bgDiamond3}></div>

    </section>
  );
}
