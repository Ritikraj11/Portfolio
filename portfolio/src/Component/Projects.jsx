import './Project.css';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import { motion } from 'framer-motion';

const projects = [
  {
    title: 'Cultural Club Website',
    description: 'A responsive Cultural Club website using HTML, CSS, and JavaScript.',
    image: '/images/project1.png',
    liveLink: 'https://gecm.vercel.app/',
    githubLink: '#'
  },
  {
    title: 'Portfolio Website',
    description: 'A responsive personal portfolio using React and modern CSS.',
    image: '/images/project2.png',
    liveLink: '#',
    githubLink: 'https://github.com/Ritikraj11/Portfolio'
  },
];

const Project = () => {
  return (
    <section className="projects-section">
      <h2 className="section-title">My Projects</h2>
      <div className="projects-grid">
        {projects.map((project, idx) => (
          <motion.div
            className="project-card"
            key={idx}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.2 }}
          >
            <img src={project.image} alt={project.title} className="project-img" />
            <div className="project-info">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
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
      </div>
    </section>
  );
};

export default Project;
