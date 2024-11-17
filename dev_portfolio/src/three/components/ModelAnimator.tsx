// ModelAnimator.tsx
import React, { useEffect } from 'react';
import { Group, AnimationClip } from 'three';
import { useAnimationHandler } from '../hooks/useAnimationHandler';

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
  const { actions, play, stopAll } = useAnimationHandler(
    animations,
    scene,
    animationName,
    autoPlayAnimation
  );

  useEffect(() => {
    if (animationName && actions[animationName]) {
      console.log(`Playing animation: ${animationName}`);
      play(animationName);
    } else if (!animationName) {
      // Stop all animations when animationName is undefined
      stopAll();
      console.log('Stopped all animations');
    }
  }, [animationName, actions, play, stopAll]);

  return null;
};

export default ModelAnimator;