import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Download, ExternalLink, Clock } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import './ResumePage.css';

const INDIA_RESUME_URL = '/resume/Mohammed%20Rizvin%20MK.pdf';
const UAE_RESUME_URL = '/resume/Mohammed_Rizvin_MK_Resume_UAE.pdf';

const RESUMES = {
  india: {
    id: 'india',
    label: 'India',
    flag: '🇮🇳',
    url: INDIA_RESUME_URL,
    filename: 'Mohammed Rizvin MK.pdf'
  },
  uae: {
    id: 'uae',
    label: 'UAE',
    flag: '🇦🇪',
    url: UAE_RESUME_URL,
    filename: 'Mohammed_Rizvin_MK_Resume_UAE.pdf'
  }
};

export default function ResumePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryRegion = searchParams.get('region')?.toLowerCase();
  const shouldReduceMotion = useReducedMotion();

  const [activeRegion, setActiveRegion] = useState(() =>
    queryRegion === 'uae' ? 'uae' : 'india'
  );

  const [lastModifiedDates, setLastModifiedDates] = useState({
    india: 'Sep 2026',
    uae: 'Sep 2026'
  });

  // Sync if URL query param changes
  useEffect(() => {
    if (queryRegion === 'india' || queryRegion === 'uae') {
      setActiveRegion(queryRegion);
    }
  }, [queryRegion]);

  // Fetch actual file last-modified timestamps
  useEffect(() => {
    const fetchLastModified = async (region, path) => {
      try {
        const res = await fetch(path, { method: 'HEAD' });
        if (res.ok) {
          const mod = res.headers.get('Last-Modified');
          if (mod) {
            const formatted = new Date(mod).toLocaleDateString('en-US', {
              month: 'short',
              year: 'numeric'
            });
            setLastModifiedDates(prev => ({ ...prev, [region]: formatted }));
          }
        }
      } catch {
        // Fallback default
      }
    };

    fetchLastModified('india', INDIA_RESUME_URL);
    fetchLastModified('uae', UAE_RESUME_URL);
  }, []);

  const handleRegionSwitch = (region) => {
    if (region === activeRegion) return;
    setActiveRegion(region);
    setSearchParams({ region }, { replace: true });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault();
      handleRegionSwitch(activeRegion === 'india' ? 'uae' : 'india');
    }
  };

  const current = RESUMES[activeRegion];
  const updatedDate = lastModifiedDates[activeRegion] || 'Sep 2026';

  return (
    <div className="resume-page-wrapper">
      <div className="resume-container">
        {/* Clean Header */}
        <header className="resume-header">
          <h1 className="resume-title">Resume</h1>
          <p className="resume-subtitle">Choose your preferred version</p>

          {/* Minimal Region Switcher */}
          <div
            className="resume-switcher"
            role="tablist"
            aria-label="Resume region selector"
            onKeyDown={handleKeyDown}
          >
            {(['india', 'uae']).map((key) => {
              const opt = RESUMES[key];
              const isSelected = activeRegion === key;
              return (
                <button
                  key={opt.id}
                  type="button"
                  role="tab"
                  id={`tab-${opt.id}`}
                  aria-selected={isSelected}
                  aria-controls={`panel-${opt.id}`}
                  tabIndex={0}
                  onClick={() => handleRegionSwitch(key)}
                  className={`resume-tab-btn ${isSelected ? 'is-active' : ''}`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="resume-tab-pill"
                      className="resume-tab-pill"
                      transition={
                        shouldReduceMotion
                          ? { duration: 0 }
                          : { type: 'spring', stiffness: 450, damping: 35 }
                      }
                    />
                  )}
                  <span className="tab-flag" aria-hidden="true">{opt.flag}</span>
                  <span className="tab-label">{opt.label}</span>
                </button>
              );
            })}
          </div>
        </header>

        {/* Actual PDF Document Canvas */}
        <div className="resume-preview-wrapper">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeRegion}
              id={`panel-${activeRegion}`}
              role="tabpanel"
              aria-labelledby={`tab-${activeRegion}`}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -8 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="resume-preview-card"
            >
              <iframe
                src={`${current.url}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                title={`Mohammed Rizvin MK Resume - ${current.label}`}
                className="resume-pdf-frame"
                loading="eager"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Recruiter Actions Footer */}
        <footer className="resume-footer">
          <div className="resume-updated">
            <Clock size={13} aria-hidden="true" />
            <span>Updated {updatedDate}</span>
          </div>

          <div className="resume-actions">
            <a
              href={current.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
              aria-label={`View ${current.label} Resume in new tab`}
            >
              <ExternalLink size={15} aria-hidden="true" />
              <span>View Resume</span>
            </a>
            <a
              href={current.url}
              download={current.filename}
              className="btn btn-fill"
              aria-label={`Download ${current.label} Resume PDF`}
            >
              <Download size={15} aria-hidden="true" />
              <span>Download PDF</span>
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
