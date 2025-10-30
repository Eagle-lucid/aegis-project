// apps/landing/components/three/ThroneScene.tsx
'use client';

import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import { Suspense } from 'react';
import AnimatedThrone from './AnimatedThrone';

export default function ThroneScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        shadows
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        <PerspectiveCamera makeDefault position={[0, 1, 8]} fov={45} />

        {/* Lighting Setup */}
        <directionalLight
          position={[5, 5, 5]}
          intensity={1.2}
          color="#10b981"
          castShadow
        />
        <directionalLight
          position={[-3, 2, -5]}
          intensity={0.6}
          color="#06b6d4"
        />
        <spotLight
          position={[0, 5, -5]}
          intensity={0.8}
          color="#8b5cf6"
          angle={0.6}
          penumbra={1}
        />
        <ambientLight intensity={0.2} />

        {/* Atmospheric fog */}
        <fog attach="fog" args={['#0D1117', 10, 50]} />

        {/* 3D Throne */}
        <Suspense>
          <AnimatedThrone />
        </Suspense>
      </Canvas>
    </div>
  );
}
