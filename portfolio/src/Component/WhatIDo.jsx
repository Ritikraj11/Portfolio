import React from 'react';
import { motion } from 'framer-motion';
import './WhatIDo.css';

const cards = [
  {
    title: 'AI / ML',
    desc: 'Building intelligent systems with machine learning, deep learning, and data analytics.',
  },
  {
    title: 'Full Stack & IoT',
    desc: 'Crafting end-to-end web & IoT solutions using modern stacks and embedded systems.',
  },
  {
    title: 'App Development',
    desc: 'Cross-platform mobile and web app development with performant UI and offline features.',
  },
];

const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  show: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12, duration: 0.5 } }),
};

const WhatIDo = () => {
  return (
    <div className="whatido-panel">
      {cards.map((c, i) => (
        <motion.div
          key={c.title}
          className="whatido-card"
          custom={i}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={cardVariant}
          whileHover={{ scale: 1.02 }}
        >
          <div className="card-decor" />
          <h4>{c.title}</h4>
          <p>{c.desc}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default WhatIDo;
