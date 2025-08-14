import React from 'react';
import './Hireme.css';
import { FaEnvelope, FaLinkedin, FaDownload } from 'react-icons/fa';

const HireMe = () => {
  return (
    <section className="hireme-section" id="hireme">
      <div className="hireme-container">
        <div className="hireme-content">
          <h2>💼 Hire Me as an Intern</h2>
          <p>
            I'm <strong>Ritik Raj</strong>, a passionate software developer seeking internship opportunities to apply and grow my skills in Full Stack Development, React, Node.js, and more.
            I am quick to learn, a great team player, and eager to contribute to real-world projects.
          </p>

          <div className="hireme-details">
            <p><strong>📧 Email:</strong> ritik737091@gmail.com</p>
            <p><strong>📍 Location:</strong> India (Remote/On-site)</p>
            <p><strong>🎓 Education:</strong> B.Tech in CSE, 8.54 CGPA (2th sem)</p>
          </div>

          <div className="hireme-buttons">
            <a
              href="/Ritik_Raj_Resume.pdf"
              download
              className="hireme-btn"
            >
              <FaDownload /> Download Resume
            </a>
            <a
              href="mailto:ritikraj77889@gmail.com"
              className="hireme-btn secondary"
            >
              <FaEnvelope /> Hire Me
            </a>
            <a
              href="https://www.linkedin.com/in/ritik-raj-srivastav/"
              target="_blank"
              rel="noopener noreferrer"
              className="hireme-btn secondary"
            >
              <FaLinkedin /> Connect
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HireMe;
