// apps/landing/components/sections/Hero.tsx
'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Github } from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const ThroneScene = dynamic(() => import('../three/ThroneScene'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-throne-abyss" />,
});

export default function Hero() {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section 
      id="hero" 
      className="relative min-h-screen w-full overflow-hidden flex items-end justify-center pb-32 bg-throne-emerald-500"
    >
      <ThroneScene />

      <motion.div
        className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.05 }}
        transition={{ duration: 2 }}
      >
        <div className="text-[20rem] font-display font-bold text-throne-cyan-500">A</div>
      </motion.div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 20 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Your Command Center <span className="text-throne-cyan-500">Awaits</span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-white/70 font-light max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 30 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            A new era of digital sovereignty begins—where you <span className="text-throne-emerald-500 font-medium">command</span>, not just observe.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 30 }}
            transition={{ duration: 0.8, delay: 0.8 }}
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
            transition={{ duration: 1, delay: 1.2 }}
          >
            "Not a dashboard. A throne."
          </motion.p>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : -10 }}
        transition={{ duration: 0.8, delay: 1.5, repeat: Infinity, repeatType: 'reverse', repeatDelay: 0.5 }}
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