// apps/landing/components/sections/BeforeAfterBridge/Desktop/BridgeOverlay.tsx
'use client';

import { motion } from 'framer-motion';
import type { BridgeProps } from '../shared/types';
import { COLORS, ANIMATIONS, CONTENT } from '../shared/constants';

export default function BridgeOverlay({ progress }: BridgeProps) {
  const isRevealing = progress.revelation > 0;
  const isClimax = progress.climax > 0;

  // Calculate dimensions based on progress
  const verticalHeight =
    ANIMATIONS.BRIDGE_HEIGHT_MIN +
    progress.revelation * (ANIMATIONS.BRIDGE_HEIGHT_MAX - ANIMATIONS.BRIDGE_HEIGHT_MIN);
  
  const horizontalWidth = progress.revelation * ANIMATIONS.BRIDGE_WIDTH;
  
  const strokeWidth =
    ANIMATIONS.BRIDGE_STROKE_MIN +
    progress.revelation * (ANIMATIONS.BRIDGE_STROKE_MAX - ANIMATIONS.BRIDGE_STROKE_MIN);

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none z-20"
      viewBox="0 0 1920 1080"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Glow filter */}
        <filter id="bridge-glow" x="-200%" y="-200%" width="500%" height="500%">
          <feGaussianBlur stdDeviation="16" result="blur1" />
          <feGaussianBlur stdDeviation="8" result="blur2" />
          <feMerge>
            <feMergeNode in="blur1" />
            <feMergeNode in="blur2" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Gradients */}
        <linearGradient id="bridge-gradient-v" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={COLORS.BRIDGE.EMERALD} />
          <stop offset="50%" stopColor={COLORS.BRIDGE.CYAN} />
          <stop offset="100%" stopColor={COLORS.BRIDGE.EMERALD} />
        </linearGradient>

        <linearGradient id="bridge-gradient-h" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={COLORS.BRIDGE.CYAN} />
          <stop offset="50%" stopColor={COLORS.BRIDGE.EMERALD} />
          <stop offset="100%" stopColor={COLORS.BRIDGE.CYAN} />
        </linearGradient>
      </defs>

      {/* REVELATION: Cross bridge formation */}
      {isRevealing && (
        <g opacity={Math.min(progress.revelation * 2, 1)}>
          {/* Vertical line */}
          <line
            x1="960"
            y1={540 - verticalHeight / 2}
            x2="960"
            y2={540 + verticalHeight / 2}
            stroke="url(#bridge-gradient-v)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            filter="url(#bridge-glow)"
          />

          {/* Horizontal line (left) */}
          <line
            x1={960 - horizontalWidth}
            y1="540"
            x2="960"
            y2="540"
            stroke="url(#bridge-gradient-h)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            filter="url(#bridge-glow)"
          />

          {/* Horizontal line (right) */}
          <line
            x1="960"
            y1="540"
            x2={960 + horizontalWidth}
            y2="540"
            stroke="url(#bridge-gradient-h)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            filter="url(#bridge-glow)"
          />

          {/* Center nexus */}
          <circle
            cx="960"
            cy="540"
            r={6 + progress.revelation * 8}
            fill={COLORS.BRIDGE.EMERALD}
            filter="url(#bridge-glow)"
          />

          {/* Text at center */}
          {progress.revelation > 0.5 && (
            <motion.text
              x="960"
              y="560"
              textAnchor="middle"
              fill={COLORS.BRIDGE.EMERALD}
              fontSize="22"
              fontWeight="300"
              letterSpacing="3"
              filter="url(#bridge-glow)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              {CONTENT.BRIDGE.TEXT}
            </motion.text>
          )}
        </g>
      )}

      {/* CLIMAX: Energy effects */}
      {isClimax && (
        <>
          {/* Expanding rings */}
          <motion.circle
            cx="960"
            cy="540"
            r="0"
            stroke={COLORS.BRIDGE.EMERALD}
            strokeWidth="3"
            fill="none"
            animate={{
              r: [0, 120, 240],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeOut',
            }}
          />

          <motion.circle
            cx="960"
            cy="540"
            r="0"
            stroke={COLORS.BRIDGE.CYAN}
            strokeWidth="2"
            fill="none"
            animate={{
              r: [0, 100, 200],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeOut',
              delay: 1,
            }}
          />

          {/* Traveling pulse */}
          <motion.circle
            cx="960"
            cy="540"
            r="12"
            fill={COLORS.BRIDGE.CYAN}
            filter="url(#bridge-glow)"
            animate={{
              cx: [360, 960, 1560],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        </>
      )}
    </svg>
  );
}