import React from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { SiPython, SiFastapi, SiDocker, SiReact, SiPostgresql, SiGithub } from 'react-icons/si';
import { Network, AudioWaveform, Brain } from 'lucide-react';
import './SkillStrip.css';

const skillData = [
  { name: 'Python', icon: <SiPython size={28} color="#3776AB" /> },
  { name: 'FastAPI', icon: <SiFastapi size={28} color="#009688" /> },
  { name: 'Docker', icon: <SiDocker size={28} color="#2496ED" /> },
  { name: 'LangGraph', icon: <Network size={28} color="#fff" /> },
  { name: 'OpenAI', icon: <Brain size={28} color="#fff" /> },
  { name: 'Whisper', icon: <AudioWaveform size={28} color="#00e5ff" /> },
  { name: 'React', icon: <SiReact size={28} color="#61DAFB" /> },
  { name: 'PostgreSQL', icon: <SiPostgresql size={28} color="#4169E1" /> },
  { name: 'GitHub', icon: <SiGithub size={28} color="#fff" /> }
];

export default function SkillStrip() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <section id="focus" className="section-padding" style={{ padding: '4rem 0' }}>
      <div className="container" ref={ref}>
        <motion.div 
          className="skill-strip" 
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'center' }}
        >
          {skillData.map((skill) => (
            <motion.div 
              key={skill.name} 
              variants={itemVariants}
              className="skill-chip glass-panel"
              whileHover={{ scale: 1.1, translateY: -5, borderColor: 'var(--color-border-glow)' }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem', padding: '1.5rem', minWidth: '120px' }}
            >
              {skill.icon}
              <span className="text-mono" style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>{skill.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
