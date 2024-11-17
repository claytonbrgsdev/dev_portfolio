import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import Tentacle from './Tentacle';
import * as THREE from 'three';

const Jellyfish: React.FC = () => {
  const tentacleCount = 10;
  const tentacleProps = {
    segmentCount: 20,
    segmentLength: 0.15,
    baseRadius: 0.02,
    frequency: 1.2,
    amplitude: 0.3,
    phaseOffset: 0.4,
  };

  const groupRef = useRef<THREE.Group>(null);
  const swimSpeed = 0.3;
  const swimAmplitude = 0.3;

  useFrame(({ clock }) => {
    if (groupRef.current) {
      const time = clock.getElapsedTime();
      // Bobbing up and down
      groupRef.current.position.y = 1.5 + Math.sin(time * swimSpeed) * swimAmplitude;
      // Rotate for a gentle "swimming" effect
      groupRef.current.rotation.y = Math.sin(time * swimSpeed * 0.5) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Jellyfish Body */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhysicalMaterial
          color="#ffffff"
          transparent
          opacity={0.5}
          transmission={0.9}
          roughness={0}
          metalness={0}
          clearcoat={1}
          clearcoatRoughness={0}
          reflectivity={0.5}
          emissive="#aaffff"
          emissiveIntensity={0.7}
        />
      </mesh>

      {/* Tentacles */}
      {Array.from({ length: tentacleCount }).map((_, i) => {
        const angle = (i / tentacleCount) * Math.PI * 2;
        return (
          <group
            key={i}
            position={[
              Math.cos(angle) * 0.5,
              -0.5,
              Math.sin(angle) * 0.5,
            ]}
            rotation={[0, angle, 0]}
          >
            <Tentacle {...tentacleProps} />
          </group>
        );
      })}
    </group>
  );
};

export default Jellyfish;