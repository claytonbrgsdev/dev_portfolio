// Animation.tsx
import React, { MutableRefObject } from 'react';
import { useFrame } from '@react-three/fiber';
import { a, useSpring } from '@react-spring/three';
import MyModel from './MyModel';
import * as THREE from 'three';

const Animation: React.FC = () => {
  // Configure spring animations for rotation and scale
  const { rotation, scale } = useSpring({
    from: { rotation: [0, 0, 0], scale: 1 },
    to: async (next) => {
      while (true) {
        await next({ rotation: [0, Math.PI * 2, 0], scale: 1.2 });
        await next({ rotation: [0, 0, 0], scale: 1 });
      }
    },
    config: { tension: 120, friction: 14 },
  });

  // Movement for floating effect
  const meshRef: MutableRefObject<THREE.Group | null> = React.useRef(null);
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.position.y = Math.sin(clock.getElapsedTime()) * 0.2;
    }
  });

  return (
    <a.group
      ref={meshRef}
      scale={scale}
      rotation={rotation as unknown as [number, number, number]}
    >
      <MyModel />
    </a.group>
  );
};

export default Animation;