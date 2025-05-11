import Navbar from './Component/Navbar';
import Hero from './Component/Hero';
import TechStack from './Component/Tech_stack';
import About from './Component/About';
import Project from './Component/Projects';  
import Contact from './Component/Contact';


function App() {
  return (
    <>
      <Navbar />
      <section id="home">
        <Hero />
      </section>
      <section id="tech">
        <TechStack />
      </section>
      <section id="about">
        <About />
      </section>
      <section id="projects">
        <Project />
      </section>
      <section id="contact">
        <Contact />
      </section>
    </>
  );
}

export default App;
