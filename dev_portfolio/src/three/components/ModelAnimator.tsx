// src/three/components/ModelAnimator.tsx

import React from 'react';
import { useAnimations } from '@react-three/drei';
import { Group, AnimationClip } from 'three';

interface ModelAnimatorProps {
  scene: Group;
  animations: AnimationClip[];
  animationName?: string;
  autoPlayAnimation?: boolean;
}

const ModelAnimator: React.FC<ModelAnimatorProps> = ({
  scene,
  animations,
  animationName,
  autoPlayAnimation = true,
}) => {
  const { actions } = useAnimations(animations, scene);

  React.useEffect(() => {
    if (animationName && actions[animationName]) {
      if (autoPlayAnimation) {
        actions[animationName].reset().play();
      }
    }
    return () => {
      if (animationName && actions[animationName]) {
        actions[animationName].stop();
      }
    };
  }, [actions, animationName, autoPlayAnimation]);

  return null;
};

export default ModelAnimator;