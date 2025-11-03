// apps/landing/components/sections/BeforeAfterBridge/Mobile/MorphingCard.tsx
'use client';

import { motion } from 'framer-motion';
import type { CardPosition } from '../shared/types';
import { COLORS } from '../shared/constants';

interface MorphingCardProps {
  chaosPosition: CardPosition;
  gridPosition: CardPosition;
  progress: number;
  isChaos: boolean;
}

export default function MorphingCard({
  chaosPosition,
  gridPosition,
  progress,
  isChaos,
}: MorphingCardProps) {
  // Interpolate position
  const currentX = chaosPosition.x + (gridPosition.x - chaosPosition.x) * progress;
  const currentY = chaosPosition.y + (gridPosition.y - chaosPosition.y) * progress;
  const currentR = chaosPosition.rotate + (gridPosition.rotate - chaosPosition.rotate) * progress;

  // Color transition
  const borderColor = isChaos ? COLORS.CHAOS.BORDER : COLORS.ORDER.BORDER;
  const bgColor = isChaos ? COLORS.CHAOS.SECONDARY : COLORS.ORDER.SECONDARY;

  return (
    <motion.div
      className="absolute w-16 h-16 rounded-xl border-2 backdrop-blur-sm transition-colors duration-500"
      style={{
        x: currentX,
        y: currentY,
        rotate: currentR,
        borderColor,
        backgroundColor: bgColor,
      }}
    />
  );
}