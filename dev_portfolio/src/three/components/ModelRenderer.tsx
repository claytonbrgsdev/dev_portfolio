// src/three/components/ModelRenderer.tsx

import React, { Suspense } from 'react';
import { Html, useProgress } from '@react-three/drei';
import { useModelLoader } from '../hooks/useModelLoader';
import { Group, AnimationClip, Material } from 'three';
import { HierarchyNode } from '../utils/modelUtils';
import TextureApplier from './TextureApplier';

interface ModelRendererProps {
  url: string;
  scale?: [number, number, number];
  position?: [number, number, number];
  rotation?: [number, number, number];
  textureUrl?: string;
  normalMapUrl?: string;
  bumpMapUrl?: string;
  displacementMapUrl?: string;
  roughnessMapUrl?: string;
  metalnessMapUrl?: string;
  aoMapUrl?: string;
  children?: (
    scene: Group,
    animations: AnimationClip[],
    animationNames: string[],
    materials: Material[],
    hierarchy: HierarchyNode[]
  ) => React.ReactNode;
}

const ModelRenderer: React.FC<ModelRendererProps> = ({
  url,
  scale = [1, 1, 1],
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  textureUrl,
  normalMapUrl,
  bumpMapUrl,
  displacementMapUrl,
  roughnessMapUrl,
  metalnessMapUrl,
  aoMapUrl,
  children,
}) => {
  const model = useModelLoader(url);
  const { progress } = useProgress();

  // Fallback in case of an error or if model is null
  if (!model) {
    return (
      <Html>
        <span>Error loading model.</span>
      </Html>
    );
  }

  const { scene, animations, animationNames, materials, hierarchy } = model;

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

        {/* Apply textures to materials */}
        {materials && (
          <TextureApplier
            materials={materials}
            textureUrl={textureUrl}
            normalMapUrl={normalMapUrl}
            bumpMapUrl={bumpMapUrl}
            displacementMapUrl={displacementMapUrl}
            roughnessMapUrl={roughnessMapUrl}
            metalnessMapUrl={metalnessMapUrl}
            aoMapUrl={aoMapUrl}
          />
        )}

        {children &&
          children(scene, animations, animationNames, materials, hierarchy)}
      </group>
    </Suspense>
  );
};

export default ModelRenderer;