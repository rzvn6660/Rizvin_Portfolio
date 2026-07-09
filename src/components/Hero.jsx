import React, { useState, useEffect } from 'react';
import AuroraBackground from './AuroraBackground';
import NeuralNetwork from './NeuralNetwork';
import { Download } from 'lucide-react';
import { motion } from 'framer-motion';
import './Hero.css';

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 80, damping: 20 }
    }
  };

  return (
    <section id="hero" className="hero-section">
      <AuroraBackground />
      <div className="container hero-container" style={{ minHeight: '90vh', display: 'flex', alignItems: 'center' }}>
        <motion.div 
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate={mounted ? "visible" : "hidden"}
          style={{ flex: 1, paddingRight: '4rem' }}
        >
          
          <motion.h1 variants={itemVariants} className="hero-title" style={{ fontSize: 'clamp(3rem, 5vw, 4.5rem)', lineHeight: 1.1, marginBottom: '1.5rem', fontWeight: 600, letterSpacing: '-0.03em' }}>
            Architecting <span className="text-gradient">intelligent systems</span> <br/>
            and scalable <span className="text-gradient-primary">AI pipelines.</span>
          </motion.h1>

          <motion.p variants={itemVariants} className="hero-subtitle" style={{ fontSize: '1.25rem', color: 'var(--color-text-secondary)', maxWidth: '600px', marginBottom: '3rem', lineHeight: 1.6 }}>
            Specializing in Large Language Models, autonomous agent orchestration, and multimodal speech recognition. Building robust inference pipelines and driving product innovation from research to production.
          </motion.p>

          <motion.div variants={itemVariants} className="hero-cta-row" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            <a href="#featured-project" className="btn btn-primary">View Projects</a>
            <a href="#contact" className="btn btn-secondary">Contact Me</a>
            <a href="/resume?region=india" className="btn btn-ghost">
              <Download size={18} />
              Resume (India)
            </a>
            <a href="/resume?region=uae" className="btn btn-ghost">
              <Download size={18} />
              Resume (UAE)
            </a>
            <a href="#certifications" className="btn btn-ghost">
              Certifications
            </a>
          </motion.div>

        </motion.div>
        
        <motion.div 
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
          style={{ flex: 1, height: '500px', position: 'relative' }}
        >
          <div className="glass-panel" style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
            <NeuralNetwork />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
