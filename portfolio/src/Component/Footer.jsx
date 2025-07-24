import React, { useState, useEffect } from 'react';
import './Footer.css';
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaEnvelope,
  FaArrowUp,
} from 'react-icons/fa';

const Footer = ({ darkMode, setDarkMode }) => {
  const [showScroll, setShowScroll] = useState(false);

  // Show scroll-to-top button
  useEffect(() => {
    const checkScrollTop = () => {
      if (window.scrollY > 200) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    };
    window.addEventListener('scroll', checkScrollTop);
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <footer className="footer">
        {/* Left */}
        <div className="footer-left">
          <h3>Ritik Raj</h3>
          <p>
            Aspiring Software Engineer passionate about solving real-world
            problems with clean code and creativity.
          </p>
        </div>

        {/* Center */}
        <div className="footer-center">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/tech">Tech Stack</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/projects">Projects</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
          </ul>
        </div>

        {/* Right */}
        <div className="footer-right">
          <h4>Connect</h4>
          <div className="footer-socials">
            <a
              href="https://github.com/Ritikraj11"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/ritik-raj-srivastav/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://www.instagram.com/ritik___323"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
          </div>
          <p className="footer-email">
            <FaEnvelope /> ritik737091@gmail.com
          </p>
          <div className="theme-toggle">
            <button onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
            </button>
          </div>
        </div>
      </footer>

      {showScroll && (
        <button className="scroll-to-top" onClick={scrollToTop}>
          <FaArrowUp />
        </button>
      )}
    </>
  );
};

export default Footer;
