import React from 'react';
import './About.css'; // Assuming you have a CSS file for styling
const About = () => {
  return (
    <section className="about-section" id="about">
      <h2>About Me</h2>
      <div className="about-content">
        <div className="about-text">
          <p>
            Hi, I'm Ritik Raj, a passionate developer with a strong background in web development. I have experience working with technologies like JavaScript, React, and Node.js to create engaging and efficient applications. My goal is to continuously learn and build scalable, high-performance solutions.
          </p>
          <p>
            I thrive in collaborative environments and enjoy solving challenging problems. When I'm not coding, I love exploring new technologies, attending tech meetups, and contributing to open-source projects.
          </p>
        </div>
        {/* PDF view button */}
        <div className="about-download">
          <a href="/Ritik _Resume_OG.pdf" target="_blank" rel="noopener noreferrer">
            <button className="download-btn">View Resume</button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
