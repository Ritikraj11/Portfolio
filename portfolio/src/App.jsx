import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Component/Navbar';
import Hero from './Component/Hero';
import TechStack from './Component/Tech_stack';
import About from './Component/About';
import Project from './Component/Projects';
import Contact from './Component/Contact';
import Achievement from './Component/Achievement';
import ChooseMe from './Component/Chooseme';
import MyServices from './Component/Myservices';
import Footer from './Component/Footer';
import Hireme from './Component/Hireme';

const Home = ({ darkMode, setDarkMode }) => (
  <div className={darkMode ? 'dark-theme' : 'light-theme'}>
    <Navbar />
    <section id="home">
      <Hero />
    </section>
    <section>
      <Achievement />
    </section>
    <section>
      <ChooseMe />
    </section>
    <section>
      <MyServices />
    </section>
    <Footer setDarkMode={setDarkMode} darkMode={darkMode} />
  </div>
);

function App() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <Routes>
      <Route path="/" element={<Home darkMode={darkMode} setDarkMode={setDarkMode} />} />
      <Route path="/about" element={<><Navbar /><About /><Footer setDarkMode={setDarkMode} darkMode={darkMode} /></>} />
      <Route path="/projects" element={<><Navbar /><Project /><Footer setDarkMode={setDarkMode} darkMode={darkMode} /></>} />
      <Route path="/tech" element={<><Navbar /><TechStack /><Footer setDarkMode={setDarkMode} darkMode={darkMode} /></>} />
      <Route path="/contact" element={<><Navbar /><Contact /><Footer setDarkMode={setDarkMode} darkMode={darkMode} /></>} />
      <Route path="/Hireme" element={<><Navbar /><Hireme /><Footer setDarkMode={setDarkMode} darkMode={darkMode} /></>} />
    </Routes>
  );
}

export default App;
