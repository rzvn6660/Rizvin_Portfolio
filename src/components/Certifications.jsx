import React from 'react';
import { certifications } from '../data/certifications';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Award } from 'lucide-react';
import './Certifications.css';

export default function Certifications() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="certifications" className="section-padding">
      <div className="container">
        <div className="section-header text-center">
          <h2 className="section-title">Professional Certifications</h2>
          <p className="section-subtitle">Continuous Learning & Upskilling</p>
        </div>
        
        <div className="certifications-grid" ref={ref} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
          {certifications.map((cert, index) => (
            <div 
              key={cert.id} 
              className={`cert-card glass-panel animate-up ${inView ? 'in-view' : ''}`}
              style={{ transitionDelay: `${index * 150}ms`, display: 'flex', flexDirection: 'column' }}
            >
              <div className="cert-header" style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ padding: '1rem', background: 'rgba(0,229,255,0.1)', borderRadius: '12px' }}>
                  <Award size={24} color="var(--color-accent-secondary)" />
                </div>
                <div>
                  <h3 className="cert-title" style={{ margin: '0 0 0.5rem 0', fontSize: '1.2rem', lineHeight: 1.4 }}>{cert.title}</h3>
                  <div className="cert-meta text-mono" style={{ fontSize: '0.8rem', color: 'var(--color-text-tertiary)', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                    <span>{cert.issuer} • {cert.date}</span>
                    {cert.credentialId && <span>ID: {cert.credentialId}</span>}
                  </div>
                </div>
              </div>
              
              <p className="cert-description" style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, flexGrow: 1, marginBottom: '1.5rem' }}>
                {cert.description}
              </p>
              
              <div className="cert-skills" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
                {cert.skills.map(skill => (
                  <span key={skill} className="tech-badge">{skill}</span>
                ))}
              </div>

              {cert.link && (
                <a href={cert.link} target="_blank" rel="noopener noreferrer" className="btn btn-ghost" style={{ width: '100%', justifyContent: 'center', display: 'flex', gap: '0.5rem' }}>
                  Verify Credential <ExternalLink size={16} />
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
