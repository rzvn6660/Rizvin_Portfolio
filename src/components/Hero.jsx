import React, { useState, useEffect } from 'react';
import AuroraBackground from './AuroraBackground';
import { Download, ArrowRight, MapPin, RotateCw } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import './Hero.css';

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCardFlip = () => {
    setIsFlipped(prev => !prev);
  };

  const handleCardKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCardFlip();
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
        delayChildren: shouldReduceMotion ? 0 : 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 80, damping: 20 }
    }
  };

  return (
    <section id="hero" className="hero-section" aria-label="Introduction">
      <AuroraBackground />
      <div className="container hero-container">

        {/* Left Column: Identity, Positioning & CTAs */}
        <motion.div
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate={mounted ? "visible" : "hidden"}
        >
          {/* Availability Status Badge */}
          <motion.div variants={itemVariants} className="hero-status-pill">
            <span className="status-dot pulse" aria-hidden="true" />
            <span className="status-pill-text">Available for AI Roles · India & UAE</span>
          </motion.div>

          {/* Prominent Name & Title */}
          <motion.div variants={itemVariants} className="hero-identity-group">
            <h1 className="hero-name">Mohammed Rizvin MK</h1>
            <p className="hero-role-title">AI & Data Science Engineer</p>
          </motion.div>

          {/* Engineering Value Proposition */}
          <motion.h2 variants={itemVariants} className="hero-tagline">
            Architecting <span className="text-gradient">intelligent systems</span><br />
            and scalable <span className="text-gradient-primary">AI pipelines.</span>
          </motion.h2>

          {/* Technical Positioning Statement */}
          <motion.p variants={itemVariants} className="hero-subtitle">
            Specializing in Large Language Models, autonomous agent orchestration, and multimodal speech recognition. Building robust inference pipelines and driving product innovation from research to production.
          </motion.p>

          {/* Prioritized CTA Hierarchy */}
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

            {/* Consolidated Dual-Region Resume Control */}
            <div className="hero-resume-control" role="group" aria-label="Resume downloads by region">
              <span className="hero-resume-label">
                <Download size={14} className="hero-resume-icon" aria-hidden="true" />
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

        {/* Right Column: Elevated Engineering Profile Card (Click-to-Flip) */}
        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            className={`profile-card-container ${isFlipped ? 'flipped' : ''}`}
            onClick={handleCardFlip}
            onKeyDown={handleCardKeyDown}
            role="button"
            tabIndex={0}
            aria-label={isFlipped ? "Flip to Mohammed Rizvin MK portrait view" : "Flip to Mohammed Rizvin MK professional identity card view"}
            aria-pressed={isFlipped}
          >
            {/* Ambient Backlight Glow stays grounded outside 3D rotation */}
            <div className="profile-card-aura" aria-hidden="true" />

            <div className="profile-card-inner">
              {/* FRONT FACE: Authentic Professional Portrait Card */}
              <div className="profile-card-front">
                {/* Squircle Photo Frame (~4:5 ratio) */}
                <div className="profile-photo-frame">
                  <img
                    src="/profile.jpg"
                    alt="Mohammed Rizvin MK - AI & Data Science Engineer"
                    className="profile-photo"
                    width="853"
                    height="1024"
                    loading="eager"
                    decoding="async"
                  />
                  <div className="profile-photo-fade" aria-hidden="true" />

                  {/* Subtle In-frame Verification Tag */}
                  <div className="profile-photo-badge" aria-hidden="true">
                    <span className="profile-badge-dot" />
                    <span>AI Systems</span>
                  </div>

                  {/* Subtle Flip Hint Tag */}
                  <div className="profile-photo-flip-cue" aria-hidden="true">
                    <RotateCw size={11} />
                    <span>ID Card</span>
                  </div>
                </div>

                {/* Profile Card Footer / Technical Credibility */}
                <div className="profile-card-footer">
                  <div className="profile-card-meta">
                    <span className="profile-meta-role">AI & Data Science Engineer</span>
                    <span className="profile-meta-location">
                      <MapPin size={12} aria-hidden="true" />
                      India · UAE
                    </span>
                  </div>

                  <div className="profile-card-tags" aria-label="Core AI specializations">
                    <span className="profile-tag">LLMs & Agents</span>
                    <span className="profile-tag">Speech AI</span>
                    <span className="profile-tag">FastAPI</span>
                    <span className="profile-tag">PyTorch</span>
                  </div>
                </div>
              </div>

              {/* BACK FACE: Clean Professional Identity Card */}
              <div className="profile-card-back" aria-hidden={!isFlipped}>
                {/* Top Bar: Monogram & Return Cue */}
                <div className="profile-back-header">
                  <div className="profile-back-chip">
                    <span className="profile-chip-dot" aria-hidden="true" />
                    <span>ID // AI ENGINEERING</span>
                  </div>
                  <div className="profile-back-flip-cue" aria-hidden="true">
                    <RotateCw size={11} />
                    <span>Photo</span>
                  </div>
                </div>

                {/* Center Identity */}
                <div className="profile-back-body">
                  <h3 className="profile-back-name">Mohammed Rizvin MK</h3>
                  <p className="profile-back-role">AI & Data Science Engineer</p>

                  <div className="profile-back-location">
                    <MapPin size={12} aria-hidden="true" />
                    <span>India · UAE</span>
                  </div>

                  <div className="profile-back-divider" aria-hidden="true" />

                  {/* Short Focus Line */}
                  <div className="profile-back-focus">
                    <span className="profile-focus-label">Core Focus</span>
                    <p className="profile-focus-text">
                      Generative AI · AI Agents · Speech AI · Multimodal AI
                    </p>
                  </div>
                </div>

                {/* Bottom Bar: Availability & Hint */}
                <div className="profile-back-footer">
                  <div className="profile-back-availability">
                    <span className="status-dot pulse" aria-hidden="true" />
                    <span>Available for AI Roles</span>
                  </div>
                  <span className="profile-back-hint" aria-hidden="true">Click to flip</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
