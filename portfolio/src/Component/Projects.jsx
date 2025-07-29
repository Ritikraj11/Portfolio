import './Project.css';
import { useState } from 'react';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import HireMe from './Hireme';

const allProjects = [
  {
    title: 'Cultural Club Website',
    category: 'Full Stack',
    description: 'Responsive college club website with MongoDB, Express, Node.js, and pure JS.',
    techStack: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'MongoDB'],
    image: '/images/project1.png',
    liveLink: 'https://gecms.vercel.app/',
    githubLink: '#'
  },
  {
    title: 'Portfolio Website',
    category: 'Frontend',
    description: 'Modern personal portfolio using React and backend with Node.js and MongoDB.',
    techStack: ['React', 'Node.js', 'MongoDB', 'CSS'],
    image: '/images/project2.png',
    liveLink: 'https://portfolio-xi-eight-28.vercel.app/',
    githubLink: 'https://github.com/Ritikraj11/Portfolio'
  },
  {
    title: 'Social Media App',
    category: 'Full Stack',
    description: 'React frontend with custom C++ backend and MySQL for user authentication, chat, and posts.',
    techStack: ['React', 'C++', 'MySQL', 'WebSockets'],
    image: './images/Sanskar.png',
    liveLink: '#',
    githubLink: 'https://github.com/Ritikraj11/sanskar-a-social-media'
  },
  // {
  //   title: 'AI Mood-based Song Recommender',
  //   category: 'AI/ML',
  //   description: 'Detects mood from facial expression using CNN and recommends songs via Spotify API.',
  //   techStack: ['Python', 'CNN', 'FastAPI', 'Spotify API'],
  //   image: '/images/project4.png',
  //   liveLink: '#',
  //   githubLink: 'https://github.com/Ritikraj11/Mood-Recommender'
  // },
  // {
  //   title: 'Campus Connect Android App',
  //   category: 'Android',
  //   description: 'Native Android app for students to share posts, notes, and events.',
  //   techStack: ['Java', 'XML', 'Firebase'],
  //   image: '/images/project5.png',
  //   liveLink: '#',
  //   githubLink: '#'
  // }
];

const categories = ['All', 'Full Stack', 'Frontend', 'AI/ML', 'Android'];

const Project = () => {
  const [filter, setFilter] = useState('All');

  const filteredProjects = filter === 'All'
    ? allProjects
    : allProjects.filter(p => p.category === filter);

  return (
    <section className="projects-section">
      <h2 className="section-title">🚀 My Projects</h2>

      <div className="project-filters">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={filter === cat ? 'active' : ''}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="projects-grid">
        <AnimatePresence>
          {filteredProjects.map((project, idx) => (
            <motion.div
              className="project-card"
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.4 }}
            >
              <div className="project-image">
                <img src={project.image} alt={project.title} />
              </div>
              <div className="project-info">
                <h3>{project.title}</h3>
                <p>{project.description}</p>

                <div className="tech-stack">
                  {project.techStack.map((tech, i) => (
                    <span key={i} className="tech-badge">{tech}</span>
                  ))}
                </div>

                <div className="project-buttons">
                  {project.liveLink !== '#' && (
                    <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                      <FaExternalLinkAlt /> Live
                    </a>
                  )}
                  {project.githubLink !== '#' && (
                    <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                      <FaGithub /> Code
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <HireMe />
    </section>
  );
};

export default Project;
