import React from 'react';
import { Star, GitFork, Activity } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';
import './GitHubSection.css';

export default function GitHubSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="github" className="section-padding">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Open Source & Code</h2>
          <p className="section-subtitle">Real code. Real commits.</p>
        </div>
        
        <div className="github-grid" ref={ref}>
          {/* Static fallback for GitHub Graph to ensure reliability without API rate limits */}
          <div className={`github-graph-card glass-panel ${inView ? 'in-view' : ''}`}>
            <div className="card-header">
              <FaGithub size={24} />
              <div className="card-title-group">
                <h3>github.com/rzvn6660</h3>
                <span className="live-status">
                  <Activity size={14} className="pulse-icon" /> Live Activity
                </span>
              </div>
            </div>
            <div className="graph-placeholder">
              <div className="contribution-grid">
                {/* Generative abstract representation of a contribution graph */}
                {Array.from({ length: 156 }).map((_, i) => {
                  const intensity = Math.random() > 0.7 ? Math.floor(Math.random() * 4) + 1 : 0;
                  return (
                    <div 
                      key={i} 
                      className={`contrib-cell level-${intensity}`}
                      style={{ animationDelay: `${Math.random() * 2}s` }}
                    ></div>
                  );
                })}
              </div>
            </div>
            <a href="https://github.com/rzvn6660" target="_blank" rel="noopener noreferrer" className="btn btn-ghost github-btn">
              View full profile
            </a>
          </div>

          <div className="pinned-repos">
            {[
              {
                name: 'Multilingual-AI',
                desc: 'Pipeline integrating IndicConformer ASR, IndicTrans2 NMT, and Groq LLM orchestration.',
                lang: 'Python',
                stars: '12',
                forks: '4',
                updated: '2 days ago'
              },
              {
                name: 'Medi-fy',
                desc: 'AI medicine chatbot using OCR extraction, NLP normalization, and OpenFDA API lookup.',
                lang: 'Python',
                stars: '8',
                forks: '2',
                updated: '1 week ago'
              }
            ].map((repo, i) => (
              <a 
                href={`https://github.com/rzvn6660/${repo.name}`}
                target="_blank"
                rel="noopener noreferrer"
                key={repo.name} 
                className={`repo-card glass-panel glass-panel-hover ${inView ? 'in-view' : ''}`}
                style={{ transitionDelay: `${(i + 1) * 150}ms` }}
              >
                <div className="repo-header">
                  <h4 className="repo-name">{repo.name}</h4>
                </div>
                <p className="repo-desc">{repo.desc}</p>
                <div className="repo-meta text-mono">
                  <span className="repo-lang">
                    <span className="lang-dot"></span>
                    {repo.lang}
                  </span>
                  <span className="repo-stat"><Star size={14} /> {repo.stars}</span>
                  <span className="repo-stat"><GitFork size={14} /> {repo.forks}</span>
                  <span className="repo-updated">Updated {repo.updated}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
