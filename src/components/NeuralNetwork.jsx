import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function NeuralNetwork() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let time = 0;
    
    // Check reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Interaction state
    let mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000, isClicking: false };
    let clickPulse = 0;
    let hoverSpeedMulti = 1;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      canvas.width = parent.clientWidth * (window.devicePixelRatio || 1);
      canvas.height = parent.clientHeight * (window.devicePixelRatio || 1);
      ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
    };
    const handleMouseLeave = () => {
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };
    const handleMouseDown = () => {
      mouse.isClicking = true;
      clickPulse = 1.0;
    };
    const handleMouseUp = () => {
      mouse.isClicking = false;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mouseup', handleMouseUp);

    // AI Nodes
    const nodes = Array.from({ length: 6 }).map(() => ({
      baseX: Math.random() * canvas.clientWidth,
      baseY: Math.random() * canvas.clientHeight,
      x: 0,
      y: 0,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.02 + 0.01,
      size: Math.random() * 2 + 2,
    }));

    // Particles moving along curves
    let particles = Array.from({ length: 15 }).map(() => ({
      t: Math.random(),
      speed: Math.random() * 0.002 + 0.001,
      curveIndex: Math.random() > 0.5 ? 0 : 1, // 0 for cyan, 1 for purple
    }));

    const drawCurve = (ctx, width, height, time, color, yOffset, amplitude, freq, phaseOffset) => {
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.5;

      let points = [];
      for (let x = -50; x <= width + 50; x += 10) {
        let t = x / width;
        let y = height / 2 + yOffset;
        
        // Base sine wave
        let wave = Math.sin(t * freq + time + phaseOffset) * amplitude;
        
        // Add secondary wave for complexity
        wave += Math.sin(t * freq * 2.5 - time * 1.5 + phaseOffset) * (amplitude * 0.3);

        // Mouse influence
        let dist = Math.abs(x - mouse.x);
        let influence = Math.max(0, 1 - dist / 200);
        if (mouse.x > 0 && mouse.y > 0) {
          let dy = mouse.y - (y + wave);
          wave += dy * influence * 0.3;
        }
        
        if (clickPulse > 0) {
          wave += Math.sin(t * 20 - time * 10) * (20 * clickPulse) * influence;
        }

        y += wave;
        points.push({x, y});

        if (x === -50) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      
      ctx.stroke();
      ctx.closePath();
      return points;
    };

    const animate = () => {
      if (prefersReducedMotion) {
        // Minimal static drawing if reduced motion is preferred
        return;
      }

      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.1;
      mouse.y += (mouse.targetY - mouse.y) * 0.1;

      // Click pulse decay
      if (clickPulse > 0) clickPulse -= 0.02;
      
      hoverSpeedMulti += ((isHovered ? 1.5 : 1) - hoverSpeedMulti) * 0.05;
      const timeDelta = 0.02 * hoverSpeedMulti + (clickPulse * 0.05);
      time += timeDelta;

      // Draw Curves
      const curve1 = drawCurve(ctx, width, height, time, 'rgba(0, 229, 255, 0.6)', -10, 40, Math.PI * 2, 0);
      const curve2 = drawCurve(ctx, width, height, time, 'rgba(138, 43, 226, 0.6)', 10, 50, Math.PI * 2.5, Math.PI);

      // Update and Draw Particles on curves
      ctx.shadowBlur = 10;
      particles.forEach(p => {
        p.t += p.speed * hoverSpeedMulti + (clickPulse * 0.01);
        if (p.t > 1) {
          p.t = 0;
          p.curveIndex = Math.random() > 0.5 ? 0 : 1;
        }

        const curve = p.curveIndex === 0 ? curve1 : curve2;
        if (curve.length > 0) {
          const index = Math.floor(p.t * (curve.length - 1));
          const point = curve[index];
          if (point) {
            ctx.beginPath();
            ctx.fillStyle = p.curveIndex === 0 ? '#00e5ff' : '#8a2be2';
            ctx.shadowColor = ctx.fillStyle;
            ctx.arc(point.x, point.y, 2, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      });
      ctx.shadowBlur = 0;

      // Update and Draw Nodes
      nodes.forEach((node, i) => {
        // Floating math
        node.x = node.baseX + Math.sin(time * 0.5 + node.phase) * 30;
        node.y = node.baseY + Math.cos(time * 0.7 + node.phase) * 30;

        // Mouse repulsion
        let dx = node.x - mouse.x;
        let dy = node.y - mouse.y;
        let dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 150 && mouse.x > 0) {
          node.x += (dx / dist) * (150 - dist) * 0.1;
          node.y += (dy / dist) * (150 - dist) * 0.1;
        }

        // Draw connections to curves if close
        [curve1, curve2].forEach((curve, cIdx) => {
          let closestPt = null;
          let minDist = 100;
          curve.forEach(pt => {
            let d = Math.sqrt((pt.x - node.x)**2 + (pt.y - node.y)**2);
            if (d < minDist) {
              minDist = d;
              closestPt = pt;
            }
          });
          
          if (closestPt) {
            ctx.beginPath();
            ctx.strokeStyle = cIdx === 0 ? `rgba(0, 229, 255, ${1 - minDist/100})` : `rgba(138, 43, 226, ${1 - minDist/100})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(closestPt.x, closestPt.y);
            ctx.stroke();
          }
        });

        // Draw node
        ctx.beginPath();
        const pulse = Math.sin(time * 2 + node.phase) * 0.5 + 0.5;
        ctx.fillStyle = `rgba(255, 255, 255, ${0.4 + pulse * 0.4})`;
        ctx.shadowColor = 'rgba(255,255,255,0.5)';
        ctx.shadowBlur = 10 * pulse;
        ctx.arc(node.x, node.y, node.size + pulse, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mouseup', handleMouseUp);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isHovered]);

  return (
    <motion.div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        borderRadius: '24px',
        background: 'rgba(255, 255, 255, 0.02)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        boxShadow: isHovered 
          ? '0 20px 40px -10px rgba(0,0,0,0.6), 0 0 20px rgba(138, 43, 226, 0.15)' 
          : '0 10px 30px -10px rgba(0,0,0,0.5)',
        overflow: 'hidden',
        cursor: 'pointer'
      }}
    >
      {/* Animated subtle gradient border */}
      <motion.div
        animate={{ opacity: isHovered ? 1 : 0 }}
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          borderRadius: 'inherit',
          padding: '1px',
          background: 'linear-gradient(135deg, rgba(138, 43, 226, 0.5), rgba(0, 229, 255, 0.5))',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          pointerEvents: 'none'
        }}
      />
      
      {/* Subtle inner radial glow */}
      <div 
        style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%', height: '80%',
          background: 'radial-gradient(circle, rgba(138,43,226,0.08) 0%, transparent 70%)',
          pointerEvents: 'none'
        }}
      />

      <canvas 
        ref={canvasRef} 
        style={{ 
          width: '100%', 
          height: '100%', 
          display: 'block',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 1
        }} 
      />
    </motion.div>
  );
}
