import React, { useState } from 'react';
import { Download, FileText } from 'lucide-react';
import './ResumePage.css';

export default function ResumePage() {
  const [region, setRegion] = useState('uae'); // 'uae' or 'india'

  const handleDownload = () => {
    // In a real scenario, this would link to actual PDFs in the public folder
    const filename = region === 'uae' ? 'Mohammed-Rizvin-MK-Resume-UAE.pdf' : 'Mohammed-Rizvin-MK-Resume-India.pdf';
    alert(`Downloading ${filename} ... (Placeholder)`);
  };

  return (
    <div className="page-padding resume-page">
      <div className="container resume-container">
        
        <div className="resume-header">
          <h1 className="resume-title">Résumé</h1>
          <p className="resume-subtitle">Select the region-appropriate version below.</p>
        </div>

        <div className="resume-controls glass-panel">
          <div className="region-toggle">
            <button 
              className={`toggle-btn ${region === 'uae' ? 'active' : ''}`}
              onClick={() => setRegion('uae')}
            >
              UAE Version
            </button>
            <button 
              className={`toggle-btn ${region === 'india' ? 'active' : ''}`}
              onClick={() => setRegion('india')}
            >
              India / Kerala Version
            </button>
          </div>
          
          <button className="btn btn-primary" onClick={handleDownload}>
            <Download size={18} /> Download PDF
          </button>
        </div>

        <div className="experience-timeline glass-panel">
          <h3 className="timeline-title">Experience & Education Overview</h3>
          <div className="h-timeline">
            <div className="h-node">
              <span className="h-date text-mono">June 2024</span>
              <span className="h-title">STEM Robotics</span>
              <span className="h-desc">AI & Data Science Internship</span>
            </div>
            <div className="h-line"></div>
            <div className="h-node">
              <span className="h-date text-mono">June 2025</span>
              <span className="h-title">Retechnox</span>
              <span className="h-desc">Robotics & Automation Training</span>
            </div>
            <div className="h-line"></div>
            <div className="h-node">
              <span className="h-date text-mono">June 2026</span>
              <span className="h-title">B.Tech Completion</span>
              <span className="h-desc">MEA Engineering College</span>
            </div>
            <div className="h-line"></div>
            <div className="h-node active">
              <span className="h-date text-mono">Present</span>
              <span className="h-title">Job Search</span>
              <span className="h-desc">Junior AI/ML Engineer Roles</span>
            </div>
          </div>
        </div>

        <div className="resume-preview glass-panel">
          <div className="preview-placeholder">
            <FileText size={48} style={{ opacity: 0.5, marginBottom: '16px' }} />
            <p>Interactive PDF Preview (Placeholder)</p>
            <span className="text-mono" style={{ color: 'var(--color-text-tertiary)', marginTop: '8px' }}>
              Showing {region.toUpperCase()} variant
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
