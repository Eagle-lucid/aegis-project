// apps/landing/components/sections/BeforeAfterBridge/BeforeAfterBridge.tsx
'use client';

import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import DesktopView from './Desktop';
import MobileView from './Mobile';

// Register GSAP plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function BeforeAfterBridge() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  // Check if desktop on mount
  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  useEffect(() => {
    // Only create ScrollTrigger on desktop
    if (!sectionRef.current || !isDesktop) return;

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: '+=300%',
      pin: true,
      scrub: 1,
      anticipatePin: 1,
      onUpdate: (self) => {
        setScrollProgress(self.progress);
      },
    });

    return () => {
      trigger.kill();
    };
  }, [isDesktop]);

  return (
    <section
      ref={sectionRef}
      id="act-2"
      className="relative w-full min-h-screen overflow-hidden"
    >
      {/* Desktop: Pinned scroll experience */}
      <div className="hidden md:block">
        <DesktopView scrollProgress={scrollProgress} />
      </div>

      {/* Mobile/Tablet: Drag-to-transform (no pin) */}
      <div className="md:hidden">
        <MobileView />
      </div>
    </section>
  );
}