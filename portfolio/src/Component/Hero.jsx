import './Hero.css';
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import profileImage from '../assets/professional_pic.jpg';
import { FaFilePdf } from 'react-icons/fa';
import HireMe from './Hireme';
import WhatIDo from './WhatIDo';

/* ---------- Motion variants ---------- */
const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const itemUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const wordUp = {
  hidden: { opacity: 0, y: 60, rotateX: -35 },
  show: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
};

const Hero = () => {
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const imgWrapRef = useRef(null);

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rx: y * -14, ry: x * 14 });
  };

  const resetTilt = () => setTilt({ rx: 0, ry: 0 });

  return (
    <section className="hero" onMouseMove={handleMove} onMouseLeave={resetTilt}>
      {/* 🌊 Particle wave background (full-screen canvas) */}

      {/* 🫧 Bubbles */}
      <ul className="bubbles">
        {Array.from({ length: 12 }).map((_, i) => (
          <li key={i}></li>
        ))}
      </ul>

      <div className="hero-wrapper">
        <div className="hero-content">
          {/* ===== LEFT: Text ===== */}
          <div className="hero-text">
            <motion.h1
              className="hero-title"
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.span className="word" variants={wordUp}>Hi,</motion.span>
              <motion.span className="word" variants={wordUp}>I'm</motion.span>
              <motion.span className="name" variants={wordUp}>Ritik Raj</motion.span>
            </motion.h1>

            <motion.p
              variants={itemUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
            >
              Aspiring Software Engineer passionate about crafting clean code and building meaningful solutions.
            </motion.p>

            <motion.div
              className="typing-text"
              variants={itemUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
            >
              <h3>
                <Typewriter
                  words={["Let's build together", 'Design. Code. Ship.']}
                  loop={0}
                  cursor
                  cursorStyle="|"
                  typeSpeed={70}
                  deleteSpeed={40}
                  delaySpeed={1800}
                />
              </h3>
            </motion.div>

            <motion.div
              className="hero-buttons"
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.a
                href="/projects"
                className="hero-button"
                variants={itemUp}
                whileHover={{
                  scale: 1.05,
                  y: -3,
                  boxShadow: '0 0 35px rgba(0, 255, 102, 0.65)',
                  borderColor: 'var(--accent-lime)',
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 320, damping: 18 }}
              >
                View Projects
              </motion.a>

              <motion.a
                href="/Hireme"
                className="hero-button hire-button"
                variants={itemUp}
                whileHover={{
                  scale: 1.05,
                  y: -3,
                  backgroundColor: 'var(--accent-lime)',
                  color: '#020617',
                  boxShadow: '0 0 30px rgba(0, 255, 102, 0.7)',
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 320, damping: 18 }}
              >
                Hire Me
              </motion.a>
            </motion.div>
          </div>

          {/* ===== RIGHT: Picture + WhatIDo ===== */}
          <div className="hero-right">
            <motion.div
              className="hero-image-wrap"
              ref={imgWrapRef}
              initial={{ opacity: 0, scale: 0.55, rotate: -10 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.95, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <div className="glow-ring" />
              <motion.div
                className="hero-image"
                style={{
                  transform: `perspective(800px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
                }}
                transition={{ type: 'spring', stiffness: 60, damping: 22 }}
              >
                <img src={profileImage} alt="Ritik Raj" />
              </motion.div>

              <motion.span
                className="hero-badge"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                🚀 Available for freelance
              </motion.span>
            </motion.div>

            <WhatIDo />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="scroll-indicator"
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span></span>
        <span></span>
        <span></span>
      </motion.div>
    </section>
  );
};

export default Hero;