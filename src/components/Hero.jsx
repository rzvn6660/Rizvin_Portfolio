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
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 70, damping: 20 }
    }
  };

  return (
    <section id="hero" className="hero-section">
      <AuroraBackground />
      <div className="container hero-container">
        
        <motion.div 
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate={mounted ? "visible" : "hidden"}
        >
          <motion.h1 variants={itemVariants} className="hero-title">
            Architecting <span className="text-gradient">intelligent systems</span><br/>
            and scalable <span className="text-gradient-primary">AI pipelines.</span>
          </motion.h1>

          <motion.p variants={itemVariants} className="hero-subtitle">
            Specializing in Large Language Models, autonomous agent orchestration, and multimodal speech recognition. Building robust inference pipelines and driving product innovation from research to production.
          </motion.p>

          <motion.div variants={itemVariants} className="hero-cta-row">
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
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="hero-visual"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="glass-panel neural-network-wrapper">
            <NeuralNetwork />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
