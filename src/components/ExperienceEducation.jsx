import React from 'react';
import { useInView } from 'react-intersection-observer';
import { Briefcase, GraduationCap, Calendar, MapPin } from 'lucide-react';
import { experiences, education } from '../data/experience';
import './ExperienceEducation.css';

export default function ExperienceEducation() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="experience" className="section-padding experience-section" aria-label="Experience and Education">
      <div className="container" ref={ref}>
        <div className="section-header">
          <h2 className="section-title">Experience &amp; Education</h2>
          <p className="section-subtitle">
            Professional internships and foundational academic engineering background.
          </p>
        </div>

        <div className={`experience-education-grid ${inView ? 'in-view' : ''}`}>
          {/* Experience Column */}
          <div className="exp-column">
            <div className="column-header">
              <div className="column-icon-wrap column-icon-exp">
                <Briefcase size={20} aria-hidden="true" />
              </div>
              <div>
                <h3 className="column-title">Work Experience</h3>
                <span className="column-subtitle">Technical Internships</span>
              </div>
            </div>

            <div className="timeline-list">
              {experiences.map((item, idx) => (
                <article
                  key={item.id}
                  className="timeline-card glass-panel"
                  style={{ '--card-delay': `${idx * 120}ms` }}
                >
                  <div className="card-top-row">
                    <div>
                      <h4 className="card-role">{item.role}</h4>
                      <span className="card-org">{item.organization}</span>
                    </div>
                    <span className="period-pill text-mono">
                      <Calendar size={12} aria-hidden="true" />
                      {item.period}
                    </span>
                  </div>

                  <div className="card-location text-mono">
                    <MapPin size={12} aria-hidden="true" />
                    <span>{item.location}</span>
                  </div>

                  <p className="card-desc">{item.description}</p>

                  <div className="card-skills">
                    {item.skills.map((skill) => (
                      <span key={skill} className="exp-skill-pill">{skill}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Education Column */}
          <div className="exp-column">
            <div className="column-header">
              <div className="column-icon-wrap column-icon-edu">
                <GraduationCap size={20} aria-hidden="true" />
              </div>
              <div>
                <h3 className="column-title">Academic Background</h3>
                <span className="column-subtitle">Undergraduate Degree</span>
              </div>
            </div>

            <div className="timeline-list">
              {education.map((item, idx) => (
                <article
                  key={item.id}
                  className="timeline-card glass-panel"
                  style={{ '--card-delay': `${(idx + 2) * 120}ms` }}
                >
                  <div className="card-top-row">
                    <div>
                      <h4 className="card-role">{item.degree}</h4>
                      <span className="card-org">{item.institution}</span>
                    </div>
                    <span className="score-pill text-mono">
                      {item.score}
                    </span>
                  </div>

                  <div className="edu-meta-row">
                    <span className="edu-university">{item.university}</span>
                    <span className="period-pill text-mono">
                      <Calendar size={12} aria-hidden="true" />
                      {item.period}
                    </span>
                  </div>

                  <div className="card-location text-mono">
                    <MapPin size={12} aria-hidden="true" />
                    <span>{item.location}</span>
                  </div>

                  <p className="card-desc">{item.description}</p>

                  <div className="card-skills">
                    {item.skills.map((skill) => (
                      <span key={skill} className="exp-skill-pill">{skill}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
