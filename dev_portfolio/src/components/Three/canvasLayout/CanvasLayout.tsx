// src/components/Three/canvasLayout/CanvasLayout.tsx

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import ModelRenderer from '../../../three/components/ModelRenderer';
import ModelAnimator from '../../../three/components/ModelAnimator';
import { Group, AnimationClip, Material } from 'three';
import { HierarchyNode } from '../../../three/utils/modelUtils';

const CanvasLayout: React.FC = () => {
  const [animationName, setAnimationName] = useState<string | undefined>(
    undefined
  );
  const [animationNames, setAnimationNames] = useState<string[]>([]);

  // Model and texture URLs
  const modelUrl = '/models/Crystal-jelly/Crystal-jelly.gltf';
  const textureUrl = '/models/Crystal-jelly/Crystal-jelly_tex.png';

  // Include only the texture maps your model uses
  // If the model doesn't use these maps, you can omit them
  const normalMapUrl = '/models/Crystal-jelly/Crystal-jelly_tex.png';
  // const bumpMapUrl = '/path/to/bumpMap.png';
  // const displacementMapUrl = '/path/to/displacementMap.png';
  // const roughnessMapUrl = '/path/to/roughnessMap.png';
  // const metalnessMapUrl = '/path/to/metalnessMap.png';
  // const aoMapUrl = '/path/to/aoMap.png';

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
        {animationNames.map((name) => (
          <button
            key={name}
            onClick={() => setAnimationName(name)}
            style={{
              padding: '10px',
              borderRadius: '5px',
              backgroundColor: '#444',
              color: '#fff',
            }}
          >
            Play {name} Animation
          </button>
        ))}
        <button
          onClick={() => {
            setAnimationName(undefined);
            console.log('Stop Animation clicked');
          }}
          style={{
            padding: '10px',
            borderRadius: '5px',
            backgroundColor: '#444',
            color: '#fff',
          }}
        >
          Stop Animation
        </button>
      </div>

      {/* Canvas for rendering 3D scene */}
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        {/* Orbit Controls */}
        <OrbitControls enableZoom={true} />

        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />

        {/* Model Renderer */}
        <ModelRenderer
          url={modelUrl}
          textureUrl={textureUrl}
          // Pass only the maps that your model uses
        //   normalMapUrl={normalMapUrl}
          // bumpMapUrl={bumpMapUrl}
          displacementMapUrl={normalMapUrl}
          // roughnessMapUrl={roughnessMapUrl}
          // metalnessMapUrl={metalnessMapUrl}
          // aoMapUrl={aoMapUrl}
          scale={[1, 1, 1]}
          position={[0, 0, 0]}
          rotation={[0, 0, 0]}
        >
          {(
            scene: Group,
            animations: AnimationClip[],
            animNames: string[],
            _materials: Material[],
            hierarchy: HierarchyNode[]
          ) => (
            <AnimatedModel
              scene={scene}
              animations={animations}
              animNames={animNames}
              hierarchy={hierarchy}
              animationName={animationName}
              setAnimationName={setAnimationName}
              setAnimationNames={setAnimationNames}
            />
          )}
        </ModelRenderer>
      </Canvas>
    </div>
  );
};

export default CanvasLayout;

// Define the AnimatedModel component
interface AnimatedModelProps {
  scene: Group;
  animations: AnimationClip[];
  animNames: string[];
  hierarchy: HierarchyNode[];
  animationName: string | undefined;
  setAnimationName: React.Dispatch<React.SetStateAction<string | undefined>>;
  setAnimationNames: React.Dispatch<React.SetStateAction<string[]>>;
}

const AnimatedModel: React.FC<AnimatedModelProps> = ({
  scene,
  animations,
  animNames,
  hierarchy,
  animationName,
  setAnimationName,
  setAnimationNames,
}) => {
  const memoizedAnimNames = useMemo(() => animNames, [animNames]);

  // Ref to track if default animationName has been set
  const hasSetDefaultAnimationName = useRef(false);

  // Set the animation names when they are available
  useEffect(() => {
    if (memoizedAnimNames.length > 0) {
      setAnimationNames((prevAnimationNames) => {
        if (
          prevAnimationNames.length === memoizedAnimNames.length &&
          prevAnimationNames.every(
            (value, index) => value === memoizedAnimNames[index]
          )
        ) {
          return prevAnimationNames; // No need to update
        } else {
          return memoizedAnimNames;
        }
      });

      // Set default animation name only once
      if (!hasSetDefaultAnimationName.current) {
        if (animationName === undefined) {
          setAnimationName(memoizedAnimNames[0]);
        }
        hasSetDefaultAnimationName.current = true;
      }
    }
  }, [memoizedAnimNames, setAnimationNames, animationName, setAnimationName]);

  // Optional: Use hierarchy for debugging or other purposes
  useEffect(() => {
    console.log('Model Hierarchy:', hierarchy);
  }, [hierarchy]);

  return (
    <ModelAnimator
      scene={scene}
      animations={animations}
      animationName={animationName}
      autoPlayAnimation={true}
    />
  );
};