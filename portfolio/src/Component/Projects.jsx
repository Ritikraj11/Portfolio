import './Project.css';

const projects = [
  {
    title: 'Cultural Club Website',
    description: 'A responsive Cultural Club using HTML,CSS and Javascript.',
    image: '/images/project1.png',
    liveLink: 'https://gecm.vercel.app/',
    githubLink: '#'
  },
  {
    title: 'Portfolio Website',
    description: 'A responsive personal portfolio using React and modern CSS.',
    image: '/images/project2.png',
    liveLink: '#',
    githubLink: 'https://github.com/yourname/portfolio'
  },
//   {
//     title: 'Chat App',
//     description: 'Realtime chat app built with Socket.io, Node.js, and React.',
//     image: '/images/chat.png',
//     liveLink: 'https://yourchatapp.live',
//     githubLink: 'https://github.com/yourname/chat-app'
//   },
//   {
//     title: 'Task Manager',
//     description: 'A full-stack task management app using MERN stack.',
//     image: '/images/task.png',
//     liveLink: 'https://yourtaskmanager.live',
//     githubLink: 'https://github.com/yourname/task-manager'
//   }
];

const Project = () => {
  return (
    <section className="projects-section">
      <h2 className="section-title">Projects</h2>
      <div className="projects-grid">
        {projects.map((project, idx) => (
          <div className="project-card" key={idx}>
            <img src={project.image} alt={project.title} className="project-img" />
            <div className="project-info">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-buttons">
                <a href={project.liveLink} target="_blank" rel="noopener noreferrer">Live Demo</a>
                <a href={project.githubLink} target="_blank" rel="noopener noreferrer">Code</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Project;
