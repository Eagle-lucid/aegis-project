// apps/landing/components/sections/BeforeAfterBridge/shared/types.ts

export interface ScrollProgress {
  overall: number;
  arrival: number;
  revelation: number;
  climax: number;
}

export interface BridgeProps {
  progress: ScrollProgress;
}

export interface MobileProgressProps {
  progress: number;
  onProgressChange: (progress: number) => void;
}

export interface CardPosition {
  x: number;
  y: number;
  rotate: number;
}