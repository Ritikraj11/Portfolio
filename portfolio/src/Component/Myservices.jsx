import React from 'react';
import './Myservices.css';
import { FaLaptopCode, FaLayerGroup, FaProjectDiagram } from 'react-icons/fa';
import { motion } from 'framer-motion';

const services = [
  {
    icon: <FaLayerGroup />,
    title: 'Full Stack Development',
    description:
      'I build robust and scalable web applications using modern tech stacks including React, Node.js, Express, and MongoDB.',
  },
  {
    icon: <FaLaptopCode />,
    title: 'Frontend Development',
    description:
      'I specialize in crafting responsive, beautiful user interfaces using React, HTML5, CSS3, and modern JS frameworks.',
  },
  {
    icon: <FaProjectDiagram />,
    title: 'DSA & Problem Solving',
    description:
      'Regularly solve Data Structures & Algorithms problems on platforms like LeetCode and Codeforces to stay sharp.',
  },
];

const MyServices = () => {
  return (
    <section className="services-section">
      <h2 className="services-title">My Services</h2>
      <div className="services-container">
        {services.map((service, i) => (
          <motion.div
            className="service-card"
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.2 }}
          >
            <div className="service-icon">{service.icon}</div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default MyServices;
