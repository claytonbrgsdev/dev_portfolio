// src/components/Three/canvasLayout/CanvasLayout.tsx
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import ModelRenderer from '../../../three/components/ModelRenderer';
import ModelAnimator from '../../../three/components/ModelAnimator';
import { Group, AnimationClip } from 'three';

const CanvasLayout: React.FC = () => {
  return (
    <>
      <Canvas
        style={{
          height: '100vh',
          width: '100vw',
          backgroundColor: 'white',
        }}
      >
        {/* Camera controls */}
        <OrbitControls />

        {/* Lights */}
        <ambientLight intensity={0.5} />
        <directionalLight intensity={1} position={[5, 10, 5]} castShadow />
        <pointLight position={[0, 10, 0]} intensity={0.8} />

        {/* Model with animation */}
        <ModelRenderer
          url="/models/Crystal-jelly/Crystal-jelly.gltf"
          scale={[1, 1, 1]}
          position={[0, 0, 0]}
          rotation={[0, 0, 0]}
        >
          {(scene: Group, animations: AnimationClip[]) => (
            <ModelAnimator
              scene={scene}
              animations={animations}
              animationName="Idle" // Update to the desired animation name
              autoPlayAnimation={true}
            />
          )}
        </ModelRenderer>
      </Canvas>
    </>
  );
};

export default CanvasLayout;