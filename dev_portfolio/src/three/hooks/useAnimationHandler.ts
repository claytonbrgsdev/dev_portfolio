// src/three/hooks/useAnimationHandler.ts

import { useAnimations } from '@react-three/drei';
import { Group, AnimationClip, AnimationAction } from 'three';
import { useEffect, useMemo, useCallback } from 'react';

interface AnimationHandlerReturn {
  actions: { [key: string]: AnimationAction };
  play: (name: string) => void;
  stop: (name: string) => void;
  reset: (name: string) => void;
  stopAll: () => void;
}

export const useAnimationHandler = (
  animations: AnimationClip[],
  scene: Group,
  animationName?: string,
  autoPlay: boolean = true
): AnimationHandlerReturn => {
  const { actions: originalActions } = useAnimations(animations, scene);

  // Memoize the filtered actions
  const actions = useMemo(() => {
    const filteredActions = Object.fromEntries(
      Object.entries(originalActions || {}).filter(([, action]) => action !== null)
    ) as { [key: string]: AnimationAction };
    return filteredActions;
  }, [originalActions]);

  // Automatically play the specified animation
  useEffect(() => {
    if (autoPlay && animationName && actions[animationName]) {
      actions[animationName].play();
    }
  }, [actions, autoPlay, animationName]);

  const play = useCallback(
    (name: string) => {
      if (actions[name]) {
        actions[name].reset().play();
        console.log(`Playing animation: ${name}`);
      } else {
        console.warn(`Animation "${name}" not found.`);
      }
    },
    [actions]
  );

  const stop = useCallback(
    (name: string) => {
      if (actions[name]) {
        actions[name].stop();
        console.log(`Stopped animation: ${name}`);
      }
    },
    [actions]
  );

  const reset = useCallback(
    (name: string) => {
      if (actions[name]) {
        actions[name].reset();
        console.log(`Reset animation: ${name}`);
      }
    },
    [actions]
  );

  const stopAll = useCallback(() => {
    Object.values(actions).forEach((action) => {
      action.stop();
    });
    console.log('All animations stopped.');
  }, [actions]);

  return {
    actions,
    play,
    stop,
    reset,
    stopAll,
  };
};