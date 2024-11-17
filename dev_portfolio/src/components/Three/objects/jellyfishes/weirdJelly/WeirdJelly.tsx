// Jellyfish.tsx
import React, { useRef } from 'react';
import Tentacle from './WeirdJellyTentacle';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const WeirdJelly: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null!);

  // Positions for multiple tentacles around the WeirdLookingThing body
  const tentacleAngles = useRef<number[]>([]);
  const tentacleCount = 8;
  const radius = 0.8;

  // Initialize tentacle angles
  if (tentacleAngles.current.length === 0) {
    for (let i = 0; i < tentacleCount; i++) {
      tentacleAngles.current.push((i / tentacleCount) * Math.PI * 2);
    }
  }

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    groupRef.current.position.y = 5 + Math.sin(time * 0.5) * 0.2;
  });

  return (
    <group ref={groupRef}>
      {/* WeirdLookingThing Body */}
      <mesh position={[0, 2, 0]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshPhysicalMaterial
          color="#ff69b4"
          transmission={0.9}
          thickness={0.5}
          roughness={0}
          metalness={0}
          clearcoat={1}
          clearcoatRoughness={0}
        />
      </mesh>

      {/* Tentacles */}
      {tentacleAngles.current.map((angle, idx) => {
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        return (
          <Tentacle
            key={idx}
            segments={15}
            segmentLength={0.4}
            baseRadius={0.05}
            tipRadius={0.02}
            basePosition={[x, 1.5, z]}
            curveAmplitude={0.3}
            noiseScale={1}
            noiseSpeed={0.5}
          />
        );
      })}
    </group>
  );
};

export default WeirdJelly;