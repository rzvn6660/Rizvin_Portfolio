import React from 'react';
import Hero from '../components/Hero';
import SkillStrip from '../components/SkillStrip';
import ProjectCard from '../components/ProjectCard';
import GitHubSection from '../components/GitHubSection';
import Certifications from '../components/Certifications';
import Contact from '../components/Contact';
import { projects } from '../data/projects';

export default function Home() {
  const featuredProject = projects.find(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);

  return (
    <>
      <Hero />
      <SkillStrip />
      
      <section id="projects" className="section-padding">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Selected Work</h2>
            <p className="section-subtitle">Systems in production & development.</p>
          </div>
          
          <div className="projects-grid">
            {featuredProject && (
              <ProjectCard project={featuredProject} index={0} />
            )}
            
            {otherProjects.map((project, idx) => (
              <ProjectCard key={project.slug} project={project} index={idx + 1} />
            ))}
          </div>
        </div>
      </section>

      <GitHubSection />
      <Certifications />
      <Contact />
    </>
  );
}
