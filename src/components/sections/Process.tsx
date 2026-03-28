"use client";

import { useScroll, useTransform, motion, useSpring } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import styles from "./Process.module.css";

const processSteps = [
  {
    id: "01",
    title: "CONCEPT",
    desc: "Every masterpiece begins with a deep exploration of space, context, and the client's unique aspirations.",
    image: "/2J3A7901 copy.jpg",
    thumb: "/SOFA WALL.jpg (2).jpeg",
    thumbPos: "bottomRight" as const,
  },
  {
    id: "02",
    title: "DESIGN",
    desc: "We translate abstract ideas into precise architectural diagrams and functional layouts that define the soul of the project.",
    image: "/SOFA WALL.jpg (2).jpeg",
    thumb: "/Picture10.jpg",
    thumbPos: "topLeft" as const,
  },
  {
    id: "03",
    title: "CRAFTING",
    desc: "Experience the future through hyper-realistic digital twin visualizations for each interior and structural element.",
    image: "/Picture10.jpg",
    thumb: "/Picture8.jpg",
    thumbPos: "bottomRight" as const,
  },
  {
    id: "04",
    title: "DELIVERY",
    desc: "A comprehensive architectural portfolio containing technical blueprints and final visualizations is finalized for execution.",
    image: "/Picture8.jpg",
    thumb: "/2J3A7901 copy.jpg",
    thumbPos: "topLeft" as const,
  },
];

const N = processSteps.length;

export default function Process() {
  const rootRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: rootRef,
    offset: ["start start", "end end"],
  });

  const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 25 });

  const titleY = useTransform(smooth, [0, 0.18], ["0%", "-120%"]);
  const titleOpacity = useTransform(smooth, [0, 0.12], [1, 0]);

  return (
    <section ref={rootRef} className={styles.root} id="process">
      <div className={styles.sticky}>
        
        <motion.div
          className={styles.headlineWrap}
          style={{ y: titleY, opacity: titleOpacity }}
        >
          <span className={styles.premiumLabel}>Methodology</span>
          <h2 className={styles.headline}>The Creative Process</h2>
        </motion.div>

        {/* ── Slides ── */}
        <div className={styles.slidesWrap}>
          {processSteps.map((step, i) => (
            <Slide key={step.id} step={step} index={i} total={N} smooth={smooth} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Slide({
  step,
  index,
  total,
  smooth,
}: {
  step: (typeof processSteps)[0];
  index: number;
  total: number;
  smooth: any;
}) {

  const TITLE_EXIT = 0.15;
  const range = (1 - TITLE_EXIT) / total;
  const start = TITLE_EXIT + index * range;
  const end = start + range;

  const fadeIn = Math.max(0, start - 0.05);
  const opacity = useTransform(
    smooth,
    [fadeIn, start + 0.05, end - 0.06, end],
    [index === 0 ? 1 : 0, 1, 1, 0]
  );

  const imageScale = useTransform(smooth, [start, end], [1.0, 1.1]);

  const contentY = useTransform(
    smooth,
    [start, start + 0.06, end - 0.06, end],
    [40, 0, 0, -30]
  );
  const contentOpacity = useTransform(
    smooth,
    [start, start + 0.06, end - 0.06, end],
    [0, 1, 1, 0]
  );

  const thumbOpacity = useTransform(
    smooth,
    [start + 0.02, start + 0.08, end - 0.08, end - 0.02],
    [0, 1, 1, 0]
  );
  const thumbScale = useTransform(smooth, [start, end], [0.9, 1.05]);

  // Diagonal Motion for thumbnails
  const isTopLeft = step.thumbPos === "topLeft";
  const thumbX = useTransform(
    smooth, 
    [start, end], 
    [isTopLeft ? -60 : 60, isTopLeft ? 40 : -40]
  );
  const thumbY = useTransform(
    smooth, 
    [start, end], 
    [isTopLeft ? -60 : 60, isTopLeft ? 40 : -40]
  );

  const thumbClass = isTopLeft ? styles.thumbTopLeft : styles.thumbBottomRight;

  return (
    <motion.div className={styles.slide} style={{ opacity }}>
      {/* ── Main image ── */}
      <motion.div
        className={styles.mainImageWrap}
        style={{ scale: imageScale }}
      >
        <Image
          src={step.image}
          alt={step.title}
          fill
          className={styles.mainImage}
          priority={index === 0}
          sizes="(max-width: 768px) 90vw, 48vw"
        />
      </motion.div>

      {/* ── Thumbnail (corner) ── */}
      <motion.div
        className={`${styles.thumbWrap} ${thumbClass}`}
        style={{ 
          opacity: thumbOpacity, 
          scale: thumbScale,
          x: thumbX,
          y: thumbY,
        }}
      >
        <Image
          src={step.thumb}
          alt=""
          fill
          className={styles.thumbImage}
          sizes="220px"
        />
      </motion.div>

      {/* ── Right text content ── */}
      <motion.div
        className={styles.content}
        style={{ opacity: contentOpacity, y: contentY }}
      >
        <span className={styles.slideNum}>{step.id}</span>
        <h3 className={styles.cardTitle}>{step.title}</h3>
        <p className={styles.slideText}>{step.desc}</p>
        {/* <button className={styles.slideLink}>Learn More About {step.title}</button> */}
      </motion.div>
    </motion.div>
  );
}
