// src/components/Three/canvasLayout/CanvasLayout.tsx

import React, { useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import ModelRenderer from '../../../three/components/ModelRenderer';
import { Group, AnimationClip } from 'three';
import modelsUrls from '../../../three/models/modelsUrls';
import modelInstances from '../../../three/models/modelsInstances';
import AnimatedModel, { AnimatedModelRef } from '../../../three/components/AnimatedModel';

interface AnimationControl {
  playAll: boolean;
  stopAll: boolean;
}

const CanvasLayout: React.FC = () => {
  const [animationControl, setAnimationControl] = useState<AnimationControl>({
    playAll: false,
    stopAll: false,
  });

  const modelAnimRefs = useRef<{ [key: string]: React.RefObject<AnimatedModelRef> }>({});

  modelInstances.forEach((instance) => {
    if (!modelAnimRefs.current[instance.id]) {
      modelAnimRefs.current[instance.id] = React.createRef<AnimatedModelRef>();
    }
  });

  const handlePlayAnimations = () => {
    setAnimationControl({ playAll: true, stopAll: false });
    Object.values(modelAnimRefs.current).forEach((ref) => {
      ref.current?.playAnimation();
    });
  };

  const handleStopAnimations = () => {
    setAnimationControl({ playAll: false, stopAll: true });
    Object.values(modelAnimRefs.current).forEach((ref) => {
      ref.current?.stopAnimation();
    });
  };

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      {/* Animation Control Buttons */}
      <div
        style={{
          position: 'absolute',
          top: 10,
          left: 10,
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}
      >
        <button
          onClick={handlePlayAnimations}
          style={{
            padding: '10px',
            borderRadius: '5px',
            backgroundColor: '#444',
            color: '#fff',
          }}
        >
          Play Animations
        </button>
        <button
          onClick={handleStopAnimations}
          style={{
            padding: '10px',
            borderRadius: '5px',
            backgroundColor: '#444',
            color: '#fff',
          }}
        >
          Stop Animations
        </button>
      </div>

      {/* Canvas for rendering 3D scene */}
      <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
        {/* Orbit Controls */}
        <OrbitControls enableZoom={true} />

        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />

        {/* Render each model instance */}
        {modelInstances.map((instance) => {
          const modelData = modelsUrls[instance.name];
          if (!modelData) {
            console.error(`Model data for "${instance.name}" not found.`);
            return null;
          }

          const {
            modelUrl,
            textureUrl,
            normalMapUrl,
            bumpMapUrl,
            displacementMapUrl,
            roughnessMapUrl,
            metalnessMapUrl,
            aoMapUrl,
          } = modelData;

          const {
            position = [0, 0, 0],
            rotation = [0, 0, 0],
            scale = [1, 1, 1],
          } = instance;

          return (
            <ModelRenderer
              key={instance.id}
              url={modelUrl}
              textureUrl={textureUrl}
              normalMapUrl={normalMapUrl}
              bumpMapUrl={bumpMapUrl}
              displacementMapUrl={displacementMapUrl}
              roughnessMapUrl={roughnessMapUrl}
              metalnessMapUrl={metalnessMapUrl}
              aoMapUrl={aoMapUrl}
              scale={scale}
              position={position}
              rotation={rotation}
            >
              {(scene: Group, animations: AnimationClip[]) => (
                <AnimatedModel
                  ref={modelAnimRefs.current[instance.id]}
                  scene={scene}
                  animations={animations}
                  animationControl={animationControl}
                />
              )}
            </ModelRenderer>
          );
        })}
      </Canvas>
    </div>
  );
};

export default CanvasLayout;