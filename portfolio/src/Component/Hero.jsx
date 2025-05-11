import './Hero.css'; // Ensure you have the CSS file for styling
import React from 'react';
import profileImage from '../assets/Ritik Image.png'; // <-- Add your image here

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-text">
          <h1>Hello, I'm <span>Ritik Raj</span></h1>
          <p>
            Aspiring Software Engineer | Passionate about coding| Eager to learn and build innovative solutions.
          </p>
          <a href="#projects" className="hero-button">View Projects</a>
        </div>
        <div className="hero-image">
          <img src={profileImage} alt="Profile" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
