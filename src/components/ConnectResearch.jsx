import React from 'react';
import { useInView } from 'react-intersection-observer';
import { BookOpen, ArrowUpRight } from 'lucide-react';
import './ConnectResearch.css';

const publicationData = {
  title: 'Voice to Empower: A Multilingual AI Solution for Tribal Inclusion',
  publisher: 'International Journal of Engineering Research & Technology (IJERT)',
  date: 'August 2026',
  doi: '10.5281/zenodo.21886786',
  doiUrl: 'https://doi.org/10.5281/zenodo.21886786',
  articleUrl: 'https://www.ijert.org/voice-to-empower-a-multilingual-ai-solution-for-tribal-inclusion-ijertv15is080183',
  description: 'Investigates speech-to-speech AI architectures for low-resource tribal languages, addressing compounding latency and domain-adaptation challenges across ASR, neural machine translation, and language model fallback pipelines.',
  topics: ['Speech AI', 'Low-Resource ASR', 'Neural Machine Translation', 'Digital Inclusion', 'Indic NLP']
};

export default function ConnectResearch() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section id="connect-research" className="section-padding research-section" aria-label="Research and Publication">
      <div className="container" ref={ref}>
        <div className="section-header">
          <h2 className="section-title">Research &amp; Publication</h2>
          <p className="section-subtitle">
            Peer-reviewed scientific research on speech AI, neural machine translation, and digital inclusion.
          </p>
        </div>

        <div className={`research-card-container ${inView ? 'in-view' : ''}`}>
          <article className="publication-card glass-panel">
            <div className="publication-card-header">
              <div className="publication-badge-group">
                <span className="publication-badge">
                  <BookOpen size={13} aria-hidden="true" />
                  Journal Paper
                </span>
                <span className="publication-journal-meta">
                  {publicationData.publisher} • {publicationData.date}
                </span>
              </div>
            </div>

            <div className="publication-card-body">
              <h3 className="publication-title">
                <a
                  href={publicationData.articleUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="publication-title-link"
                  aria-label={`Read ${publicationData.title} on IJERT (opens in new tab)`}
                >
                  <span>{publicationData.title}</span>
                  <ArrowUpRight size={22} className="pub-title-arrow" aria-hidden="true" />
                </a>
              </h3>

              <p className="publication-desc">
                {publicationData.description}
              </p>
            </div>

            <div className="publication-card-footer">
              <div className="publication-meta-item">
                <span className="meta-label">DOI:</span>
                <a
                  href={publicationData.doiUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="doi-link text-mono"
                  aria-label={`DOI: ${publicationData.doi} (opens in new tab)`}
                >
                  <span>{publicationData.doi}</span>
                  <ArrowUpRight size={13} aria-hidden="true" />
                </a>
              </div>

              <div className="publication-topics" aria-label="Research Topics">
                {publicationData.topics.map((topic) => (
                  <span key={topic} className="topic-pill">
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
