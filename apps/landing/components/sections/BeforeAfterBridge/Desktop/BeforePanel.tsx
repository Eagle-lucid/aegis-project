// apps/landing/components/sections/BeforeAfterBridge/Desktop/BeforePanel.tsx
'use client';

import { motion } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import { COLORS, ANIMATIONS, CONTENT } from '../shared/constants';

interface BeforePanelProps {
  x: MotionValue<string>;
  opacity: MotionValue<number>;
  scale: MotionValue<number>;
}

export default function BeforePanel({ x, opacity, scale }: BeforePanelProps) {
  // Component code stays exactly the same
  return (
    <motion.div
      className="absolute left-0 w-[500px] h-[650px] flex flex-col items-center justify-center rounded-3xl overflow-hidden"
      style={{ x, opacity, scale }}
    >
      <div className="absolute inset-0 bg-linear-to-br from-red-900/40 via-throne-bg-secondary/80 to-throne-bg-tertiary/60 backdrop-blur-xl border border-red-500/30 rounded-3xl" />

      <div className="relative z-10 text-center space-y-8 p-12">
        <motion.h3
          className="text-6xl font-bold text-white tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          {CONTENT.BEFORE.TITLE}
        </motion.h3>

        <div className="space-y-4">
          {CONTENT.BEFORE.WORDS.map((word, i) => (
            <motion.p
              key={word}
              className="text-2xl text-white/70 font-light tracking-wide"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 + i * 0.15, duration: 0.6 }}
            >
              {word}
            </motion.p>
          ))}
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none p-12">
        {[...Array(9)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-12 h-12 rounded-xl border-2 backdrop-blur-sm"
            style={{
              left: `${10 + (i % 3) * 35}%`,
              top: `${15 + Math.floor(i / 3) * 30}%`,
              borderColor: COLORS.CHAOS.BORDER,
              backgroundColor: COLORS.CHAOS.SECONDARY,
            }}
            animate={{
              x: [0, Math.random() * ANIMATIONS.CARD_DRIFT_RANGE - ANIMATIONS.CARD_DRIFT_RANGE / 2, 0],
              y: [0, Math.random() * ANIMATIONS.CARD_DRIFT_RANGE - ANIMATIONS.CARD_DRIFT_RANGE / 2, 0],
            }}
            transition={{
              duration: ANIMATIONS.CARD_DRIFT_DURATION + Math.random() * 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <motion.div
        className="absolute inset-0 rounded-3xl"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${COLORS.CHAOS.GLOW} 0%, transparent 70%)`,
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </motion.div>
  );
}