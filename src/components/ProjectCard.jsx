import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';
import './ProjectCard.css';

export default function ProjectCard({ project, index = 0 }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <article 
      ref={ref}
      className={`project-card ${project.featured ? 'featured' : ''} ${inView ? 'in-view' : ''}`}
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      <div className="project-card-header">
        {project.architectureImage && (
          <div className="project-card-image">
            <img 
              src={project.architectureImage} 
              alt={`${project.title} Architecture Preview`} 
              loading="lazy" 
            />
            <span className="image-preview-tag">System Architecture</span>
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
        
        <div className="project-stack" aria-label="Technologies used">
          {project.stack.map(tech => (
            <span key={tech} className="tech-chip text-mono">{tech}</span>
          ))}
        </div>
      </div>
      
      <div className="project-card-footer">
        <Link 
          to={`/projects/${project.slug}`} 
          className="btn btn-primary project-case-study-btn"
          aria-label={`View ${project.title} case study`}
        >
          <span>View case study</span>
          <ArrowRight size={14} aria-hidden="true" />
        </Link>
        <div className="project-links">
          {project.github && (
            <a 
              href={project.github} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-ghost" 
              aria-label={`View ${project.title} source code on GitHub`}
            >
              <FaGithub size={16} aria-hidden="true" />
              <span>Code</span>
            </a>
          )}
          {project.demo && (
            <a 
              href={project.demo} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-ghost" 
              aria-label={`Open ${project.title} live demo`}
            >
              <ExternalLink size={16} aria-hidden="true" />
              <span>Demo</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
