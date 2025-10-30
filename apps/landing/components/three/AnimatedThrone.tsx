// apps/landing/components/three/AnimatedThrone.tsx
'use client';

import { useEffect, useState, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useSpring, animated } from "@react-spring/three";
import ThroneModel from "./ThroneModel";

export default function AnimatedThrone() {
    const [phase, setPhase] = useState<'hidden' | 'descending' | 'rotating' | 'idle'>('hidden');
    const groupRef = useRef<any>();
    const floatTime = useRef(0);

    const { position, rotation } = useSpring({
        position: phase === 'hidden' ? [0, 10, 0] : [0, 0, 0],
        rotation: (phase === 'rotating' || phase === 'idle') ? [0, Math.PI, 0] : [0, 0, 0],
        config: { tension: 50, friction: 20, mass: 2 },
    });

    useFrame((state, delta) => {
        if (phase === 'idle' && groupRef.current) {
            floatTime.current += delta;
            groupRef.current.position.y = Math.sin(floatTime.current) * 0.2;
        }
    });

    useEffect(() => {
        const timeline = async () => {
          await new Promise(resolve => setTimeout(resolve, 2000));
          setPhase('descending');
          await new Promise(resolve => setTimeout(resolve, 2000));
          setPhase('rotating');
          await new Promise(resolve => setTimeout(resolve, 1000));
          setPhase('idle');
        };
        timeline();
    }, []);

    return (
        <animated.group ref={groupRef} position={position} rotation={rotation as any}>
          <ThroneModel position={[0, 0, 0]} rotation={[0, 0, 0]} />
        </animated.group>
      );
}