"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { useState } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  targetOpacity: number;
  trail: { x: number; y: number; opacity: number }[];
  trailLength: number;
}

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(theme === "dark");
  }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const createParticle = (fromEdge: boolean = false): Particle => {
      const trailLength = Math.floor(Math.random() * 20) + 15; 
      let x, y;

      if (fromEdge) {
        const edge = Math.floor(Math.random() * 4);
        switch (edge) {
          case 0:
            x = Math.random() * canvas.width;
            y = -10;
            break;
          case 1:
            x = canvas.width + 10;
            y = Math.random() * canvas.height;
            break;
          case 2:
            x = Math.random() * canvas.width;
            y = canvas.height + 10;
            break;
          default:
            x = -10;
            y = Math.random() * canvas.height;
        }
      } else {
        x = Math.random() * canvas.width;
        y = Math.random() * canvas.height;
      }

      return {
        x,
        y,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        size: Math.random() * 2.5 + 1.5, 
        opacity: fromEdge ? 0 : Math.random() * 0.4 + 0.3, 
        targetOpacity: Math.random() * 0.4 + 0.3, 
        trail: [],
        trailLength,
      };
    };

    for (let i = 0; i < 80; i++) {
      particles.push(createParticle(false));
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        const margin = 80;
        const nearEdge = 
          particle.x < margin || 
          particle.x > canvas.width - margin || 
          particle.y < margin || 
          particle.y > canvas.height - margin;

        if (nearEdge) {
          const edgeDistance = Math.min(
            particle.x,
            canvas.width - particle.x,
            particle.y,
            canvas.height - particle.y
          );
          particle.opacity = particle.targetOpacity * (edgeDistance / margin);
        } else {
          particle.opacity += (particle.targetOpacity - particle.opacity) * 0.05;
        }

        particle.trail.push({
          x: particle.x,
          y: particle.y,
          opacity: particle.opacity,
        });

        if (particle.trail.length > particle.trailLength) {
          particle.trail.shift();
        }

        particle.trail.forEach((point, index) => {
          const trailOpacity = (index / particle.trail.length) * point.opacity * 0.8; 
          ctx.beginPath();
          ctx.arc(point.x, point.y, particle.size * 0.6, 0, Math.PI * 2);
          
          if (isDark) {
            ctx.fillStyle = `rgba(147, 197, 253, ${trailOpacity})`;
          } else {
            ctx.fillStyle = `rgba(0, 0, 0, ${trailOpacity})`;
          }
          
          ctx.fill();
        });

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        
        if (isDark) {
          ctx.fillStyle = `rgba(147, 197, 253, ${particle.opacity})`;
        } else {
          ctx.fillStyle = `rgba(0, 0, 0, ${particle.opacity})`;
        }
        
        ctx.fill();

        particle.x += particle.vx;
        particle.y += particle.vy;

        if (
          particle.x < -20 || 
          particle.x > canvas.width + 20 || 
          particle.y < -20 || 
          particle.y > canvas.height + 20
        ) {
          const newParticle = createParticle(true);
          Object.assign(particle, newParticle);
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.7 }}
    />
  );
};

export default ParticleBackground;