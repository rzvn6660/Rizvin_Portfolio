import React, { useState } from 'react';
import { Mail, Copy, Check, Send } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
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
    window.location.href = `mailto:rizvinmk@gmail.com?subject=Contact from ${formData.name}&body=${formData.message}`;
  };

  return (
    <section id="contact" className="section-padding contact-section">
      <div className="container" ref={ref}>
        <motion.div 
          className="contact-content glass-panel" 
          style={{ position: 'relative', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', padding: '4rem' }}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          
          <div className="contact-info-side">
            <h2 className="contact-title" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Let's build something that ships.</h2>
            <p className="contact-subtitle" style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
              Open to AI/ML Engineer roles in India and the UAE. If you're building systems that require both empathy for the user and rigorous engineering under the hood, I'd love to connect.
            </p>
            
            <div className="contact-actions" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="email-group" style={{ display: 'flex', gap: '0.5rem', background: 'rgba(255,255,255,0.03)', padding: '0.5rem', borderRadius: '12px', alignItems: 'center', width: 'fit-content', border: '1px solid rgba(255,255,255,0.05)' }}>
                <a href="mailto:rizvinmk@gmail.com" className="btn btn-primary" style={{ margin: 0 }}>
                  <Mail size={18} /> rizvinmk@gmail.com
                </a>
                <button onClick={handleCopyEmail} className="btn btn-ghost" style={{ margin: 0, padding: '0.75rem', position: 'relative' }} title="Copy Email">
                  {copied ? <Check size={18} className="text-green-400" /> : <Copy size={18} />}
                </button>
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <a href="https://linkedin.com/in/mohammed-rizvin-mk" target="_blank" rel="noopener noreferrer" className="btn btn-ghost" style={{ flex: 1 }}>
                  <FaLinkedin size={18} /> LinkedIn
                </a>
                <a href="https://github.com/rzvn6660" target="_blank" rel="noopener noreferrer" className="btn btn-ghost" style={{ flex: 1 }}>
                  <FaGithub size={18} /> GitHub
                </a>
              </div>
            </div>

            {copied && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="toast-notification" 
                style={{
                  position: 'absolute', bottom: '20px', left: '20px',
                  background: 'var(--color-accent-secondary)', color: '#000', padding: '0.5rem 1rem', borderRadius: '8px', fontWeight: 'bold', fontSize: '0.9rem'
                }}
              >
                Email copied to clipboard!
              </motion.div>
            )}
          </div>

          <div className="contact-form-side">
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div className="input-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', fontWeight: 500 }}>Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '8px', color: '#fff', fontSize: '1rem', outline: 'none', transition: 'border-color 0.3s' }}
                  onFocus={e => e.target.style.borderColor = 'var(--color-accent-secondary)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                />
              </div>
              <div className="input-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', fontWeight: 500 }}>Message</label>
                <textarea 
                  required
                  rows="4"
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                  style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '8px', color: '#fff', fontSize: '1rem', outline: 'none', resize: 'none', transition: 'border-color 0.3s' }}
                  onFocus={e => e.target.style.borderColor = 'var(--color-accent-secondary)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                ></textarea>
              </div>
              <button type="submit" className="btn btn-secondary" style={{ padding: '1rem', marginTop: '0.5rem', display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                Send Message <Send size={18} />
              </button>
            </form>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
