import React from 'react';
import { Canvas } from '@react-three/fiber';
import Jellyfish from './Jellyfish';
import { Environment, ContactShadows } from '@react-three/drei';
import { OrbitControls } from '@react-three/drei';

const SceneMK3: React.FC = () => {
  return (
    <Canvas camera={{ position: [0, 2, 6], fov: 60 }}>
    {/* Ambient Lighting */}
    <ambientLight intensity={0.1} />

    {/* Directional Light */}
    <directionalLight
      position={[5, 10, 7.5]}
      intensity={0.5}
      color="#ffffff"
    />

    {/* Soft Shadows */}
    <ContactShadows
      position={[0, -1.5, 0]}
      opacity={0.25}
      width={10}
      height={10}
      blur={2}
      far={1.5}
    />

    {/* Environment Map */}
    <Environment preset="night" />

    {/* Jellyfish */}
    <Jellyfish />

    {/* Controls */}
    <OrbitControls enablePan={false} enableZoom={false} />
  </Canvas>
  );
};

export default SceneMK3;