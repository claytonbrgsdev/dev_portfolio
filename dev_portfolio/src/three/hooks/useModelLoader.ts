// useModelLoader.ts
import { useEffect } from 'react';
import { useGLTF } from '@react-three/drei';

export const useModelLoader = (url: string) => {
  const model = useGLTF(url);

  // Extract animation names
  const animationNames = model.animations.map((anim) => anim.name);

  // Debug logs
  useEffect(() => {
    console.log(`Model loaded: ${url}`);
    console.log('Available animations in the model:', animationNames);
  }, [url, animationNames]);

  return { ...model, animationNames }; // Return the model with animationNames
};