// src/three/hooks/useModelLoader.ts

import { useEffect, useMemo } from 'react';
import { usePreloadedModel } from '../preloadModels';
import {
  getAnimationNames,
  getMaterialList,
  validateModel,
  getObjectHierarchy,
} from '../utils/modelUtils';

export const useModelLoader = (url: string) => {
  const gltf = usePreloadedModel(url);

  // Validate the model
  const isValidModel = validateModel(gltf);

  // Extract animation names
  const animationNames = useMemo(() => getAnimationNames(gltf), [gltf]);

  // Extract materials
  const materials = useMemo(() => getMaterialList(gltf.scene), [gltf]);

  // Extract object hierarchy
  const hierarchy = useMemo(() => getObjectHierarchy(gltf.scene), [gltf]);

  // Debug logs
  useEffect(() => {
    if (isValidModel) {
      console.log(`Model loaded: ${url}`);
      console.log('Available animations in the model:', animationNames);
      console.log('Materials in the model:', materials.map((mat) => mat.name));
      console.log('Object hierarchy:', hierarchy);
    } else {
      console.error(`Model at ${url} is invalid.`);
    }
  }, [isValidModel, url, animationNames, materials, hierarchy]);

  if (!isValidModel) {
    return null;
  }

  return { ...gltf, animationNames, materials, hierarchy }; // Return the model with additional info
};