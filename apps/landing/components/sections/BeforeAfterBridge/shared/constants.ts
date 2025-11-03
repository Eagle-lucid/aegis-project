// apps/landing/components/sections/BeforeAfterBridge/shared/constants.ts
export const SCROLL_STAGES = {
    // Pin starts at 0, ends at 1
    ARRIVAL_START: 0,
    ARRIVAL_END: 0.25,      // 25% of pin duration
    PAUSE_START: 0.25,
    PAUSE_END: 0.4,         // 15% pause
    REVELATION_START: 0.4,
    REVELATION_END: 0.7,    // 30% for door opening
    CLIMAX_START: 0.7,
    CLIMAX_END: 1.0,        // 30% for full effects
  } as const;
  
  export const PANEL_POSITIONS = {
    // Stage 1: Off-screen to touching center
    BEFORE_START: '-100%',
    BEFORE_TOUCH: '-50%',    // Touch at center
    BEFORE_OPEN: '-52%',     // Slightly separated
    
    AFTER_START: '100%',
    AFTER_TOUCH: '50%',      // Touch at center (slight overlap)
    AFTER_OPEN: '52%',       // Slightly separated
  } as const;
  
  export const COLORS = {
    CHAOS: {
      PRIMARY: 'rgba(239, 68, 68, 0.4)',
      SECONDARY: 'rgba(239, 68, 68, 0.1)',
      BORDER: 'rgba(239, 68, 68, 0.3)',
      GLOW: 'rgba(239, 68, 68, 0.3)',
    },
    ORDER: {
      PRIMARY: 'rgba(16, 185, 129, 0.5)',
      SECONDARY: 'rgba(16, 185, 129, 0.1)',
      BORDER: 'rgba(16, 185, 129, 0.4)',
      GLOW: 'rgba(16, 185, 129, 0.3)',
    },
    BRIDGE: {
      CYAN: '#06B6D4',
      EMERALD: '#10B981',
    },
    BACKGROUND: {
      START: 'rgb(13, 17, 23)',
      MID: 'rgb(10, 40, 30)',
      END: 'rgb(6, 95, 70)',
    },
  } as const;
  
  export const ANIMATIONS = {
    CARD_DRIFT_RANGE: 40,        // pixels
    CARD_DRIFT_DURATION: 4,      // seconds
    CARD_PULSE_SCALE: 1.08,
    CARD_PULSE_DURATION: 4,
    BRIDGE_STROKE_MIN: 2,
    BRIDGE_STROKE_MAX: 6,
    BRIDGE_HEIGHT_MIN: 200,
    BRIDGE_HEIGHT_MAX: 600,
    BRIDGE_WIDTH: 600,
  } as const;
  
  export const CONTENT = {
    BEFORE: {
      TITLE: 'BEFORE',
      WORDS: ['Fragmented', 'Scattered', 'Reactive'],
    },
    AFTER: {
      TITLE: 'AFTER',
      WORDS: ['Unified', 'Focused', 'Sovereign'],
    },
    BRIDGE: {
      TEXT: 'From Chaos To Command',
    },
  } as const;
  
  export const MOBILE = {
    SLIDER_MAX_DRAG: 240,
    HAPTIC_THRESHOLD: 0.5,
    COMPLETION_THRESHOLD: 0.9,
  } as const;