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
        
        <div className="certifications-grid" ref={ref}>
          {certifications.map((cert, index) => (
            <div 
              key={cert.id} 
              className={`cert-card glass-panel animate-up ${inView ? 'in-view' : ''}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="cert-header">
                <div className="cert-icon-wrapper">
                  <Award size={24} color="var(--color-accent-secondary)" />
                </div>
                <div>
                  <h3 className="cert-title">{cert.title}</h3>
                  <div className="cert-meta text-mono">
                    <span>{cert.issuer} • {cert.date}</span>
                    {cert.credentialId && <span>ID: {cert.credentialId}</span>}
                  </div>
                </div>
              </div>
              
              <p className="cert-description">
                {cert.description}
              </p>
              
              <div className="cert-skills">
                {cert.skills.map(skill => (
                  <span key={skill} className="tech-badge">{skill}</span>
                ))}
              </div>

              {cert.link && (
                <div className="cert-footer">
                  <a href={cert.link} target="_blank" rel="noopener noreferrer" className="btn btn-ghost verify-btn">
                    Verify Credential <ExternalLink size={16} />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
