// apps/landing/components/three/ThreeModel.tsx
'use client';

import { useGLTF } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from 'three';

interface ThroneModelProps {
    rotation: [number, number, number];
    position: [number, number, number];
}

export default function ThreeModel({ rotation, position }: ThroneModelProps) {
    const meshRef = useRef<THREE.Group>(null);
    const { scene } = useGLTF('/models/throne.glb');
    const clonedScene = scene.clone();

    clonedScene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;

            if (child.material) {
                child.material = child.material.clone();
                child.material.metalness = 0.9;
                child.material.roughness = 0.2;
                child.material.emissive = new THREE.Color('#10b981');
                child.material.emissiveIntensity = 0.3;
            }
        }
    });

    return (
        <group ref={meshRef} rotation={rotation} position={position}>
          <primitive object={clonedScene} scale={1.5} />
        </group>
    );
}

useGLTF.preload('/models/throne.glb');