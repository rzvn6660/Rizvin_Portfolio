import React, { useState } from 'react';
import { Mail, Copy, Check, Send } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';
import './Contact.css';

export default function Contact() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('rizvinmk@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Inquiry from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:rizvinmk@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="section-padding contact-section" aria-label="Contact">
      <div className="container" ref={ref}>
        <div className={`contact-content glass-panel ${inView ? 'in-view' : ''}`}>
          
          <div className="contact-info-side">
            <h2 className="contact-title">Let's build something that ships.</h2>
            <p className="contact-subtitle">
              Open to AI/ML Engineer roles in India and the UAE. If you're building systems that require both empathy for the user and rigorous engineering under the hood, I'd love to connect.
            </p>
            
            <div className="contact-actions">
              <div className="email-group">
                <a href="mailto:rizvinmk@gmail.com" className="btn btn-primary email-main-btn" aria-label="Send email to rizvinmk@gmail.com">
                  <Mail size={17} aria-hidden="true" />
                  <span>rizvinmk@gmail.com</span>
                </a>
                <button 
                  type="button"
                  onClick={handleCopyEmail} 
                  className="btn btn-ghost copy-btn" 
                  title="Copy Email"
                  aria-label="Copy email address to clipboard"
                >
                  {copied ? <Check size={17} className="copy-success-icon" aria-hidden="true" /> : <Copy size={17} aria-hidden="true" />}
                </button>
              </div>

              <div className="social-links-group">
                <a 
                  href="https://linkedin.com/in/mohammed-rizvin-mk" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-ghost social-btn"
                  aria-label="LinkedIn Profile (opens in new tab)"
                >
                  <FaLinkedin size={17} aria-hidden="true" />
                  <span>LinkedIn</span>
                </a>
                <a 
                  href="https://github.com/rzvn6660" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-ghost social-btn"
                  aria-label="GitHub Profile (opens in new tab)"
                >
                  <FaGithub size={17} aria-hidden="true" />
                  <span>GitHub</span>
                </a>
              </div>
            </div>

            {copied && (
              <div 
                className="toast-notification" 
                role="status" 
                aria-live="polite"
              >
                Email copied to clipboard!
              </div>
            )}
          </div>

          <div className="contact-form-side">
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="input-group">
                <label htmlFor="contact-name">Name</label>
                <input 
                  id="contact-name"
                  name="name"
                  type="text" 
                  required
                  autoComplete="name"
                  placeholder="Your name or company"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="contact-input"
                />
              </div>

              <div className="input-group">
                <label htmlFor="contact-email">Email</label>
                <input 
                  id="contact-email"
                  name="email"
                  type="email" 
                  required
                  autoComplete="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  className="contact-input"
                />
              </div>

              <div className="input-group">
                <label htmlFor="contact-message">Message</label>
                <textarea 
                  id="contact-message"
                  name="message"
                  required
                  rows="4"
                  placeholder="Briefly describe your team, role, or project inquiry..."
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                  className="contact-input contact-textarea"
                ></textarea>
              </div>

              <button type="submit" className="btn btn-secondary submit-btn">
                <span>Send Message</span>
                <Send size={16} aria-hidden="true" />
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
