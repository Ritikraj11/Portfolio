import './Hero.css';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import profileImage from '../assets/professional_pic.jpg';
import { FaFilePdf } from 'react-icons/fa';
import HireMe from './Hireme';
import WhatIDo from './WhatIDo';

const Hero = () => {
  const [imgOffset, setImgOffset] = useState({ x: 0, y: 0 });

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setImgOffset({ x: x * 10, y: y * 8 });
  };

  const resetMove = () => setImgOffset({ x: 0, y: 0 });

  return (
    <section className="hero" onMouseMove={handleMove} onMouseLeave={resetMove}>
      {/* 🫧 Bubbles */}
      <ul className="bubbles">
        {Array.from({ length: 15 }).map((_, i) => (
          <li key={i}></li>
        ))}
      </ul>

      {/* 🌊 Background */}
      <div className="tech-wave"></div>

      <div className="hero-wrapper">
        <div className="hero-content">
          <motion.div
            className="hero-text"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
          >
            <h1>Hi, I'm <span>Ritik Raj</span></h1>
            <p>
              Aspiring Software Engineer passionate about crafting clean code and building meaningful solutions.
            </p>

            <div className="typing-text">
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
            </div>

            <div className="hero-buttons">
              <motion.a href="/projects" className="hero-button" whileHover={{ scale: 1.03 }}>
                View Projects
              </motion.a>

              <motion.a href="/Hireme" className="hero-button hire-button" whileHover={{ scale: 1.03 }}>
                Hire Me
              </motion.a>
            </div>
          </motion.div>

          <div className="hero-right">
            <motion.div
              className="hero-image"
              style={{ transform: `translate(${imgOffset.x}px, ${imgOffset.y}px)` }}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8 }}
            >
              <img src={profileImage} alt="Profile" />
            </motion.div>

            <WhatIDo />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
