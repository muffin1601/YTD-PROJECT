'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './Navbar.module.css';

const leftLinks = [
  { name: 'PROJECTS', href: '#projects' },
  { name: 'SERVICES', href: '#services' },
  { name: 'ABOUT US', href: '#about', hasDropdown: true },
];

const rightLinks = [
  { name: 'HOME', href: '#careers' },
  { name: 'CONTACTS', href: '#contacts' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`${styles.nav} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <div className={styles.left}>
          {leftLinks.map((link) => (
            <Link key={link.name} href={link.href} className={styles.link}>
              {link.name}
              {link.hasDropdown && <span className={styles.arrow}>▼</span>}
            </Link>
          ))}
        </div>

        <div className={styles.center}>
          <Link href="/" className={styles.logo}>
            <img src="/logo.png" alt="NKEY" className={styles.logoImg} />
          </Link>
        </div>

        <div className={styles.right}>
          {rightLinks.map((link) => (
            <Link key={link.name} href={link.href} className={styles.link}>
              {link.name}
            </Link>
          ))}
          <a href="tel:+19542715832" className={styles.phone}>
            +91 888888888
          </a>
        </div>
      </div>
    </nav>
  );
}
