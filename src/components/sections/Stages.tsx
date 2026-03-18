'use client';

import { motion } from 'framer-motion';
import styles from './Stages.module.css';

const stages = [
  { id: '01', title: 'Start', desc: 'Initial consultation and project scope definition.' },
  { id: '02', title: 'Plan', desc: 'Detailed architectural planning and structural design.' },
  { id: '03', title: 'Visualization', desc: 'High-end 3D renderings and material selection.' },
  { id: '04', title: 'Album', desc: 'Final documentation and construction blueprints.' },
];

export default function Stages() {
  return (
    <section className={styles.stagesSection} id="about">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.subtitle}>Our Process</span>
          <h2 className={styles.title}>STAGES OF WORK</h2>
        </div>

        <div className={styles.list}>
          {stages.map((stage) => (
            <motion.div 
              key={stage.id} 
              className={styles.item}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: parseInt(stage.id) * 0.1 }}
            >
              <div className={styles.number}>{stage.id}</div>
              <div className={styles.text}>
                <h3 className={styles.stageTitle}>{stage.title}</h3>
                <p className={styles.desc}>{stage.desc}</p>
              </div>
              <div className={styles.line}></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
