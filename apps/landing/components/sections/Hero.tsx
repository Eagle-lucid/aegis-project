'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Github } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function HeroV2() {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden flex items-center justify-center bg-throne-abyss">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-throne-abyss via-throne-abyss-deep to-throne-bg-tertiary">
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{
            background: [
              'radial-gradient(circle at 20% 50%, rgba(16, 185, 129, 0.15) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 50%, rgba(6, 182, 212, 0.15) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 50%, rgba(16, 185, 129, 0.15) 0%, transparent 50%)',
            ],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      {/* Floating Particles (CSS) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-throne-cyan-500/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Content Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        
        {/* Left: Text Content */}
        <motion.div
          className="space-y-8 text-center lg:text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: showContent ? 1 : 0, x: showContent ? 0 : -50 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Your Command Center{' '}
            <span className="text-throne-cyan-500">Awaits</span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-white/70 font-light max-w-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            A new era of digital sovereignty begins—where you{' '}
            <span className="text-throne-emerald-500 font-medium">command</span>, not just observe.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 30 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link href="https://aegis-project.vercel.app" target="_blank">
              <motion.button
                className="group relative px-8 py-4 rounded-xl bg-gradient-to-r from-throne-emerald-500 to-throne-cyan-500 text-white font-medium text-lg overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center gap-3">
                  Enter the Throne
                  <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.button>
            </Link>

            <Link href="https://github.com/LucidTheEagle/aegis-project.git" target="_blank">
              <motion.button
                className="px-8 py-4 rounded-xl border-2 border-throne-cyan-500/30 text-throne-cyan-500 font-medium text-lg bg-transparent hover:bg-throne-cyan-500/10 transition-all flex items-center gap-3"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github size={20} />
                View Source
              </motion.button>
            </Link>
          </motion.div>

          <motion.p
            className="text-sm text-white/40 italic font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: showContent ? 1 : 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            "Not a dashboard. A throne."
          </motion.p>
        </motion.div>

        {/* Right: Throne Screenshot */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, x: 50, rotateY: -15 }}
          animate={{ 
            opacity: showContent ? 1 : 0, 
            x: showContent ? 0 : 50,
            rotateY: showContent ? 0 : -15
          }}
          transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
        >
          <div className="relative glass-panel p-2 glow-cyan">
            <Image
              src="/throne-hero.png"
              alt="Aegis Throne Interface"
              width={800}
              height={600}
              className="rounded-lg"
              priority
            />
            {/* Glow overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-throne-emerald-500/20 via-transparent to-throne-cyan-500/20 rounded-lg pointer-events-none" />
          </div>
        </motion.div>

      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : -10 }}
        transition={{ duration: 0.8, delay: 1, repeat: Infinity, repeatType: 'reverse', repeatDelay: 0.5 }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-throne-cyan-500/30 flex items-start justify-center p-2">
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-throne-cyan-500"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </section>
  );
}