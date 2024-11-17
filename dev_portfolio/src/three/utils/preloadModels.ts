// src/three/utils/preloadModels.ts

import { GLTF } from 'three-stdlib';
import { useGLTF } from '@react-three/drei';

/**
 * Preloads a GLTF model to improve performance.
 * @param url - The URL of the model to preload.
 */
export const preloadModel = (url: string): void => {
  useGLTF.preload(url);
};

/**
 * Custom Hook to retrieve a preloaded GLTF model.
 * Must be used within a React component or another Hook.
 * @param url - The URL of the model to retrieve.
 * @returns The preloaded GLTF model.
 */
export const usePreloadedModel = (url: string): GLTF => {
  const gltf = useGLTF(url) as GLTF;
  return gltf;
};