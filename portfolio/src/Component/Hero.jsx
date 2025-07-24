import './Hero.css';
import React from 'react';
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import profileImage from '../assets/professional_pic.jpg';
import Project from './Projects';
import { FaFilePdf } from 'react-icons/fa';
import HireMe from './Hireme';
const Hero = () => {
  return (
    <section className="hero">
      {/* 🫧 Bubbles */}
      <ul className="bubbles">
        {Array.from({ length: 15 }).map((_, i) => (
          <li key={i}></li>
        ))}
      </ul>

      {/* 🌊 New Left-to-Right Background Effect */}
      <div className="tech-wave"></div>

      <div className="hero-content">
        <motion.div
          className="hero-text"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1>Hi, I'm <span>Ritik Raj</span></h1>
          <p>
            Aspiring Software Engineer passionate about crafting clean code and building meaningful solutions.
          </p>

          <div className="typing-text">
            <h3>
              <Typewriter
                words={["Let's build together"]}
                loop={0}
                cursor
                cursorStyle="_"
                typeSpeed={80}
                deleteSpeed={50}
                delaySpeed={2000}
              />
            </h3>
          </div>

         <div className="hero-buttons">
            <motion.a
              href="/projects"
              className="hero-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Projects
            </motion.a>

            {/* Hire Me Button BELOW */}
            <motion.a
              href="/Hireme"
              className="hero-button hire-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Hire Me
            </motion.a>
          </div>

        </motion.div>

        <motion.div
          className="hero-image"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <img src={profileImage} alt="Profile" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
