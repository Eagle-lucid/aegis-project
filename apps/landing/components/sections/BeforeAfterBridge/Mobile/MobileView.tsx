// apps/landing/components/sections/BeforeAfterBridge/Mobile/MobileView.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import TransformSlider from './TransformSlider';
import MorphingCard from './MorphingCard';
import type { CardPosition } from '../shared/types';
import { CONTENT, MOBILE } from '../shared/constants';

export default function MobileView() {
  const [progress, setProgress] = useState(0);

  const isChaos = progress < 0.5;

  // Card positions (6 cards)
  const chaosPositions: CardPosition[] = [
    { x: -90, y: -70, rotate: -18 },
    { x: 70, y: -90, rotate: 22 },
    { x: -60, y: 10, rotate: -28 },
    { x: 80, y: 30, rotate: 16 },
    { x: -70, y: 110, rotate: 12 },
    { x: 60, y: 120, rotate: -24 },
  ];

  const gridPositions: CardPosition[] = [
    { x: -70, y: -90, rotate: 0 },
    { x: 0, y: -90, rotate: 0 },
    { x: 70, y: -90, rotate: 0 },
    { x: -70, y: 10, rotate: 0 },
    { x: 0, y: 10, rotate: 0 },
    { x: 70, y: 10, rotate: 0 },
  ];

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center p-6 pt-20 bg-throne-abyss">
      {/* Instruction */}
      <motion.p
        className="text-sm text-throne-cyan-400 text-center mb-8 font-medium tracking-wider uppercase"
        animate={{ opacity: progress < MOBILE.COMPLETION_THRESHOLD ? 1 : 0.6 }}
      >
        {progress < MOBILE.COMPLETION_THRESHOLD ? 'Drag to Transform →' : '✓ Transformation Complete'}
      </motion.p>

      {/* Slider */}
      <TransformSlider onProgressChange={setProgress} />

      {/* Morphing Card View */}
      <motion.div
        className="w-full max-w-md h-[550px] relative overflow-hidden mt-10 rounded-3xl border-2 transition-colors duration-700"
        style={{
          backgroundColor: isChaos 
            ? 'rgba(239, 68, 68, 0.1)' 
            : 'rgba(16, 185, 129, 0.1)',
          borderColor: isChaos 
            ? 'rgba(239, 68, 68, 0.3)' 
            : 'rgba(16, 185, 129, 0.3)',
          backdropFilter: 'blur(20px)',
        }}
      >
        {/* Header */}
        <div className="absolute top-10 left-0 right-0 text-center z-10 px-6">
          <motion.h3
            className="text-4xl font-bold text-white mb-6"
            key={isChaos ? 'before' : 'after'}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {isChaos ? CONTENT.BEFORE.TITLE : CONTENT.AFTER.TITLE}
          </motion.h3>

          <div className="space-y-3 text-lg text-white/70 font-light">
            {(isChaos ? CONTENT.BEFORE.WORDS : CONTENT.AFTER.WORDS).map((word, i) => (
              <motion.p
                key={word}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                {word}
              </motion.p>
            ))}
          </div>
        </div>

        {/* Morphing Cards */}
        <div className="absolute inset-0 flex items-center justify-center pt-10">
          {chaosPositions.map((chaosPos, i) => (
            <MorphingCard
              key={i}
              chaosPosition={chaosPos}
              gridPosition={gridPositions[i]}
              progress={progress}
              isChaos={isChaos}
            />
          ))}
        </div>

        {/* Gradient atmosphere */}
        <motion.div
          className="absolute inset-0 rounded-3xl pointer-events-none"
          style={{
            background: isChaos
              ? 'radial-gradient(circle at 50% 50%, rgba(239, 68, 68, 0.2) 0%, transparent 70%)'
              : 'radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.2) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.div>
    </div>
  );
}