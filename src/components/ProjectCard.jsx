import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';
import './ProjectCard.css';

export default function ProjectCard({ project, index = 0 }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div 
      ref={ref}
      className={`project-card glass-panel glass-panel-hover ${project.featured ? 'featured' : ''} ${inView ? 'in-view' : ''}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="project-card-header">
        {project.architectureImage && (
          <div className="project-card-image">
            <img src={project.architectureImage} alt={project.title} loading="lazy" />
          </div>
        )}
        <div className="project-badges">
          <span className={`status-badge status-${project.statusColor}`}>
            {project.statusColor === 'progress' && <span className="status-dot pulse"></span>}
            {project.statusColor === 'shipped' && <span className="status-dot"></span>}
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
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-ghost" aria-label="GitHub">
              <FaGithub size={18} /> Code
            </a>
          )}
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noopener noreferrer" className="btn btn-ghost" aria-label="Live Demo">
              <ExternalLink size={18} /> Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
