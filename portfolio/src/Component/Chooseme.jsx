import React from 'react';
import './ChooseMe.css';
import { motion } from 'framer-motion';
import { FaBolt, FaBrain, FaCode, FaUsers } from 'react-icons/fa';

const reasons = [
  {
    icon: <FaCode />,
    title: 'Clean Code',
    description: 'I focus on writing maintainable and readable code that scales with your needs.'
  },
  {
    icon: <FaBolt />,
    title: 'Fast Delivery',
    description: 'I value time. Projects are delivered with speed without compromising quality.'
  },
  {
    icon: <FaBrain />,
    title: 'Problem Solver',
    description: 'I love solving complex problems with simple, elegant technical solutions.'
  },
  {
    icon: <FaUsers />,
    title: 'Team Player',
    description: 'Effective communication and collaboration make every project better.'
  }
];

const ChooseMe = () => {
  return (
    <section className="chooseme-section">
      <h2 className="chooseme-title">Why Choose Me?</h2>
      <div className="chooseme-cards">
        {reasons.map((reason, index) => (
          <motion.div
            className="chooseme-card"
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <div className="icon">{reason.icon}</div>
            <h3>{reason.title}</h3>
            <p>{reason.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ChooseMe;
