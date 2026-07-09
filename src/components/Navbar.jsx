import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import './Navbar.css';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setMobileMenuOpen(false);

  const NavLinks = () => (
    <>
      {isHome ? (
        <>
          <a href="#focus" onClick={closeMenu} className="nav-link">Focus</a>
          <a href="#projects" onClick={closeMenu} className="nav-link">Projects</a>
          <a href="#github" onClick={closeMenu} className="nav-link">GitHub</a>
          <a href="#certifications" onClick={closeMenu} className="nav-link">Certifications</a>
        </>
      ) : (
        <Link to="/" onClick={closeMenu} className="nav-link">← Back to Home</Link>
      )}
      <Link to="/resume" onClick={closeMenu} className="nav-link">Resume</Link>
      {isHome && <a href="#contact" onClick={closeMenu} className="btn btn-primary nav-cta">Contact</a>}
    </>
  );

  return (
    <header className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-container">
        <Link to="/" className="logo" onClick={closeMenu}>
          MR
        </Link>
        
        <nav className="desktop-nav">
          <NavLinks />
        </nav>

        <button 
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div className={`mobile-nav-overlay ${mobileMenuOpen ? 'open' : ''}`}>
        <nav className="mobile-nav">
          <NavLinks />
        </nav>
      </div>
    </header>
  );
}
