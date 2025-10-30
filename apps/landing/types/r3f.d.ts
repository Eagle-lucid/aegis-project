// apps/landing/types/r3f.d.ts
// apps/landing/types/r3f.d.ts
import { Object3DNode } from '@react-three/fiber';
import * as THREE from 'three';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      // Lights
      directionalLight: Object3DNode<THREE.DirectionalLight, typeof THREE.DirectionalLight>;
      spotLight: Object3DNode<THREE.SpotLight, typeof THREE.SpotLight>;
      ambientLight: Object3DNode<THREE.AmbientLight, typeof THREE.AmbientLight>;
      pointLight: Object3DNode<THREE.PointLight, typeof THREE.PointLight>;
      
      // Objects
      group: Object3DNode<THREE.Group, typeof THREE.Group>;
      mesh: Object3DNode<THREE.Mesh, typeof THREE.Mesh>;
      
      // Geometries
      boxGeometry: Object3DNode<THREE.BoxGeometry, typeof THREE.BoxGeometry>;
      sphereGeometry: Object3DNode<THREE.SphereGeometry, typeof THREE.SphereGeometry>;
      
      // Materials
      meshStandardMaterial: Object3DNode<THREE.MeshStandardMaterial, typeof THREE.MeshStandardMaterial>;
      
      // Special
      primitive: Object3DNode<THREE.Object3D, typeof THREE.Object3D> & { 
        object: THREE.Object3D;
      };
      fog: Object3DNode<THREE.Fog, typeof THREE.Fog>;
    }
  }
}

export {};