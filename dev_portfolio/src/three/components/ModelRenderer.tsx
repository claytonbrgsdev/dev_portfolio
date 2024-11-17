// src/three/components/ModelRenderer.tsx
import React, { Suspense } from 'react';
import { Html, useProgress } from '@react-three/drei';
import { useModelLoader } from '../hooks/useModelLoader';
import { useTextureLoader } from '../hooks/useTextureLoader'; // Importa o useTextureLoader
import { Group, AnimationClip } from 'three';

interface ModelRendererProps {
  url: string; // Path to the GLTF model
  scale?: [number, number, number]; // Optional model scale
  position?: [number, number, number]; // Optional model position
  rotation?: [number, number, number]; // Optional model rotation
  textureUrl?: string; // Optional texture URL
  children?: (scene: Group, animations: AnimationClip[]) => React.ReactNode; // Children as render prop
}

const ModelRenderer: React.FC<ModelRendererProps> = ({
  url,
  scale = [1, 1, 1],
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  textureUrl, // Recebe a textura como prop
  children,
}) => {
  const model = useModelLoader(url);
  const { applyToMaterial } = useTextureLoader(textureUrl); // Remove `texture`

  // Show loader while the model is being loaded
  const { progress } = useProgress();

  // Fallback in case of an error
  if (!model) {
    return (
      <Html>
        <span>Error loading model.</span>
      </Html>
    );
  }

  // Aplica a textura aos materiais do modelo
  if (model.materials) {
    Object.values(model.materials).forEach((material) => {
      applyToMaterial(material);
    });
  }

  return (
    <Suspense fallback={<Html><span>Loading... {progress.toFixed(0)}%</span></Html>}>
      <group scale={scale} position={position} rotation={rotation}>
        <primitive object={model.scene} dispose={null} />
        {children && children(model.scene, model.animations)} {/* Pass scene and animations */}
      </group>
    </Suspense>
  );
};

export default ModelRenderer;