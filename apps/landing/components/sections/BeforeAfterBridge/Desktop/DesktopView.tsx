// apps/landing/components/sections/BeforeAfterBridge/Desktop/DesktopView.tsx
'use client';

import { useMemo } from 'react';
import { useMotionValue, useTransform, motion } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import type { ScrollProgress } from '../shared/types';
import { PANEL_POSITIONS, SCROLL_STAGES, COLORS } from '../shared/constants';
import BeforePanel from './BeforePanel';
import AfterPanel from './AfterPanel';
import BridgeOverlay from './BridgeOverlay';

interface DesktopViewProps {
  scrollProgress: number;
}

export default function DesktopView({ scrollProgress }: DesktopViewProps) {
  const progressValue = useMotionValue(scrollProgress);
  
  useMemo(() => {
    progressValue.set(scrollProgress);
  }, [scrollProgress, progressValue]);

  const progress: ScrollProgress = useMemo(() => ({
    overall: scrollProgress,
    arrival:
      scrollProgress <= SCROLL_STAGES.ARRIVAL_END
        ? scrollProgress / SCROLL_STAGES.ARRIVAL_END
        : 1,
    revelation:
      scrollProgress >= SCROLL_STAGES.REVELATION_START && scrollProgress <= SCROLL_STAGES.REVELATION_END
        ? (scrollProgress - SCROLL_STAGES.REVELATION_START) /
          (SCROLL_STAGES.REVELATION_END - SCROLL_STAGES.REVELATION_START)
        : scrollProgress > SCROLL_STAGES.REVELATION_END
        ? 1
        : 0,
    climax:
      scrollProgress >= SCROLL_STAGES.CLIMAX_START
        ? (scrollProgress - SCROLL_STAGES.CLIMAX_START) /
          (SCROLL_STAGES.CLIMAX_END - SCROLL_STAGES.CLIMAX_START)
        : 0,
  }), [scrollProgress]);

  const beforeX = useTransform(
    progressValue,
    [0, SCROLL_STAGES.ARRIVAL_END, SCROLL_STAGES.REVELATION_START, SCROLL_STAGES.REVELATION_END],
    [
      PANEL_POSITIONS.BEFORE_START,
      PANEL_POSITIONS.BEFORE_TOUCH,
      PANEL_POSITIONS.BEFORE_TOUCH,
      PANEL_POSITIONS.BEFORE_OPEN,
    ]
  ) as MotionValue<string>;

  const afterX = useTransform(
    progressValue,
    [0, SCROLL_STAGES.ARRIVAL_END, SCROLL_STAGES.REVELATION_START, SCROLL_STAGES.REVELATION_END],
    [
      PANEL_POSITIONS.AFTER_START,
      PANEL_POSITIONS.AFTER_TOUCH,
      PANEL_POSITIONS.AFTER_TOUCH,
      PANEL_POSITIONS.AFTER_OPEN,
    ]
  ) as MotionValue<string>;

  const panelOpacity = useTransform(progressValue, [0, 0.2], [0, 1]);
  const panelScale = useTransform(progressValue, [0, SCROLL_STAGES.ARRIVAL_END], [0.92, 1]);

  const backgroundColor = useMemo(() => {
    if (scrollProgress <= SCROLL_STAGES.REVELATION_START) {
      return COLORS.BACKGROUND.START;
    } else if (scrollProgress <= SCROLL_STAGES.CLIMAX_START) {
      const t = (scrollProgress - SCROLL_STAGES.REVELATION_START) / 
                (SCROLL_STAGES.CLIMAX_START - SCROLL_STAGES.REVELATION_START);
      return `rgb(${13 + t * (10 - 13)}, ${17 + t * (40 - 17)}, ${23 + t * (30 - 23)})`;
    } else {
      const t = (scrollProgress - SCROLL_STAGES.CLIMAX_START) / 
                (SCROLL_STAGES.CLIMAX_END - SCROLL_STAGES.CLIMAX_START);
      return `rgb(${10 + t * (6 - 10)}, ${40 + t * (95 - 40)}, ${30 + t * (70 - 30)})`;
    }
  }, [scrollProgress]);

  return (
    <motion.div
      className="w-full h-screen flex items-center justify-center relative"
      style={{ backgroundColor }}
    >
      <BridgeOverlay progress={progress} />
      <BeforePanel x={beforeX} opacity={panelOpacity} scale={panelScale} />
      <AfterPanel x={afterX} opacity={panelOpacity} scale={panelScale} />
    </motion.div>
  );
}