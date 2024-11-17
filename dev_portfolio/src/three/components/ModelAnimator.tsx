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
  const { actions, play } = useAnimationHandler(
    animations,
    scene,
    animationName,
    autoPlayAnimation
  );

  useEffect(() => {
    if (animationName && actions[animationName]) {
      console.log(`Playing animation: ${animationName}`);
      play(animationName);
    } else if (autoPlayAnimation && animations.length > 0) {
      console.log(`Playing default animation: ${animations[0].name}`);
      play(animations[0].name);
    } else {
      console.warn('No animation found or configured to play.');
    }
  }, [animationName, actions, play, autoPlayAnimation, animations]);

  return null;
};

export default ModelAnimator;