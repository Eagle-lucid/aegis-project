// apps/landing/components/effects/AegisSignil.tsx
'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

export default function AegisSignil() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !imageRef.current || !glowRef.current) return;

    const tl = gsap.timeline({ delay: 2.5 });

    tl
      // Sigil materializes smoothly
      .fromTo(
        containerRef.current,
        { opacity: 0, scale: 0.4 },
        {
          opacity: 1,
          scale: 1,
          duration: 2,
          ease: 'power2.out',
        }
      )

      // Glow pulses infinitely
      .to(
        glowRef.current,
        {
          opacity: 0.6,
          scale: 1.2,
          duration: 2.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        },
        '-=1'
      )

      // Subtle rotation for depth
      .to(
        imageRef.current,
        {
          rotate: 360,
          duration: 40,
          repeat: -1,
          ease: 'none',
          transformOrigin: 'center center',
        },
        '-=2'
      );
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-32 h-32 md:w-48 md:h-48 lg:w-56 lg:h-56 mb-8 flex items-center justify-center"
    >
      {/* Glow layer */}
      <div
        ref={glowRef}
        className="absolute inset-0 rounded-full blur-3xl bg-linear-to-r from-throne-cyan-500 via-throne-emerald-500 to-throne-cyan-500 opacity-30"
      />

      {/* Logo container (so ref typing works cleanly) */}
      <div ref={imageRef} className="relative z-10 w-full h-full">
        <Image
          src="/logo-light.svg"
          alt="Aegis Sigil"
          width={224}
          height={224}
          className="w-full h-full object-contain"
          priority
        />
      </div>
    </div>
  );
}
