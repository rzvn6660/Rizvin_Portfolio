import React, { useState } from 'react';
import { Mail, Download, Copy, Check } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';
import './Contact.css';

export default function Contact() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('rizvinmk@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="section-padding contact-section">
      <div className="container" ref={ref}>
        <div className={`contact-content glass-panel ${inView ? 'in-view' : ''}`} style={{ position: 'relative' }}>
          <h2 className="contact-title">Let's build something that ships.</h2>
          <p className="contact-subtitle">
            Open to AI/ML Engineer roles in India and the UAE. If you're building systems that require both empathy for the user and rigorous engineering under the hood, I'd love to connect.
          </p>
          
          <div className="contact-actions" style={{ flexWrap: 'wrap' }}>
            <div className="email-group" style={{ display: 'flex', gap: '0.5rem', background: 'rgba(255,255,255,0.05)', padding: '0.5rem', borderRadius: '8px', alignItems: 'center' }}>
              <a href="mailto:rizvinmk@gmail.com" className="btn btn-primary" style={{ margin: 0 }}>
                <Mail size={18} /> Email Me
              </a>
              <button onClick={handleCopyEmail} className="btn btn-ghost" style={{ margin: 0, padding: '0.75rem', position: 'relative' }} title="Copy Email">
                {copied ? <Check size={18} className="text-green-400" /> : <Copy size={18} />}
              </button>
            </div>

            <a href="https://linkedin.com/in/mohammed-rizvin-mk" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              <FaLinkedin size={18} /> LinkedIn
            </a>
            <a href="https://github.com/rzvn6660" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              <FaGithub size={18} /> GitHub
            </a>
          </div>

          {copied && (
            <div className="toast-notification animate-up" style={{
              position: 'absolute', bottom: '-40px', left: '50%', transform: 'translateX(-50%)',
              background: 'var(--color-primary)', color: '#000', padding: '0.5rem 1rem', borderRadius: '4px', fontWeight: 'bold', fontSize: '0.9rem', whiteSpace: 'nowrap'
            }}>
              Email copied!
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
