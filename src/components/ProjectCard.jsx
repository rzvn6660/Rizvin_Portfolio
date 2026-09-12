import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';
import './ProjectCard.css';

export default function ProjectCard({ project, index = 0 }) {
  const { ref: inViewRef, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Lightweight pointer tracking on hover-capable devices (Inspired by 21st.dev ID 59)
  const handlePointerMove = (e) => {
    if (e.pointerType !== 'mouse') return;
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  const handlePointerEnter = (e) => {
    if (e.pointerType !== 'mouse') return;
    setIsHovered(true);
    handlePointerMove(e);
  };

  const handlePointerLeave = (e) => {
    if (e.pointerType !== 'mouse') return;
    setIsHovered(false);
  };

  // Combine refs for in-view intersection and DOM manipulation
  const setRefs = (node) => {
    cardRef.current = node;
    inViewRef(node);
  };

  return (
    <div 
      ref={setRefs}
      className={`project-card glass-panel glass-panel-hover ${project.featured ? 'featured' : ''} ${inView ? 'in-view' : ''} ${isHovered ? 'hovered' : ''}`}
      style={{ transitionDelay: `${index * 80}ms` }}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      {/* Subtle Glow Layers inspired by 21st.dev ID 59 (Glow Effect by ibelick) */}
      <div className="project-card-glow" aria-hidden="true" />
      <div className="project-card-border-glow" aria-hidden="true" />

      <div className="project-card-header">
        {project.architectureImage && (
          <div className="project-card-image">
            <img src={project.architectureImage} alt={project.title} loading="lazy" />
          </div>
        )}
        <div className="project-badges">
          <span className={`status-badge status-${project.statusColor}`}>
            {project.statusColor === 'progress' && <span className="status-dot pulse" aria-hidden="true"></span>}
            {project.statusColor === 'shipped' && <span className="status-dot" aria-hidden="true"></span>}
            <span className="text-mono">{project.status}</span>
          </span>
        </div>
        <h3 className="project-title">{project.title}</h3>
        <p className="project-tagline">{project.tagline}</p>
      </div>
      
      <div className="project-card-body">
        {project.summary && (
          <p className="project-summary">{project.summary}</p>
        )}
        
        <div className="project-stack">
          {project.stack.map(tech => (
            <span key={tech} className="tech-chip text-mono">{tech}</span>
          ))}
        </div>
      </div>
      
      <div className="project-card-footer">
        <Link to={`/projects/${project.slug}`} className="btn btn-primary" style={{ flexGrow: 1, textAlign: 'center', justifyContent: 'center' }}>
          View case study →
        </Link>
        <div className="project-links">
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-ghost" aria-label={`View ${project.title} source code on GitHub`}>
              <FaGithub size={18} aria-hidden="true" /> Code
            </a>
          )}
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noopener noreferrer" className="btn btn-ghost" aria-label={`Open ${project.title} live demo`}>
              <ExternalLink size={18} aria-hidden="true" /> Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
