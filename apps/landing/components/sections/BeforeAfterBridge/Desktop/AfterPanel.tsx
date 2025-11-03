// apps/landing/components/sections/BeforeAfterBridge/Desktop/AfterPanel.tsx
'use client';

import { motion } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import { COLORS, ANIMATIONS, CONTENT } from '../shared/constants';

interface AfterPanelProps {
  x: MotionValue<string>;
  opacity: MotionValue<number>;
  scale: MotionValue<number>;
}

export default function AfterPanel({ x, opacity, scale }: AfterPanelProps) {
  return (
    <motion.div
      className="absolute right-0 w-[500px] h-[650px] flex flex-col items-center justify-center rounded-3xl overflow-hidden"
      style={{ x, opacity, scale }}
    >
      <div className="absolute inset-0 bg-linear-to-br from-throne-emerald-900/40 via-throne-bg-secondary/80 to-throne-cyan-900/30 backdrop-blur-xl border border-throne-emerald-500/30 rounded-3xl" />

      <div className="relative z-10 text-center space-y-8 p-12">
        <motion.h3
          className="text-6xl font-bold text-white tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          {CONTENT.AFTER.TITLE}
        </motion.h3>

        <div className="space-y-4">
          {CONTENT.AFTER.WORDS.map((word, i) => (
            <motion.p
              key={word}
              className="text-2xl text-white/70 font-light tracking-wide"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 + i * 0.15, duration: 0.6 }}
            >
              {word}
            </motion.p>
          ))}
        </div>
      </div>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-16">
        <div className="grid grid-cols-3 gap-4">
          {[...Array(9)].map((_, i) => (
            <motion.div
              key={i}
              className="w-12 h-12"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 + i * 0.1, duration: 0.5 }}
            >
              <motion.div
                className="w-full h-full rounded-xl border-2 backdrop-blur-sm"
                style={{
                  borderColor: COLORS.ORDER.BORDER,
                  backgroundColor: COLORS.ORDER.SECONDARY,
                }}
                animate={{
                  scale: [1, ANIMATIONS.CARD_PULSE_SCALE, 1],
                }}
                transition={{
                  duration: ANIMATIONS.CARD_PULSE_DURATION,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.3,
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        className="absolute inset-0 rounded-3xl"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${COLORS.ORDER.GLOW} 0%, transparent 70%)`,
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