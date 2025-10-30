// apps/landing/components/ui/GlassNav.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Menu, X, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const navItems = [
  { label: 'Throne', href: '#hero' },
  { label: 'Transformation', href: '#transformation' },
  { label: 'Command', href: '#orbit' },
  { label: 'Intelligence', href: '#insight' },
];

export default function GlassNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const { scrollY } = useScroll();

  const navOpacity = useTransform(scrollY, [0, 100], [0.8, 1]);
  const glowIntensity = useTransform(scrollY, [0, 100], [0, 0.3]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.href.replace('#', ''));
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <motion.nav className="glass-nav" style={{ opacity: navOpacity }}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <motion.div className="w-10 h-10" whileHover={{ scale: 1.1 }}>
                <Image 
                  src='/logo-light.svg'
                  alt="Aegis shield"
                  width={40}
                  height={40}
                  className="drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]"
                  priority
                />
              </motion.div>
              <div className="hidden md:block">
                <h1 className="text-xl font-bold text-white tracking-wider font-display">
                  AEGIS
                </h1>
                <p className="text-xs tracking-widest text-throne-cyan-500 font-sans">
                  SOVEREIGN COMMAND
                </p>
              </div>
            </Link>

            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.replace('#', '');
                return (
                  <button
                    key={item.href}
                    onClick={() => handleNavClick(item.href)}
                    className={`relative px-4 py-2 font-sans text-sm font-medium transition-colors duration-300 group ${
                      isActive ? 'text-throne-cyan-500' : 'text-white/70 hover:text-white'
                    }`}
                  >
                    <span className="relative z-10">{item.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute inset-0 rounded-lg bg-throne-cyan-500/10 border border-throne-cyan-500/30"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="hidden lg:flex items-center gap-3">
              <Link
                href="https://github.com/LucidTheEagle/aegis-project.git"
                target="_blank"
                className="px-4 py-2 text-sm font-sans font-medium text-white/70 hover:text-white transition-colors"
              >
                GitHub
              </Link>
              <Link href="https://aegis-project.vercel.app" target="_blank" className="group">
                <motion.div
                  className='relative px-6 py-2 rounded-lg bg-gradient-to-r from-throne-emerald-500 to-throne-cyan-500 font-sans text-white font-medium text-sm overflow-hidden'
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Enter Throne
                    <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </motion.div>
              </Link>
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`lg:hidden p-2 transition-colors ${isOpen ? 'text-throne-cyan-500' : 'text-white'}`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-throne-cyan-500 to-transparent"
          style={{ opacity: glowIntensity }}
        />
      </motion.nav>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{
          opacity: isOpen ? 1 : 0,
          y: isOpen ? 0 : -20,
          pointerEvents: isOpen ? 'auto' : 'none',
        }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-40 lg:hidden top-[73px]"
      >
        <motion.div
          className="absolute inset-0 bg-throne-abyss/95 backdrop-blur-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: isOpen ? 1 : 0 }}
          onClick={() => setIsOpen(false)}
        />

        <div className="relative z-50 max-w-sm mx-auto mt-4 p-6">
          <div className="glass-panel p-6 space-y-2">
            {navItems.map((item, index) => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <motion.button
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : -20 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleNavClick(item.href)}
                  className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all ${
                    isActive
                      ? 'bg-throne-cyan-500/10 text-throne-cyan-500 border border-throne-cyan-500/30'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </motion.button>
              );
            })}

            <div className="pt-4 space-y-3 border-t border-white/10">
              <Link
                href="https://github.com/LucidTheEagle/aegis-project.git"
                target="_blank"
                className="block w-full px-4 py-3 rounded-lg text-center font-medium text-white/70 hover:bg-white/5 hover:text-white transition-all"
              >
                View on GitHub
              </Link>
              <Link
                href="https://aegis-project.vercel.app"
                target="_blank"
                className="block w-full px-4 py-3 rounded-lg text-center font-medium text-white bg-gradient-to-r from-throne-emerald-500 to-throne-cyan-500"
              >
                Enter the Throne →
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}