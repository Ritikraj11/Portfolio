import React, { useState } from 'react';
import './Achievement.css'; // Assuming you have a CSS file for styling
import { motion } from 'framer-motion';

const journeyData = [
  {
    title: '🏆 Hackathons',
    items: [
      {
        name: 'Smart India Hackathon 2023 and 2024 Winner',
        description: 'Winner of Smart India Hackathon 2023 and 2024 at College Level competing with 10+ Teams.',
        date: 'September 2023'
      },
      {
        name: 'Start-up Ideathon 2024',
        description: 'Third Place at College level Start-up Ideathon 2024.',
        date: 'April 2024'
      }
    ]
  },
  {
    title: '💼 Projects',
    items: [
      {
        name: 'Cultural CLub Website ',
        description: 'Built a full-stack Cultural Club Website Using HTML,CSS,JS, Node.js, Express, and MongoDB.',
        date: 'December 2024'
      },
      {
        name: 'Social Media Website (C++)',
        description: 'Under Process , Made with React and Backend With C++.',
        date: 'April 2025'
      },
      {
        name: 'PortFolio Website For My self ',
        description: 'Built a full stack Portfolio using React as Frontend and Node.js as Backend.',
        date: 'june 2025'
      }
    ]
  },
  {
    title: '📜 Certificates',
    items: [
      {
        name: 'Introduction to Generative AI - Art of the possible!',
        description: ' have completed Introduction to Generative AI - Art of the possible! program By Amazon Web service,Training and Certification.',
        date: 'May 2024'
      },
      {
        name: 'Artificial Intelligence Beginners Guide: What is AI?',
        description: 'I have completed Artificial Intelligence Beginners Guide: What is AI? program By Simplilearn.',
        date: 'April 2024'
      },
      {
        name: 'Introduction to Cybersecurity',
        description: 'I have completed Introduction to Cybersecurity program By Cisco Networking Academy.',
        date: 'June 2024'
      }
    ]
  },
  {
    title: '🎓 Academic',
    items: [
      {
        name: 'Current CGPA',
        description: '8.54 CGPA (2nd semester)',
        date: 'Jul 2025'
      }
    ]
  }
];

const Journey = () => {
  const [activeCategory, setActiveCategory] = useState(null);

  return (
    <section className="journey-section">
      <h2 className="journey-title">My Achievement</h2>
      <div className="decor-frame">
      <div className="journey-wrapper">
        {journeyData.map((category, i) => (
          <motion.div className="journey-card static" key={i}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.18 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.45, delay: i * 0.06 }}
          >
            <h3>{category.title} <span className="entry-count">({category.items.length})</span></h3>
            <button
              className="more-button"
              onClick={() => setActiveCategory(activeCategory === i ? null : i)}
            >
              {activeCategory === i ? 'Close' : 'More'}
            </button>
          </motion.div>
        ))}
      </div>

      {activeCategory !== null && (
        <motion.div
          className="journey-detail"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h3>{journeyData[activeCategory].title}</h3>
          <ul>
            {journeyData[activeCategory].items.map((item, j) => (
              <li key={j}>
                <h4>{item.name}</h4>
                <p>{item.description}</p>
                <span>{item.date}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
      </div>
      <span className="corner-mark tl" aria-hidden="true"></span>
      <span className="corner-mark br" aria-hidden="true"></span>
    </section>
  );
};

export default Journey;
