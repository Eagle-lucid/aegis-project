// apps/landing/components/sections/BeforeAfterBridge/shared/hooks.ts
import { useRef } from 'react';

/**
 * Trigger haptic feedback (if supported)
 */
export function useHaptic() {
  const hasTriggered = useRef(false);

  const triggerHaptic = (intensity: 'light' | 'medium' | 'heavy' = 'light') => {
    if ('vibrate' in navigator) {
      const duration = intensity === 'light' ? 10 : intensity === 'medium' ? 20 : 30;
      navigator.vibrate(duration);
    }
  };

  const triggerOnce = (threshold: number, currentProgress: number) => {
    if (!hasTriggered.current && currentProgress >= threshold) {
      triggerHaptic('medium');
      hasTriggered.current = true;
    }
    
    // Reset if user drags back below threshold
    if (currentProgress < threshold - 0.1) {
      hasTriggered.current = false;
    }
  };

  return { triggerHaptic, triggerOnce };
}

/**
 * Interpolate between two values based on progress
 */
export function interpolate(
  progress: number,
  inputRange: [number, number],
  outputRange: [number, number]
): number {
  const [inputMin, inputMax] = inputRange;
  const [outputMin, outputMax] = outputRange;
  
  const clampedProgress = Math.max(0, Math.min(1, (progress - inputMin) / (inputMax - inputMin)));
  return outputMin + (outputMax - outputMin) * clampedProgress;
}