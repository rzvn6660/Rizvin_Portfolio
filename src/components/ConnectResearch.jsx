import React from 'react';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { BookOpen, ArrowUpRight } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import './ConnectResearch.css';

const connectItems = [
  {
    id: 'linkedin',
    badge: 'Professional Network',
    title: 'LinkedIn',
    description: 'Professional Profile',
    action: 'View Profile',
    url: 'https://www.linkedin.com/in/mohammed-rizvin-mk/',
    icon: FaLinkedin,
    iconClass: 'icon-linkedin',
    ariaLabel: "LinkedIn — Mohammed Rizvin MK's professional profile (opens in new tab)"
  },
  {
    id: 'github',
    badge: 'Code & Open Source',
    title: 'GitHub',
    description: 'Projects & Open Source',
    action: 'Explore GitHub',
    url: 'https://github.com/rzvn6660',
    icon: FaGithub,
    iconClass: 'icon-github',
    ariaLabel: "GitHub — Mohammed Rizvin MK's projects and open source repositories (opens in new tab)"
  },
  {
    id: 'ijert',
    badge: 'Research Publication',
    title: 'IJERT Publication',
    description: 'Voice to Empower: A Multilingual AI Solution for Tribal Inclusion',
    action: 'Read Publication',
    url: 'https://www.ijert.org/voice-to-empower-a-multilingual-ai-solution-for-tribal-inclusion-ijertv15is080183',
    icon: BookOpen,
    iconClass: 'icon-publication',
    ariaLabel: 'IJERT Publication — Voice to Empower: A Multilingual AI Solution for Tribal Inclusion (opens in new tab)'
  }
];

export default function ConnectResearch() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section id="connect-research" className="connect-research-section" aria-label="Connect and Research">
      <div className="container" ref={ref}>
        <div className="section-header">
          <h2 className="section-title">Connect &amp; Research</h2>
          <p className="section-subtitle">
            Find me professionally, explore my work, and read my research.
          </p>
        </div>

        <div className={`connect-research-grid ${inView ? 'in-view' : ''}`}>
          {connectItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`connect-research-card glass-panel connect-card-${item.id}`}
                aria-label={item.ariaLabel}
              >
                <div className="connect-card-top">
                  <span className="connect-card-badge">{item.badge}</span>
                  <div className={`connect-card-icon-wrap ${item.iconClass}`}>
                    <IconComponent size={20} aria-hidden="true" />
                  </div>
                </div>

                <div className="connect-card-body">
                  <h3 className="connect-card-title">{item.title}</h3>
                  <p className="connect-card-desc">{item.description}</p>
                </div>

                <div className="connect-card-footer">
                  <span className="connect-card-action">
                    <span>{item.action}</span>
                    <ArrowUpRight size={15} aria-hidden="true" />
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
