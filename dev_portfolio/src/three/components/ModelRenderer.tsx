// ModelRenderer.tsx
import React, { Suspense } from 'react';
import { Html, useProgress } from '@react-three/drei';
import { useModelLoader } from '../hooks/useModelLoader';
import { useTextureLoader } from '../hooks/useTextureLoader';
import { Group, AnimationClip } from 'three';

interface ModelRendererProps {
  url: string;
  scale?: [number, number, number];
  position?: [number, number, number];
  rotation?: [number, number, number];
  textureUrl?: string;
  children?: (
    scene: Group,
    animations: AnimationClip[],
    animationNames: string[]
  ) => React.ReactNode;
}

const ModelRenderer: React.FC<ModelRendererProps> = ({
  url,
  scale = [1, 1, 1],
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  textureUrl,
  children,
}) => {
  const model = useModelLoader(url);
  const { applyToMaterial } = useTextureLoader(textureUrl);
  const { progress } = useProgress();

  // Fallback in case of an error
  if (!model) {
    return (
      <Html>
        <span>Error loading model.</span>
      </Html>
    );
  }

  // Apply texture to the model's materials
  if (model.materials && textureUrl) {
    Object.values(model.materials).forEach((material) => {
      applyToMaterial(material);
    });
  }

  const { scene, animations, animationNames } = model;

  return (
    <Suspense
      fallback={
        <Html>
          <span>Loading... {progress.toFixed(0)}%</span>
        </Html>
      }
    >
      <group scale={scale} position={position} rotation={rotation}>
        <primitive object={scene} dispose={null} />
        {children && children(scene, animations, animationNames)}
      </group>
    </Suspense>
  );
};

export default ModelRenderer;