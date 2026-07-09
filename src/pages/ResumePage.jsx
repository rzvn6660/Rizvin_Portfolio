import React, { useState, useEffect } from 'react';
import { Download, ExternalLink, FileText } from 'lucide-react';
import './ResumePage.css';

export default function ResumePage() {
  const [resumes, setResumes] = useState({
    india: { exists: false, lastModified: null, loading: true },
    uae: { exists: false, lastModified: null, loading: true }
  });

  useEffect(() => {
    const checkResume = async (region, path) => {
      try {
        const res = await fetch(path, { method: 'HEAD' });
        if (res.ok) {
          const lastModified = res.headers.get('Last-Modified');
          setResumes(prev => ({
            ...prev,
            [region]: { 
              exists: true, 
              lastModified: lastModified ? new Date(lastModified).toLocaleDateString() : 'Recently Updated',
              loading: false
            }
          }));
        } else {
          setResumes(prev => ({ ...prev, [region]: { exists: false, loading: false } }));
        }
      } catch (err) {
        setResumes(prev => ({ ...prev, [region]: { exists: false, loading: false } }));
      }
    };

    checkResume('india', '/resume/resume-india.pdf');
    checkResume('uae', '/resume/resume-uae.pdf');
  }, []);

  return (
    <div className="page-padding resume-page">
      <div className="container resume-container">
        
        <div className="resume-header text-center" style={{ marginBottom: '3rem' }}>
          <h1 className="resume-title">Professional Résumés</h1>
          <p className="resume-subtitle">Select the version tailored for your region and hiring needs.</p>
        </div>

        <div className="resume-cards-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          
          {resumes.india.loading ? <div className="glass-panel text-center">Loading...</div> : resumes.india.exists && (
            <div className="resume-card glass-panel animate-up" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', position: 'relative', overflow: 'hidden' }}>
              <div className="resume-card-header" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontSize: '2rem' }}>🇮🇳</span>
                <h2 style={{ margin: 0, fontSize: '1.5rem' }}>Resume - India</h2>
              </div>
              {resumes.india.lastModified && (
                <span className="text-mono" style={{ fontSize: '0.8rem', color: 'var(--color-text-tertiary)' }}>Last Updated: {resumes.india.lastModified}</span>
              )}
              <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.6, flexGrow: 1 }}>
                Optimized for AI Engineer, Machine Learning Engineer, Python Developer, NLP Engineer, Data Scientist, and Software Engineer roles in India.
              </p>
              <div className="resume-card-actions" style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <a href="/resume/resume-india.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ flex: 1, textAlign: 'center', display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                  <ExternalLink size={18} /> View
                </a>
                <a href="/resume/resume-india.pdf" download="Mohammed-Rizvin-Resume-India.pdf" className="btn btn-secondary" style={{ flex: 1, textAlign: 'center', display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                  <Download size={18} /> Download
                </a>
              </div>
            </div>
          )}

          {resumes.uae.loading ? <div className="glass-panel text-center">Loading...</div> : resumes.uae.exists && (
            <div className="resume-card glass-panel animate-up" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', position: 'relative', overflow: 'hidden', transitionDelay: '100ms' }}>
              <div className="resume-card-header" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontSize: '2rem' }}>🇦🇪</span>
                <h2 style={{ margin: 0, fontSize: '1.5rem' }}>Resume - UAE</h2>
              </div>
              {resumes.uae.lastModified && (
                <span className="text-mono" style={{ fontSize: '0.8rem', color: 'var(--color-text-tertiary)' }}>Last Updated: {resumes.uae.lastModified}</span>
              )}
              <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.6, flexGrow: 1 }}>
                Optimized for AI Engineer, Generative AI Engineer, LLM Engineer, AI Agent Developer, NLP Engineer, Computer Vision Engineer, and Python Developer roles in UAE companies.
              </p>
              <div className="resume-card-actions" style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <a href="/resume/resume-uae.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ flex: 1, textAlign: 'center', display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                  <ExternalLink size={18} /> View
                </a>
                <a href="/resume/resume-uae.pdf" download="Mohammed-Rizvin-Resume-UAE.pdf" className="btn btn-secondary" style={{ flex: 1, textAlign: 'center', display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                  <Download size={18} /> Download
                </a>
              </div>
            </div>
          )}

          {!resumes.india.loading && !resumes.uae.loading && !resumes.india.exists && !resumes.uae.exists && (
            <div className="glass-panel text-center" style={{ gridColumn: '1 / -1', padding: '3rem' }}>
              <FileText size={48} style={{ opacity: 0.5, margin: '0 auto 1rem' }} />
              <h3>Resumes Not Uploaded Yet</h3>
              <p style={{ color: 'var(--color-text-tertiary)' }}>Please place <code>resume-india.pdf</code> and <code>resume-uae.pdf</code> in the <code>public/resume/</code> folder.</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
