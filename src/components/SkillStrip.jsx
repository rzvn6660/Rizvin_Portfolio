import React from 'react';
import { useInView } from 'react-intersection-observer';
import { Brain, Cpu, Server } from 'lucide-react';
import { skillCategories } from '../data/skills';
import './SkillStrip.css';

const CATEGORY_ICONS = {
  'core-ai': Brain,
  'frameworks-tooling': Cpu,
  'backend-infrastructure': Server
};

export default function SkillStrip() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.15
  });

  return (
    <section id="focus" className="section-padding technical-focus-section" aria-label="Technical Focus">
      <div className="container" ref={ref}>
        <div className="section-header">
          <h2 className="section-title">Technical Focus</h2>
          <p className="section-subtitle">
            AI systems, intelligent agents, speech, and multimodal engineering.
          </p>
        </div>

        <div className={`skills-grid ${inView ? 'in-view' : ''}`}>
          {skillCategories.map((cat, idx) => {
            const Icon = CATEGORY_ICONS[cat.id] || Brain;
            return (
              <div
                key={cat.id}
                className="skills-category-card glass-panel"
                style={{ '--card-delay': `${idx * 120}ms` }}
              >
                <div className="category-header">
                  <div className={`category-icon-wrap category-icon-${cat.id}`}>
                    <Icon size={20} aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="category-title">{cat.title}</h3>
                    <p className="category-subtitle">{cat.subtitle}</p>
                  </div>
                </div>

                <div className="skills-pill-group" role="list">
                  {cat.skills.map((skill) => (
                    <span key={skill} className="skill-pill" role="listitem">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
