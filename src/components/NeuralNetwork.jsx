import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const nodesData = {
  MR: { label: 'MR', type: 'center', target: '#about' },
  LLMs: { label: 'LLMs', type: 'primary', target: '#projects', sub: ['Prompt Engineering', 'RAG', 'Reasoning', 'OpenAI APIs'] },
  Agents: { label: 'AI Agents', type: 'primary', target: '#projects', sub: ['LangGraph', 'Tool Calling', 'Memory', 'Automation'] },
  Speech: { label: 'Speech AI', type: 'primary', target: '#projects', sub: ['Whisper', 'Coqui TTS', 'Real-time Voice'] },
  OCR: { label: 'OCR', type: 'primary', target: '#projects', sub: ['EasyOCR', 'Vision AI', 'Medicine Recognition'] },
  FastAPI: { label: 'FastAPI', type: 'secondary', target: '#focus' },
  Python: { label: 'Python', type: 'secondary', target: '#focus' },
  Docker: { label: 'Docker', type: 'secondary', target: '#focus' },
  React: { label: 'React', type: 'secondary', target: '#focus' },
  GitHub: { label: 'GitHub', type: 'secondary', target: '#github' },
  // Pipeline specific virtual nodes
  Voice: { label: 'Voice Input', type: 'pipeline' },
  Memory: { label: 'Memory', type: 'pipeline' },
  Response: { label: 'Response', type: 'pipeline' }
};

const getGraphLayout = (width, height) => ({
  MR: { x: width/2, y: height/2, opacity: 1 },
  LLMs: { x: width/2 - 120, y: height/2 - 100, opacity: 1 },
  Agents: { x: width/2 + 120, y: height/2 - 100, opacity: 1 },
  Speech: { x: width/2 - 140, y: height/2 + 60, opacity: 1 },
  OCR: { x: width/2 + 140, y: height/2 + 60, opacity: 1 },
  FastAPI: { x: width/2 - 60, y: height/2 - 180, opacity: 1 },
  Python: { x: width/2 + 60, y: height/2 - 180, opacity: 1 },
  Docker: { x: width/2 - 80, y: height/2 + 160, opacity: 1 },
  React: { x: width/2 + 80, y: height/2 + 160, opacity: 1 },
  GitHub: { x: width/2 + 200, y: height/2, opacity: 1 },
  Voice: { x: width/2, y: height/2, opacity: 0 },
  Memory: { x: width/2, y: height/2, opacity: 0 },
  Response: { x: width/2, y: height/2, opacity: 0 },
});

const getPipelineLayout = (width, height) => {
  const startY = 80;
  const spacing = (height - 160) / 5;
  const centerX = width / 2;
  return {
    Voice: { x: centerX, y: startY, opacity: 1 },
    Speech: { x: centerX, y: startY + spacing * 1, opacity: 1 },
    LLMs: { x: centerX, y: startY + spacing * 2, opacity: 1 },
    Agents: { x: centerX, y: startY + spacing * 3, opacity: 1 },
    Memory: { x: centerX + 120, y: startY + spacing * 3, opacity: 1 },
    Response: { x: centerX, y: startY + spacing * 4, opacity: 1 },
    // Hide others
    MR: { x: centerX - 150, y: height/2, opacity: 0.1 },
    OCR: { x: centerX - 150, y: height/2 - 50, opacity: 0.1 },
    FastAPI: { x: centerX - 150, y: height/2 + 50, opacity: 0.1 },
    Python: { x: centerX + 150, y: height/2 - 50, opacity: 0.1 },
    Docker: { x: centerX + 150, y: height/2 + 50, opacity: 0.1 },
    React: { x: centerX + 150, y: height/2, opacity: 0.1 },
    GitHub: { x: centerX + 150, y: height/2 + 100, opacity: 0.1 },
  };
};

const getGraphConnections = () => [
  ['MR', 'LLMs'], ['MR', 'Agents'], ['MR', 'Speech'], ['MR', 'OCR'],
  ['LLMs', 'FastAPI'], ['LLMs', 'Python'], ['Agents', 'Python'],
  ['Speech', 'FastAPI'], ['OCR', 'Docker'], ['MR', 'React'],
  ['Agents', 'GitHub']
];

const getPipelineConnections = () => [
  ['Voice', 'Speech'], ['Speech', 'LLMs'], ['LLMs', 'Agents'],
  ['Agents', 'Memory'], ['Memory', 'Agents'], ['Agents', 'Response']
];

export default function NeuralNetwork() {
  const [viewMode, setViewMode] = useState('graph'); // 'graph' or 'pipeline'
  const [dimensions, setDimensions] = useState({ width: 500, height: 500 });
  const [hoveredNode, setHoveredNode] = useState(null);
  
  useEffect(() => {
    const updateSize = () => {
      const parent = document.getElementById('network-container');
      if (parent) {
        setDimensions({ width: parent.clientWidth, height: parent.clientHeight });
      }
    };
    window.addEventListener('resize', updateSize);
    updateSize();

    // Toggle view modes every 12 seconds
    const interval = setInterval(() => {
      setViewMode(prev => prev === 'graph' ? 'pipeline' : 'graph');
    }, 12000);

    return () => {
      window.removeEventListener('resize', updateSize);
      clearInterval(interval);
    };
  }, []);

  const handleNodeClick = (target) => {
    if (target) {
      const el = document.querySelector(target);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const layout = viewMode === 'graph' ? getGraphLayout(dimensions.width, dimensions.height) : getPipelineLayout(dimensions.width, dimensions.height);
  const connections = viewMode === 'graph' ? getGraphConnections() : getPipelineConnections();

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <div id="network-container" style={{ width: '100%', height: '100%', position: 'relative', background: 'rgba(5,5,5,0.4)', borderRadius: '24px', overflow: 'hidden' }}>
      
      {/* Background Glow */}
      <motion.div 
        animate={{ opacity: viewMode === 'pipeline' ? 0.3 : 0.8 }}
        style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(138, 43, 226, 0.15) 0%, transparent 70%)', pointerEvents: 'none' }}
      />
      
      {/* Connections (SVG) */}
      <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}>
        <AnimatePresence>
          {connections.map(([from, to], i) => {
            const start = layout[from];
            const end = layout[to];
            if (!start || !end || start.opacity === 0 || end.opacity === 0) return null;
            
            return (
              <motion.line
                key={`${from}-${to}-${viewMode}`}
                x1={start.x} y1={start.y}
                x2={end.x} y2={end.y}
                stroke="rgba(0, 229, 255, 0.3)"
                strokeWidth="1.5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: Math.min(start.opacity, end.opacity) }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />
            );
          })}
        </AnimatePresence>

        {/* Moving Particles along lines */}
        {!prefersReducedMotion && connections.map(([from, to], i) => {
          const start = layout[from];
          const end = layout[to];
          if (!start || !end || start.opacity === 0 || end.opacity === 0) return null;
          return (
            <motion.circle
              key={`particle-${from}-${to}`}
              r="2"
              fill="#00e5ff"
              initial={{ cx: start.x, cy: start.y, opacity: 0 }}
              animate={{ 
                cx: [start.x, end.x], 
                cy: [start.y, end.y],
                opacity: [0, 1, 0] 
              }}
              transition={{
                duration: 2 + Math.random(),
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 2
              }}
            />
          );
        })}
      </svg>

      {/* Nodes (DOM) */}
      {Object.entries(nodesData).map(([key, node]) => {
        const pos = layout[key];
        if (!pos) return null;
        
        const isCenter = node.type === 'center';
        const isHovered = hoveredNode === key;

        return (
          <motion.div
            key={key}
            onClick={() => handleNodeClick(node.target)}
            onMouseEnter={() => setHoveredNode(key)}
            onMouseLeave={() => setHoveredNode(null)}
            initial={{ x: pos.x, y: pos.y, opacity: pos.opacity }}
            animate={{ 
              x: pos.x, 
              y: pos.y, 
              opacity: pos.opacity,
              scale: isHovered ? 1.1 : 1
            }}
            transition={{ type: "spring", stiffness: 60, damping: 15 }}
            style={{
              position: 'absolute',
              transform: 'translate(-50%, -50%)',
              zIndex: isHovered ? 10 : 2,
              pointerEvents: pos.opacity < 0.5 ? 'none' : 'auto',
              cursor: pos.opacity > 0.5 ? 'pointer' : 'default'
            }}
          >
            {/* The Node Bubble */}
            <motion.div
              animate={{
                y: prefersReducedMotion ? 0 : [0, -5, 0],
                boxShadow: isHovered 
                  ? '0 0 20px rgba(138,43,226,0.6)' 
                  : (isCenter ? '0 0 15px rgba(0,229,255,0.4)' : '0 0 0px rgba(0,0,0,0)')
              }}
              transition={{
                y: { duration: 3 + Math.random(), repeat: Infinity, ease: "easeInOut" }
              }}
              style={{
                background: isCenter ? 'var(--color-text-primary)' : 'rgba(20,20,25,0.8)',
                color: isCenter ? '#000' : 'var(--color-text-primary)',
                border: isCenter ? 'none' : '1px solid rgba(255,255,255,0.1)',
                backdropFilter: 'blur(8px)',
                padding: isCenter ? '12px' : '8px 16px',
                borderRadius: '100px',
                fontWeight: isCenter ? 700 : 500,
                fontSize: isCenter ? '1rem' : '0.8rem',
                whiteSpace: 'nowrap',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
              }}
            >
              {node.label}
            </motion.div>

            {/* Hover Tooltip */}
            <AnimatePresence>
              {isHovered && node.sub && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    marginTop: '12px',
                    background: 'rgba(15,15,20,0.95)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(138, 43, 226, 0.3)',
                    padding: '12px',
                    borderRadius: '12px',
                    width: 'max-content',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                    pointerEvents: 'none'
                  }}
                >
                  <span style={{ fontSize: '0.7rem', color: 'var(--color-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Related Tech</span>
                  {node.sub.map(s => (
                    <span key={s} style={{ fontSize: '0.85rem', color: 'var(--color-accent-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ width: 4, height: 4, background: 'var(--color-accent-primary)', borderRadius: '50%' }} />
                      {s}
                    </span>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

          </motion.div>
        );
      })}

      {/* Mode Indicator */}
      <div style={{ position: 'absolute', bottom: '16px', right: '16px', display: 'flex', alignItems: 'center', gap: '8px', zIndex: 1 }}>
        <span style={{ fontSize: '0.7rem', color: 'var(--color-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {viewMode === 'graph' ? 'Knowledge Graph' : 'Inference Pipeline'}
        </span>
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--color-accent-secondary)', boxShadow: '0 0 8px var(--color-accent-secondary)' }} />
      </div>

    </div>
  );
}
