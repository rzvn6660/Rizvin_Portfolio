import React from 'react';
import { certifications } from '../data/certifications';
import { useInView } from 'react-intersection-observer';
import './Certifications.css';

export default function Certifications() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="certifications" className="section-padding">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Continuous Learning</h2>
          <p className="section-subtitle">Certifications & Training</p>
        </div>
        
        <div className="timeline-container" ref={ref}>
          <div className="timeline-line"></div>
          {certifications.map((cert, index) => (
            <div 
              key={cert.id} 
              className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'} ${inView ? 'in-view' : ''}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="timeline-dot"></div>
              <div className="timeline-content glass-panel glass-panel-hover">
                <div className="cert-meta">
                  <span className="cert-issuer text-mono">{cert.issuer}</span>
                  <span className="cert-date text-mono">{cert.date}</span>
                </div>
                <h3 className="cert-title">{cert.title}</h3>
                <p className="cert-description">{cert.description}</p>
                {cert.link && (
                  <a href={cert.link} target="_blank" rel="noopener noreferrer" className="cert-link text-mono">
                    Verify Credential →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
