import {
  FaHtml5, FaCss3Alt, FaJsSquare, FaReact,
  FaNodeJs, FaGitAlt, FaLinux, FaCode
} from 'react-icons/fa';
import { SiPython } from 'react-icons/si';
import './TechStack.css';

const currentLearning = [
  'Machine Learning & Generative AI',
  'System Design & High Scalability',
  'Docker, GitHub Actions & DevOps',
  'WebSocket & Real-time Communication',
];

const expertSkills = [
  'HTML5', 'CSS3', 'JavaScript', 'React', 'C/C++',
];

const techs = [
  { name: 'HTML5', icon: <FaHtml5 />, color: '#e34c26', level: 90 },
  { name: 'CSS3', icon: <FaCss3Alt />, color: '#264de4', level: 85 },
  { name: 'JavaScript', icon: <FaJsSquare />, color: '#f0db4f', level: 50 },
  { name: 'React', icon: <FaReact />, color: '#61dafb', level: 75 },
  { name: 'Node.js', icon: <FaNodeJs />, color: '#68a063', level: 40 },
  { name: 'Git', icon: <FaGitAlt />, color: '#f1502f', level: 50 },
  { name: 'C', icon: <FaCode />, color: '#00599C', level: 70 },
  { name: 'C++', icon: <FaCode />, color: '#004482', level: 70 },
  { name: 'Python', icon: <SiPython />, color: '#3776AB', level: 40 },
  { name: 'Linux', icon: <FaLinux />, color: '#333333', level: 40 },
];

const TechStack = () => {
  return (
    <section className="tech-section">
      <h2 className="tech-title">⚙️ Tech Stack</h2>

      <div className="tech-container">
        {techs.map((tech, index) => (
          <div className="tech-card" key={index} style={{ animationDelay: `${index * 0.1}s` }}>
            <div className="tech-icon" style={{ color: tech.color }}>
              {tech.icon}
            </div>
            <h3>{tech.name}</h3>
            <div className="skill-bar">
              <div
                className="skill-fill"
                style={{ width: `${tech.level}%`, backgroundColor: tech.color }}
              ></div>
            </div>
            <p className="skill-level">{tech.level}% Proficiency</p>
          </div>
        ))}
      </div>

      {/* Modern side-by-side learning + expertise */}
      <div className="tech-box-wrapper">
        {/* Always Learning */}
        <div className="modern-box glass-box">
          <h3>📚 Always Learning</h3>
          <p className="box-description">
            I'm continuously learning new technologies to stay updated and build better solutions.
          </p>
          <ul className="vertical-list">
            {currentLearning.map((item, i) => (
              <li key={i}>🔄 {item}</li>
            ))}
          </ul>
        </div>

        {/* Expertise */}
        <div className="modern-box glass-box">
          <h3>✅ Expertise</h3>
          <p className="box-description">
            Technologies I use confidently in production-grade projects.
          </p>
          <ul className="vertical-list">
            {expertSkills.map((item, i) => (
              <li key={i}>💡 {item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
