import React, { useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { projects } from '../data/projects';
import './ProjectCaseStudy.css';

export default function ProjectCaseStudy() {
  const { slug } = useParams();
  const projectIndex = projects.findIndex(p => p.slug === slug);
  const project = projects[projectIndex];
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) {
    return <Navigate to="/404" />;
  }

  const nextProject = projects[(projectIndex + 1) % projects.length];

  return (
    <article className="case-study page-padding">
      <div className="container case-study-container">
        
        <div className="case-study-header glass-panel">
          <div className="breadcrumb">
            <Link to="/#projects" className="back-link"><ArrowLeft size={16} /> Back to projects</Link>
          </div>
          
          <div className="case-study-title-group">
            <div className="project-badges">
              <span className={`status-badge status-${project.statusColor}`}>
                {project.statusColor === 'progress' && <span className="status-dot pulse"></span>}
                {project.statusColor === 'shipped' && <span className="status-dot"></span>}
                <span className="text-mono">{project.status}</span>
              </span>
            </div>
            <h1 className="cs-title">{project.title}</h1>
            <p className="cs-tagline">{project.tagline}</p>
            
            <div className="cs-stack text-mono">
              {project.stack.map(tech => (
                <span key={tech} className="cs-tech-chip">{tech}</span>
              ))}
            </div>
            
            <div className="cs-links">
              {project.github ? (
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  <FaGithub size={18} /> View on GitHub
                </a>
              ) : (
                <button className="btn btn-primary disabled" disabled title="Repository private or coming soon">
                  <FaGithub size={18} /> Source code coming soon
                </button>
              )}
              {project.docs ? (
                <a href={project.docs} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                  <ExternalLink size={18} /> Documentation
                </a>
              ) : null}
            </div>
          </div>
        </div>

        {project.progressItems && (
          <div className="cs-section glass-panel">
            <h2>Development Status</h2>
            <div className="status-grid">
              {project.progressItems.map(item => (
                <div key={item.label} className="status-item">
                  <span className="item-label">{item.label}</span>
                  <span className={`item-status text-mono status-${item.status.toLowerCase().replace(' ', '-')}`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="cs-content">
          <section className="cs-section">
            <h2>1. The Problem</h2>
            <p>{project.problem}</p>
          </section>

          <section className="cs-section">
            <h2>2. Research & Approach</h2>
            <p>{project.research}</p>
          </section>

          <section className="cs-section">
            <h2>3. Architecture & System Design</h2>
            
            {project.architectureImage ? (
              <div className="diagram-image-container">
                <img src={project.architectureImage} alt={`${project.title} Architecture Diagram`} className="architecture-image" />
              </div>
            ) : (
              <div className="diagram-placeholder glass-panel">
                <div className="diagram-content">
                  <span className="text-mono" style={{ color: 'var(--color-text-tertiary)' }}>
                    System Architecture Diagram<br />(Visual Placeholder)
                  </span>
                  <div className="abstract-nodes">
                    <div className="d-node">Input</div>
                    <div className="d-line"></div>
                    <div className="d-node core">Processing / LLM</div>
                    <div className="d-line"></div>
                    <div className="d-node">Output</div>
                  </div>
                </div>
              </div>
            )}
            
            <p>{project.architectureDescription}</p>
          </section>

          <section className="cs-section">
            <h2>4. Engineering Decisions</h2>
            <div className="decisions-list">
              {project.engineeringDecisions.map((decision, idx) => (
                <div key={idx} className="decision-card glass-panel">
                  <h3 className="decision-title">{decision.title}</h3>
                  <p className="decision-reasoning">{decision.reasoning}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="cs-section">
            <h2>5. Technical Challenges & Trade-offs</h2>
            <p>{project.tradeoffs}</p>
          </section>

          <section className="cs-section">
            <h2>6. Lessons Learned</h2>
            <p>{project.lessonsLearned}</p>
          </section>

          <section className="cs-section">
            <h2>7. Future Roadmap</h2>
            <p>{project.roadmap}</p>
          </section>
        </div>

        <div className="cs-footer">
          <Link to={`/projects/${nextProject.slug}`} className="next-project-card glass-panel glass-panel-hover">
            <span className="next-label">Next Project</span>
            <h3 className="next-title">{nextProject.title}</h3>
            <ArrowRight size={24} className="next-icon" />
          </Link>
        </div>
        
      </div>
    </article>
  );
}
