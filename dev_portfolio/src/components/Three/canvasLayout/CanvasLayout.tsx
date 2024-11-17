// CanvasLayout.tsx
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import ModelRenderer from '../../../three/components/ModelRenderer';
import ModelAnimator from '../../../three/components/ModelAnimator';
import { Group, AnimationClip } from 'three';

const CanvasLayout: React.FC = () => {
    const [animationName, setAnimationName] = useState<string | undefined>(undefined);
    const [animationNames, setAnimationNames] = useState<string[]>([]);
  
    const modelUrl = '/models/Crystal-jelly/Crystal-jelly.gltf';
    const textureUrl = '/models/Crystal-jelly/Crystal-jelly_tex.png';
  
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
                setAnimationName('');
                setAnimationNames([])
                console.log('eu fui ativada')
            } }
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
            scale={[1, 1, 1]}
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
          >
            {(scene: Group, animations: AnimationClip[], animNames: string[]) => (
              <AnimatedModel
                scene={scene}
                animations={animations}
                animNames={animNames}
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
    animationName: string | undefined;
    setAnimationName: React.Dispatch<React.SetStateAction<string | undefined>>;
    setAnimationNames: React.Dispatch<React.SetStateAction<string[]>>;
  }
  
  const AnimatedModel: React.FC<AnimatedModelProps> = ({
    scene,
    animations,
    animNames,
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
            prevAnimationNames.every((value, index) => value === memoizedAnimNames[index])
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
  
    return (
      <ModelAnimator
        scene={scene}
        animations={animations}
        animationName={animationName}
        autoPlayAnimation={true}
      />
    );
  };