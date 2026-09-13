import React from 'react';
import { useInView } from 'react-intersection-observer';
import { FaGithub } from 'react-icons/fa';
import { ArrowUpRight, ExternalLink, Code2 } from 'lucide-react';
import './GitHubSection.css';

const publicRepos = [
  {
    name: 'orma-ai',
    url: 'https://github.com/rzvn6660/orma-ai',
    description: 'Assistive voice-first AI memory & daily living companion with deterministic medication adherence and emergency escalation.',
    lang: 'Python',
    stack: ['FastAPI', 'LangGraph', 'Docker', 'React']
  },
  {
    name: 'Multilingual-AI',
    url: 'https://github.com/rzvn6660/Multilingual-AI',
    description: 'Speech-to-speech AI assistant for Santali tribal communities integrating low-resource ASR, neural machine translation, and LLM reasoning.',
    lang: 'Python',
    stack: ['IndicConformer', 'IndicTrans2', 'Flask', 'Docker']
  },
  {
    name: 'Medi-fy',
    url: 'https://github.com/rzvn6660/Medi-fy',
    description: 'Computer vision and NLP system extracting drug dosage and usage from medicine packaging with OpenFDA validation.',
    lang: 'Python',
    stack: ['OpenCV', 'Pytesseract OCR', 'NLP', 'Gradio']
  }
];

export default function GitHubSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="github" className="section-padding github-section" aria-label="Open Source and Engineering">
      <div className="container" ref={ref}>
        <div className="section-header">
          <h2 className="section-title">Open Source &amp; Engineering</h2>
          <p className="section-subtitle">
            Public codebases, modular architectures, and reproducible AI systems.
          </p>
        </div>

        <div className={`github-layout ${inView ? 'in-view' : ''}`}>
          {/* Profile & Engineering Overview Card */}
          <div className="github-profile-card glass-panel">
            <div>
              <div className="profile-card-header">
                <div className="github-avatar-wrap">
                  <FaGithub size={26} aria-hidden="true" />
                </div>
                <div>
                  <span className="profile-handle-label">GitHub Profile</span>
                  <h3 className="profile-handle">github.com/rzvn6660</h3>
                </div>
              </div>

              <p className="profile-card-desc">
                All primary AI systems are developed openly with reproducible pipelines, Docker containerization, and documented engineering architectures.
              </p>

              <div className="engineering-standards-list">
                <div className="standard-item">
                  <Code2 size={15} className="standard-icon" aria-hidden="true" />
                  <span>Modular Python services &amp; typed REST APIs</span>
                </div>
                <div className="standard-item">
                  <Code2 size={15} className="standard-icon" aria-hidden="true" />
                  <span>Containerized deployments for reproducible runs</span>
                </div>
                <div className="standard-item">
                  <Code2 size={15} className="standard-icon" aria-hidden="true" />
                  <span>Open schemas, pipeline benchmarks, and trade-offs</span>
                </div>
              </div>
            </div>

            <a
              href="https://github.com/rzvn6660"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary github-profile-btn"
              aria-label="View Mohammed Rizvin's GitHub profile (opens in new tab)"
            >
              <FaGithub size={18} aria-hidden="true" />
              <span>View GitHub Profile</span>
              <ExternalLink size={15} aria-hidden="true" />
            </a>
          </div>

          {/* Clean Public Repositories Directory */}
          <div className="github-repos-directory" role="list" aria-label="Featured Public Repositories">
            {publicRepos.map((repo, idx) => (
              <a
                key={repo.name}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="github-repo-row glass-panel"
                role="listitem"
                style={{ '--row-delay': `${(idx + 1) * 100}ms` }}
                aria-label={`${repo.name} repository on GitHub (opens in new tab)`}
              >
                <div className="repo-row-top">
                  <div className="repo-row-title-wrap">
                    <h4 className="repo-row-name">{repo.name}</h4>
                    <span className="repo-lang-badge">
                      <span className="lang-indicator" aria-hidden="true"></span>
                      {repo.lang}
                    </span>
                  </div>
                  <div className="repo-row-action" aria-hidden="true">
                    <ArrowUpRight size={18} />
                  </div>
                </div>

                <p className="repo-row-desc">{repo.description}</p>

                <div className="repo-row-stack">
                  {repo.stack.map((item) => (
                    <span key={item} className="repo-stack-pill">{item}</span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
