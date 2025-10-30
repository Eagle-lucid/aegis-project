// apps/landing/types/r3f.d.ts
import { JSX as ThreeJSX } from '@react-three/fiber';

declare global {
  namespace JSX {
    // Merge all R3F intrinsic elements globally
    interface IntrinsicElements extends ThreeJSX.IntrinsicElements {}
  }
}

export {};
