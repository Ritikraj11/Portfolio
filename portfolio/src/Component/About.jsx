import React, { useState } from 'react';
import './About.css';
import { FaFilePdf } from 'react-icons/fa';
import { motion } from 'framer-motion';
import profileImage from '../assets/professional_pic.jpg';

const About = () => {
  const [activeTab, setActiveTab] = useState('education');

  const tabData = {
    education: (
      <div>
        <p><strong>B.Tech in Computer Science</strong> — AKTU</p>
        <p>Current CGPA: <strong>8.54</strong> (up to 2nd semester)</p>
        <p>Relevant Coursework: Data Structures, OS, C++,C</p>
      </div>
    ),
    experience: (
      <div>
        <p><strong>Full Stack Developer</strong> — Cultural Club Website</p>
        <p>Built with Node.js, MongoDB, HTML/CSS/JS</p>
        <p>Collaborated in a team to manage events and content</p>
      </div>
    ),
    interests: (
      <div>
        <p>🚀 Coding and Competitive Programming</p>
        <p>🎯 Hackathons and Ideathons</p>
        <p>🧠 Exploring AI/ML & building real-world solutions</p>
      </div>
    )
  };

  return (
    <section className="about-section" id="about">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        About Me
      </motion.h2>

      <div className="about-content">
        {/* Text Column */}
        <motion.div
          className="about-text"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p>
            I'm <strong>Ritik Raj</strong>, a full-stack developer who thrives on crafting
            smart, scalable web apps with technologies like React and Node.js.
          </p>
          <p>
            I love learning new tech, collaborating in teams, and solving complex
            real-world problems.
          </p>

          <div className="about-tabs">
            <div className="tab-buttons">
              <button onClick={() => setActiveTab('education')} className={activeTab === 'education' ? 'active' : ''}>
                Education
              </button>
              <button onClick={() => setActiveTab('experience')} className={activeTab === 'experience' ? 'active' : ''}>
                Experience
              </button>
              <button onClick={() => setActiveTab('interests')} className={activeTab === 'interests' ? 'active' : ''}>
                Interests
              </button>
            </div>
            <div className="tab-content">
              {tabData[activeTab]}
            </div>
          </div>
          {/* Currently Learning Section */}
          <motion.div
              className="currently-learning"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h3>📚 Currently Learning</h3>

              <div className="learning-skill">
                <span>🧠 Data Structures & Algorithms</span>
                <div className="progress-bar"><div style={{ width: '60%' }}></div></div>
              </div>

              <div className="learning-skill">
                <span>📘 Machine Learning & GenAI</span>
                <div className="progress-bar"><div style={{ width: '30%' }}></div></div>
              </div>

              <div className="learning-skill">
                <span>⚙️ System Design</span>
                <div className="progress-bar"><div style={{ width: '40%' }}></div></div>
              </div>

              <div className="learning-skill">
                <span>🛠️Penetration Testing Using Nmap and metasploit-framework</span>
                <div className="progress-bar"><div style={{ width: '20%' }}></div></div>
              </div>

              <div className="learning-skill">
                <span>📡 WebSockets & Real-time Apps</span>
                <div className="progress-bar"><div style={{ width: '30%' }}></div></div>
              </div>
            </motion.div>
          <a
            href="/Riitik_Raj_Resume_OG.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="download-btn"
          >
            <FaFilePdf className="pdf-icon" />
            View Resume
          </a>
        </motion.div>

        {/* Optional image or visual */}
        <motion.div
          className="about-image"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <img src={profileImage}alt="Ritik Raj" />
        </motion.div>
      </div>
    </section>
  );
};

export default About;
