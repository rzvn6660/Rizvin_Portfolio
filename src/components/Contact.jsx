import React from 'react';
import { Mail, Download } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';
import './Contact.css';

export default function Contact() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="contact" className="section-padding contact-section">
      <div className="container" ref={ref}>
        <div className={`contact-content glass-panel ${inView ? 'in-view' : ''}`}>
          <h2 className="contact-title">Let's build something that ships.</h2>
          <p className="contact-subtitle">
            Open to Junior AI/ML Engineer roles. If you're building systems that require both empathy for the user and rigorous engineering under the hood, I'd love to connect.
          </p>
          
          <div className="contact-actions">
            <a href="mailto:rzvn6660@example.com" className="btn btn-primary">
              <Mail size={18} /> Email
            </a>
            <a href="https://linkedin.com/in/mohammed-rizvin-mk" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              <FaLinkedin size={18} /> LinkedIn
            </a>
            <a href="https://github.com/rzvn6660" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              <FaGithub size={18} /> GitHub
            </a>
            <a href="/resume" className="btn btn-ghost">
              <Download size={18} /> Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
