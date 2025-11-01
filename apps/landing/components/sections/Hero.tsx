// apps/landing/components/sections/Hero.tsx
'use client';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Github } from 'lucide-react';
import Link from 'next/link';
import gsap from 'gsap';
import ParticleField from '@/components/effects/ParticleField';
import NeuralNetwork from '@/components/effects/NeuralNetwork';
import AegisSignil from '@/components/effects/AegisSignil';

export default function Hero() {
  const [showContent, setShowContent] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 5 });
    tl.add(() => setShowContent(true));
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden bg-throne-abyss flex items-center justify-center isolate"
    >
      {/* Layer 1: Particle Field */}
      <ParticleField />

      {/* Layer 1.5: Fog/Atmosphere */}
      <div className="absolute inset-0 bg-linear-to-b from-throne-abyss/80 via-throne-abyss-deep/60 to-throne-abyss/90 pointer-events-none" />
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.05) 0%, transparent 70%)'
        }}
        animate={{
          opacity: [0.3, 0.5, 0.3],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Layer 2: Neural Network */}
      <NeuralNetwork />

      {/* Layer 2.5: Aegis Sigil (Ambient Center Glow) */}
      <div className="absolute inset-0 flex items-center justify-center z-4 opacity-40 pointer-events-none translate-y-4 md:translate-y-10">
        <div className="absolute w-[300px] h-[300px] md:w-[400px] md:h-[400px] bg-throne-cyan-500/10 blur-3xl rounded-full animate-pulse"></div>
        <AegisSignil />
      </div>

      {/* Layer 3: Content */}
      <motion.div
        ref={contentRef}
        className="relative z-10 flex flex-col items-center justify-center text-center px-6 md:px-8 lg:px-10 pt-6 md:pt-10 max-w-6xl mx-auto"
        initial={{ opacity: 0, scale: 0.97, y: 30 }}
        animate={{
          opacity: showContent ? 1 : 0,
          scale: showContent ? 1 : 0.97,
          y: showContent ? 0 : 30,
        }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      >
        {/* Headline - Word by Word Animation */}
        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold text-white leading-tight tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: showContent ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {['Your', 'Command', 'Center'].map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: showContent ? 1 : 0, 
                y: showContent ? 0 : 20 
              }}
              transition={{ 
                duration: 0.6, 
                delay: 0.3 + (i * 0.15),
                ease: 'easeOut' 
              }}
              className="inline-block mr-[0.3em]"
            >
              {word}
            </motion.span>
          ))}{' '}
          
          <motion.span
            className="text-throne-cyan-500 inline-block"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: showContent ? 1 : 0, 
              scale: showContent ? 1 : 0.8 
            }}
            transition={{ 
              duration: 0.8, 
              delay: 0.75,
              ease: 'backOut' 
            }}
          >
            Awaits
          </motion.span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/80 font-light max-w-3xl mx-auto leading-relaxed mt-6 drop-shadow-[0_1px_4px_rgba(0,0,0,0.4)]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 30 }}
          transition={{ duration: 1, delay: 0.9 }}
        >
          Where leaders{' '}
          <span className="text-throne-emerald-500 font-medium">command</span>,
          not react.{' '}
          <span className="text-white/60">
            A new era of digital sovereignty begins.
          </span>
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 30 }}
          transition={{ duration: 1, delay: 1.1 }}
        >
          <Link href="https://aegis-project.vercel.app" target="_blank">
            <motion.button
              className="group relative px-10 py-5 rounded-2xl bg-linear-to-r from-throne-emerald-500 to-throne-cyan-500 text-white font-semibold text-lg shadow-2xl shadow-throne-emerald-500/25 overflow-hidden"
              whileHover={{
                scale: 1.05,
                boxShadow: '0 25px 50px -12px rgba(16, 185, 129, 0.4)',
              }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10 flex items-center gap-3">
                Enter the Throne
                <ChevronRight
                  size={22}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </span>
              <motion.div
                className="absolute inset-0 bg-linear-to-r from-throne-emerald-600 to-throne-cyan-600"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </Link>

          <Link
            href="https://github.com/LucidTheEagle/aegis-project.git"
            target="_blank"
          >
            <motion.button
              className="px-10 py-5 rounded-2xl border-2 border-throne-cyan-500/40 text-throne-cyan-400 font-semibold text-lg bg-throne-cyan-500/5 hover:bg-throne-cyan-500/15 backdrop-blur-sm transition-all flex items-center gap-3"
              whileHover={{
                scale: 1.05,
                borderColor: 'rgba(6, 182, 212, 0.8)',
              }}
              whileTap={{ scale: 0.98 }}
            >
              <Github size={22} />
              View Source
            </motion.button>
          </Link>
        </motion.div>

        {/* Tagline */}
        <motion.p
          className="text-sm text-white/40 italic font-light pt-8 tracking-wide"
          initial={{ opacity: 0 }}
          animate={{ opacity: showContent ? 1 : 0 }}
          transition={{ duration: 1.5, delay: 1.4 }}
        >
          Not a dashboard. A throne.
        </motion.p>
      </motion.div>

      {/* Scroll Indicator - Desktop Only */}
      <motion.div
        className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: showContent ? 0.7 : 0 }}
        transition={{ duration: 1.5, delay: 2 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-throne-cyan-500/50 rounded-full flex items-start justify-center p-2"
          animate={{ y: [0, -3, 0] }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            ease: 'easeInOut' 
          }}
        >
          <motion.div
            className="w-1 h-3 bg-throne-cyan-500 rounded-full"
            animate={{ 
              opacity: [0.3, 1, 0.3],
              y: [0, 3, 0] 
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: 'easeInOut' 
            }}
          />
        </motion.div>
        
        <motion.span
          className="text-throne-cyan-500/60 text-xs uppercase tracking-widest"
          animate={{ opacity: [0.4, 0.7, 0.4] }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            ease: 'easeInOut' 
          }}
        >
          Scroll
        </motion.span>
      </motion.div>
    </section>
  );
}