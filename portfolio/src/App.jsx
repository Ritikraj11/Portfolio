import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
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
import LoadingSplash from './Component/LoadingSplash';
import Chatbot from './Component/Chatbot';

const Home = ({ darkMode, setDarkMode }) => (
  <div className={darkMode ? 'dark-theme' : 'light-theme'}>
    <Navbar />
    <motion.main initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
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
    </motion.main>
    <Footer setDarkMode={setDarkMode} darkMode={darkMode} />
  </div>
);

function App() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <>
      <LoadingSplash />
      <Chatbot />
      <Routes>
        <Route path="/" element={<Home darkMode={darkMode} setDarkMode={setDarkMode} />} />
        <Route path="/about" element={<><Navbar /><motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}><About /></motion.div><Footer setDarkMode={setDarkMode} darkMode={darkMode} /></>} />
        <Route path="/projects" element={<><Navbar /><motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}><Project /></motion.div><Footer setDarkMode={setDarkMode} darkMode={darkMode} /></>} />
        <Route path="/tech" element={<><Navbar /><motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}><TechStack /></motion.div><Footer setDarkMode={setDarkMode} darkMode={darkMode} /></>} />
        <Route path="/contact" element={<><Navbar /><motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}><Contact /></motion.div><Footer setDarkMode={setDarkMode} darkMode={darkMode} /></>} />
        <Route path="/Hireme" element={<><Navbar /><motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}><Hireme /></motion.div><Footer setDarkMode={setDarkMode} darkMode={darkMode} /></>} />
      </Routes>
    </>
  );
}

export default App;
