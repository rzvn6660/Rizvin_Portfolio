import React from 'react';
import { Mail } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-content">
          <div className="footer-brand">
            <span className="logo">MR</span>
            <p className="footer-tagline">Built with intent.</p>
          </div>
          
          <div className="footer-social">
            <a href="mailto:rzvn6660@example.com" aria-label="Email" className="social-link">
              <Mail size={20} />
            </a>
            <a href="https://linkedin.com/in/mohammed-rizvin-mk" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="social-link">
              <FaLinkedin size={20} />
            </a>
            <a href="https://github.com/rzvn6660" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="social-link">
              <FaGithub size={20} />
            </a>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="copyright">© {new Date().getFullYear()} Mohammed Rizvin MK.</p>
        </div>
      </div>
    </footer>
  );
}
