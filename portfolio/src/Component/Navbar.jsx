import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen(!open);

  const closeMenu = () => setOpen(false);

  const location = useLocation();
  const navigate = useNavigate();
  const [active, setActive] = useState('home');

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('section[id]'));
    if (!sections.length) return;

    const onScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.28;
      let current = sections[0].id || 'home';
      sections.forEach((sec) => {
        if (sec.offsetTop <= scrollPos) current = sec.id;
      });
      setActive(current);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [location.pathname]);

  const handleNav = (e, path, targetId) => {
    if (location.pathname === '/' && targetId) {
      e.preventDefault();
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setActive(targetId);
        closeMenu();
        return;
      }
    }
    // otherwise navigate normally
    closeMenu();
    navigate(path);
  };

  return (
    <header className="navbar">
      <div className="nav-container">
        <h1 className="logo">Ritik</h1>
        <nav className={`nav-links ${open ? 'open' : ''}`}>
          <a href="/" data-target="home" onClick={(e) => handleNav(e, '/', 'home')} className={active === 'home' && location.pathname === '/' ? 'active' : ''}>Home</a>
          <a href="/about" data-target="about" onClick={(e) => handleNav(e, '/about', 'about')} className={active === 'about' || location.pathname === '/about' ? 'active' : ''}>About</a>
          <a href="/tech" data-target="tech" onClick={(e) => handleNav(e, '/tech', 'tech')} className={active === 'tech' || location.pathname === '/tech' ? 'active' : ''}>Skills</a>
          <a href="/projects" data-target="projects" onClick={(e) => handleNav(e, '/projects', 'projects')} className={active === 'projects' || location.pathname === '/projects' ? 'active' : ''}>Projects</a>
          <a href="/contact" data-target="contact" onClick={(e) => handleNav(e, '/contact', 'contact')} className={active === 'contact' || location.pathname === '/contact' ? 'active' : ''}>Contact</a>
          <a href="/hireme" data-target="hireme" onClick={(e) => handleNav(e, '/Hireme', 'hireme')} className={location.pathname === '/Hireme' ? 'active' : ''}>Hire Me</a>
        </nav>
        <div className="menu-icon" onClick={toggleMenu}>
          {open ? <FaTimes /> : <FaBars />}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
