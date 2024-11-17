// src/three/hooks/useAnimationHandler.ts

import { useAnimations } from '@react-three/drei';
import { Group, AnimationClip, AnimationAction } from 'three';
import { useCallback } from 'react';

interface AnimationHandlerReturn {
  actions: { [key: string]: AnimationAction };
  playAll: () => void;
  stopAll: () => void;
}

export const useAnimationHandler = (
  animations: AnimationClip[],
  scene: Group
): AnimationHandlerReturn => {
  const { actions } = useAnimations(animations, scene);

  const playAll = useCallback(() => {
    Object.values(actions).forEach((action) => {
      if (action) {
        action.reset().play();
      }
    });
  }, [actions]);

  const stopAll = useCallback(() => {
    Object.values(actions).forEach((action) => {
      if (action) {
        action.stop();
      }
    });
  }, [actions]);

  return {
    actions: actions as { [key: string]: AnimationAction },
    playAll,
    stopAll,
  };
};