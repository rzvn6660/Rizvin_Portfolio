import React, { useState, useEffect } from 'react';
import { Download, ExternalLink, FileText, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
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
              lastModified: lastModified 
                ? new Date(lastModified).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) 
                : 'July 2026',
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 20 }
    }
  };

  return (
    <div className="resume-page-wrapper">
      <motion.div 
        className="resume-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
      >
        <h1 className="resume-title">Professional Resume Library</h1>
        <p className="resume-subtitle">Choose the resume version tailored to your target job market.</p>
        <div className="resume-divider"></div>
      </motion.div>

      <motion.div 
        className="resume-grid"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        
        {/* INDIA RESUME CARD */}
        {!resumes.india.loading && resumes.india.exists && (
          <motion.div variants={itemVariants} className="premium-card">
            <div className="country-badge">
              <span aria-hidden="true">🇮🇳</span> India
            </div>
            
            <h2 className="card-title">Resume - India</h2>
            <p className="card-description">
              Optimized for top-tier technology companies, research labs, and AI startups in the Indian tech ecosystem.
            </p>

            <div className="role-tags">
              <span className="role-tag">AI Engineer</span>
              <span className="role-tag">Python Developer</span>
              <span className="role-tag">Machine Learning</span>
              <span className="role-tag">NLP Engineer</span>
              <span className="role-tag">Data Scientist</span>
            </div>

            <div className="resume-preview-box">
              <FileText size={32} strokeWidth={1.5} />
              <span style={{ fontSize: '0.85rem' }}>PDF Document</span>
            </div>

            <div className="last-updated">
              <Clock size={14} /> Updated {resumes.india.lastModified}
            </div>

            <div className="action-buttons">
              <a href="/resume/resume-india.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-outline" aria-label="View India Resume">
                <ExternalLink size={16} /> View Resume
              </a>
              <a href="/resume/resume-india.pdf" download="Mohammed-Rizvin-Resume-India.pdf" className="btn btn-fill" aria-label="Download India Resume">
                <Download size={16} /> Download PDF
              </a>
            </div>
          </motion.div>
        )}

        {/* UAE RESUME CARD */}
        {!resumes.uae.loading && resumes.uae.exists && (
          <motion.div variants={itemVariants} className="premium-card">
            <div className="country-badge">
              <span aria-hidden="true">🇦🇪</span> UAE
            </div>
            
            <h2 className="card-title">Resume - UAE</h2>
            <p className="card-description">
              Optimized for Generative AI, LLM, and AI Agent Developer roles at leading organizations in the United Arab Emirates.
            </p>

            <div className="role-tags">
              <span className="role-tag">AI Engineer</span>
              <span className="role-tag">Generative AI</span>
              <span className="role-tag">LLM Engineer</span>
              <span className="role-tag">AI Agent Developer</span>
              <span className="role-tag">Computer Vision</span>
            </div>

            <div className="resume-preview-box">
              <FileText size={32} strokeWidth={1.5} />
              <span style={{ fontSize: '0.85rem' }}>PDF Document</span>
            </div>

            <div className="last-updated">
              <Clock size={14} /> Updated {resumes.uae.lastModified}
            </div>

            <div className="action-buttons">
              <a href="/resume/resume-uae.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-outline" aria-label="View UAE Resume">
                <ExternalLink size={16} /> View Resume
              </a>
              <a href="/resume/resume-uae.pdf" download="Mohammed-Rizvin-Resume-UAE.pdf" className="btn btn-fill" aria-label="Download UAE Resume">
                <Download size={16} /> Download PDF
              </a>
            </div>
          </motion.div>
        )}

        {/* FALLBACK IF MISSING */}
        {!resumes.india.loading && !resumes.uae.loading && !resumes.india.exists && !resumes.uae.exists && (
          <motion.div variants={itemVariants} className="premium-card" style={{ gridColumn: '1 / -1', alignItems: 'center', textAlign: 'center', padding: '4rem 2rem' }}>
            <FileText size={48} style={{ opacity: 0.3, marginBottom: '1rem' }} />
            <h2 className="card-title">No Resumes Uploaded</h2>
            <p className="card-description" style={{ marginBottom: 0 }}>
              Please place <code>resume-india.pdf</code> and <code>resume-uae.pdf</code> in the <code>public/resume/</code> folder.
            </p>
          </motion.div>
        )}

      </motion.div>
    </div>
  );
}
