// src/three/hooks/useModelLoader.ts

import { useLoader } from '@react-three/fiber';
import { GLTFLoader, GLTF } from 'three-stdlib';
import { useState, useEffect } from 'react';
import { AnimationClip, Object3D, Material, Mesh } from 'three';

interface ModelData {
  scene: GLTF['scene'];
  animations: AnimationClip[];
  animationNames: string[];
  materials: Material[];
}

export const useModelLoader = (url: string): ModelData | null => {
  const gltf = useLoader(GLTFLoader, url) as GLTF;
  const [modelData, setModelData] = useState<ModelData | null>(null);

  useEffect(() => {
    if (gltf) {
      const animationNames = gltf.animations.map((clip: AnimationClip) => clip.name);
      const materials: Material[] = [];

      gltf.scene.traverse((object: Object3D) => {
        if ((object as Mesh).isMesh) {
          const mesh = object as Mesh;
          if (Array.isArray(mesh.material)) {
            materials.push(...mesh.material);
          } else if (mesh.material) {
            materials.push(mesh.material);
          }
        }
      });

      setModelData({
        scene: gltf.scene,
        animations: gltf.animations,
        animationNames,
        materials,
      });
    }
  }, [gltf]);

  return modelData;
};