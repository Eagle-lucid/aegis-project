// apps/landing/components/effects/ParticleField.tsx
'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import type { ISourceOptions } from '@tsparticles/engine';

export default function ParticleField() {
  const [init, setInit] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Framer motion scroll link
  const { scrollYProgress } = useScroll();
  const translateY = useTransform(scrollYProgress, [0, 1], [0, 150]);

  // Initialize particle engine
  useEffect(() => {
    initParticlesEngine(async (engine) => await loadSlim(engine)).then(() => setInit(true));
  }, []);

  // Particle options
  const options: ISourceOptions = useMemo(
    () => ({
      background: { color: { value: 'transparent' } },
      fullScreen: { enable: false },
      fpsLimit: 60,
      interactivity: {
        events: {
          onHover: { enable: true, mode: ['repulse', 'bubble'] },
        },
        modes: {
          repulse: { distance: 120, duration: 0.4 },
          bubble: { distance: 150, size: 6, opacity: 0.8 },
        },
      },
      particles: {
        number: { value: 80, density: { enable: true, area: 800 } },
        color: { value: ['#06B6D4', '#10B981', '#F59E0B'] },
        opacity: {
          value: { min: 0.25, max: 0.6 },
          animation: {
            enable: true,
            speed: 0.5,
            sync: false,
          },
        },
        size: {
          value: { min: 1.5, max: 3.5 },
          animation: { enable: true, speed: 2, sync: false },
        },
        links: {
          enable: true,
          distance: 160,
          color: '#06B6D4',
          opacity: 0.2, 
          width: 1,
        },
        move: {
          enable: true,
          speed: { min: 0.2, max: 0.6 },
          direction: 'none',
          random: true,
          straight: false,
          outModes: { default: 'out' },
          attract: { enable: true, rotateX: 2000, rotateY: 2000 },
        },
      },
      detectRetina: true,
    }),
    []
  );

  if (!init) return null;

  return (
    <motion.div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ y: translateY }} 
    >
      <Particles
        id="hero-particles"
        options={options}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
        }}
      />
    </motion.div>
  );
}
