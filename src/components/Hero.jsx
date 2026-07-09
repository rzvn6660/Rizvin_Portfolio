import React, { useEffect, useState } from 'react';
import AuroraBackground from './AuroraBackground';
import { Download } from 'lucide-react';
import './Hero.css';

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section id="hero" className="hero-section">
      <AuroraBackground />
      <div className="container hero-container">
        <div className="hero-content">
          
          <div className={`hero-eyebrow text-mono ${mounted ? 'animate-up' : ''}`} style={{ transitionDelay: '100ms' }}>
            <span className="eyebrow-text">AI ENGINEER — GENERATIVE AI · LLM AGENTS · SPEECH AI</span>
            <div className="status-chip">
              <span className="status-dot-green"></span>
              Open to Junior AI/ML Engineer roles — India · UAE
            </div>
          </div>

          <h1 className={`hero-title ${mounted ? 'animate-up' : ''}`} style={{ transitionDelay: '200ms' }}>
            I design and ship <span className="text-gradient">AI systems</span> — from multilingual speech pipelines to LLM-orchestrated agents.
          </h1>

          <p className={`hero-subtitle ${mounted ? 'animate-up' : ''}`} style={{ transitionDelay: '300ms' }}>
            Building tools that solve real human problems across healthcare accessibility and low-resource languages. Currently seeking Junior AI/ML roles in India and the UAE.
          </p>

          <div className={`hero-cta-row ${mounted ? 'animate-up' : ''}`} style={{ transitionDelay: '400ms' }}>
            <a href="#featured-project" className="btn btn-primary">View Projects</a>
            <a href="/resume" className="btn btn-ghost">
              <Download size={18} />
              Download Résumé
            </a>
          </div>

        </div>
        
        <div className={`hero-visual ${mounted ? 'animate-up' : ''}`} style={{ transitionDelay: '500ms' }}>
          <div className="glass-panel abstract-visual">
            <svg viewBox="0 0 100 100" className="abstract-svg">
              <path d="M10,50 Q25,10 50,50 T90,50" fill="none" stroke="var(--color-accent-primary)" strokeWidth="2" className="waveform path-1" />
              <path d="M10,50 Q25,90 50,50 T90,50" fill="none" stroke="var(--color-accent-secondary)" strokeWidth="2" className="waveform path-2" />
              <circle cx="50" cy="50" r="3" fill="var(--color-text-primary)" className="node node-center" />
              <circle cx="30" cy="30" r="2" fill="var(--color-text-secondary)" className="node node-1" />
              <circle cx="70" cy="70" r="2" fill="var(--color-text-secondary)" className="node node-2" />
            </svg>
          </div>
        </div>

      </div>
    </section>
  );
}
