// apps/landing/components/sections/BeforeAfterBridge/Mobile/TransformSlider.tsx
'use client';

import { motion, useMotionValue, useTransform } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useEffect } from 'react';
import { useHaptic } from '../shared/hooks';
import { MOBILE, COLORS } from '../shared/constants';

interface TransformSliderProps {
  onProgressChange: (progress: number) => void;
}

export default function TransformSlider({ onProgressChange }: TransformSliderProps) {
  const x = useMotionValue(0);
  const { triggerOnce } = useHaptic();

  // Progress calculation
  const progress = useTransform(x, [0, MOBILE.SLIDER_MAX_DRAG], [0, 1]);

  // Update parent on drag
  useEffect(() => {
    const unsubscribe = x.on('change', (latest) => {
      const prog = Math.max(0, Math.min(1, latest / MOBILE.SLIDER_MAX_DRAG));
      onProgressChange(prog);
      triggerOnce(MOBILE.HAPTIC_THRESHOLD, prog);
    });
    return unsubscribe;
  }, [x, onProgressChange, triggerOnce]);

  // Progress ring radius
  const ringProgress = useTransform(progress, [0, 1], [0, 100]);

  return (
    <div className="relative w-full max-w-sm">
      <div className="relative h-16 bg-throne-bg-tertiary/60 rounded-2xl border-2 border-throne-cyan-500/30 overflow-hidden backdrop-blur-lg">
        {/* Progress fill */}
        <motion.div
          className="absolute inset-y-0 left-0 bg-linear-to-r from-throne-cyan-500/30 to-throne-emerald-500/30"
          style={{ width: useTransform(x, [0, MOBILE.SLIDER_MAX_DRAG], ['0%', '100%']) }}
        />

        {/* Draggable handle with progress ring */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 w-14 h-14 flex items-center justify-center"
          style={{ x, left: 8 }}
          drag="x"
          dragConstraints={{ left: 0, right: MOBILE.SLIDER_MAX_DRAG }}
          dragElastic={0}
          dragMomentum={false}
          whileTap={{ scale: 0.95 }}
        >
          {/* Progress ring */}
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke={COLORS.BRIDGE.CYAN}
              strokeWidth="3"
              opacity="0.2"
            />
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke={COLORS.BRIDGE.EMERALD}
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="283" // 2 * π * 45
              style={{
                strokeDashoffset: useTransform(ringProgress, [0, 100], [283, 0]),
              }}
            />
          </svg>

          {/* Handle */}
          <div className="relative z-10 w-14 h-14 bg-linear-to-r from-throne-cyan-500 to-throne-emerald-500 rounded-xl shadow-2xl cursor-grab active:cursor-grabbing flex items-center justify-center">
            <ChevronRight className="text-white" size={26} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}