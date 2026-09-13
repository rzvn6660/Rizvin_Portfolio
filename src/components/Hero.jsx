import React, { useState, useEffect } from 'react';
import AuroraBackground from './AuroraBackground';
import { Download, ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import './Hero.css';

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
        delayChildren: shouldReduceMotion ? 0 : 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: shouldReduceMotion ? 0 : 0.35, 
        ease: [0.16, 1, 0.3, 1] 
      }
    }
  };

  return (
    <section id="hero" className="hero-section" aria-label="Introduction">
      <AuroraBackground />
      <div className="container hero-container">

        {/* Left Column: Identity, Positioning & Primary CTAs */}
        <motion.div
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate={mounted ? "visible" : "hidden"}
        >
          {/* Main Identity: Dominant Name & Role */}
          <motion.div variants={itemVariants} className="hero-identity-group">
            <h1 className="hero-name">Mohammed Rizvin MK</h1>
            <p className="hero-role-title">AI & Data Science Engineer</p>
          </motion.div>

          {/* Core Technical Positioning */}
          <motion.div variants={itemVariants} className="hero-positioning" aria-label="Core AI specializations">
            <span>Generative AI</span>
            <span className="hero-bullet" aria-hidden="true">·</span>
            <span>AI Agents</span>
            <span className="hero-bullet" aria-hidden="true">·</span>
            <span>Speech AI</span>
            <span className="hero-bullet" aria-hidden="true">·</span>
            <span>Multimodal AI</span>
          </motion.div>

          {/* High-Impact Value Statement */}
          <motion.p variants={itemVariants} className="hero-description">
            Designing and deploying production-grade AI systems, autonomous agent workflows, and multilingual speech pipelines from research to scalable deployment.
          </motion.p>

          {/* Prioritized Actions & Secondary Resume Access */}
          <motion.div variants={itemVariants} className="hero-cta-wrapper">
            <div className="hero-primary-actions">
              <a href="#projects" className="btn btn-primary hero-btn-primary">
                <span>View Projects</span>
                <ArrowRight size={16} aria-hidden="true" />
              </a>
              <a href="#contact" className="btn btn-secondary hero-btn-secondary">
                <span>Get in Touch</span>
              </a>
            </div>

            {/* Clean, Non-Distracting Resume Access */}
            <div className="hero-resume-control" role="group" aria-label="Resume downloads by region">
              <span className="hero-resume-label">
                <Download size={13} className="hero-resume-icon" aria-hidden="true" />
                <span>Resume:</span>
              </span>
              <div className="hero-resume-links">
                <a
                  href="/resume?region=india"
                  className="hero-resume-link"
                  aria-label="View or download India resume"
                >
                  India
                </a>
                <span className="hero-resume-divider" aria-hidden="true">·</span>
                <a
                  href="/resume?region=uae"
                  className="hero-resume-link"
                  aria-label="View or download UAE resume"
                >
                  UAE
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column: Approved 4:5 Squircle Professional Portrait */}
        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: shouldReduceMotion ? 0 : 0.45, 
            delay: shouldReduceMotion ? 0 : 0.1, 
            ease: [0.16, 1, 0.3, 1] 
          }}
        >
          <div className="hero-portrait-container">
            {/* Extremely subtle ambient glow */}
            <div className="hero-portrait-aura" aria-hidden="true" />

            <div className="hero-portrait-frame">
              <img
                src="/profile.jpg"
                alt="Mohammed Rizvin MK - AI & Data Science Engineer"
                className="hero-portrait-img"
                width="853"
                height="1024"
                loading="eager"
                decoding="async"
              />
              <div className="hero-portrait-fade" aria-hidden="true" />
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
