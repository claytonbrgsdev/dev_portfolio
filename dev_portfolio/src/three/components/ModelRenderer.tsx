// src/three/components/ModelRenderer.tsx

import React, { Suspense } from 'react';
import { Html, useProgress } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { useModelLoader } from '../hooks/useModelLoader';
import { Group, AnimationClip } from 'three';
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
    animNames: string[]
  ) => React.ReactNode;
}

const placeholderTextureUrl =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAA' +
  'AAnRSTlMA/1uRIrUAAAANSURBVAjXY2AgDQAAADAAAceqhY4AAAAASUVORK5CYII='; // Transparent pixel

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
  // Ensure hooks are called unconditionally
  const model = useModelLoader(url);
  const { progress } = useProgress();

  // Prepare texture URLs
  const textureUrls = [
    textureUrl || placeholderTextureUrl,
    normalMapUrl || placeholderTextureUrl,
    bumpMapUrl || placeholderTextureUrl,
    displacementMapUrl || placeholderTextureUrl,
    roughnessMapUrl || placeholderTextureUrl,
    metalnessMapUrl || placeholderTextureUrl,
    aoMapUrl || placeholderTextureUrl,
  ];

  // Load textures using useLoader
  const [
    texture,
    normalMap,
    bumpMap,
    displacementMap,
    roughnessMap,
    metalnessMap,
    aoMap,
  ] = useLoader(TextureLoader, textureUrls);

  return (
    <Suspense
      fallback={
        <Html>
          <span>Loading... {progress.toFixed(0)}%</span>
        </Html>
      }
    >
      {model ? (
        <group scale={scale} position={position} rotation={rotation}>
          <primitive object={model.scene} dispose={null} />

          {model.materials && (
            <TextureApplier
              materials={model.materials}
              textureUrl={textureUrl}
              normalMapUrl={normalMapUrl}
              bumpMapUrl={bumpMapUrl}
              displacementMapUrl={displacementMapUrl}
              roughnessMapUrl={roughnessMapUrl}
              metalnessMapUrl={metalnessMapUrl}
              aoMapUrl={aoMapUrl}
              textures={{
                texture,
                normalMap,
                bumpMap,
                displacementMap,
                roughnessMap,
                metalnessMap,
                aoMap,
              }}
            />
          )}

          {children && model.scene && model.animations && model.animationNames
            ? children(model.scene, model.animations, model.animationNames)
            : null}
        </group>
      ) : (
        // Show loading indicator while model is loading
        <Html>
          <span>Loading... {progress.toFixed(0)}%</span>
        </Html>
      )}
    </Suspense>
  );
};

export default ModelRenderer;