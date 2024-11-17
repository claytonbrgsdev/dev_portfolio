// useModelLoader.ts
import { useEffect, useMemo } from 'react';
import { useGLTF } from '@react-three/drei';

export const useModelLoader = (url: string) => {
  const model = useGLTF(url);

  // Memoize animation names
  const animationNames = useMemo(() => model.animations.map((anim) => anim.name), [model.animations]);

  // Debug logs
  useEffect(() => {
    console.log(`Model loaded: ${url}`);
    console.log('Available animations in the model:', animationNames);
  }, [url, animationNames]);

  return { ...model, animationNames }; // Return the model with animationNames
};