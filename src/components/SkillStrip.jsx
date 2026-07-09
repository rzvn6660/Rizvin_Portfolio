import React from 'react';
import { skills } from '../data/skills';
import './SkillStrip.css';
import { useInView } from 'react-intersection-observer';

export default function SkillStrip() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section id="focus" className="section-padding">
      <div className="container" ref={ref}>
        <div className={`skill-strip ${inView ? 'in-view' : ''}`}>
          {skills.map((skill, index) => (
            <div 
              key={skill} 
              className="skill-chip glass-panel glass-panel-hover"
              style={{ transitionDelay: `${index * 40}ms` }}
            >
              <span className="text-mono">{skill}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
