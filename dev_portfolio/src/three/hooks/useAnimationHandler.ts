// useAnimationHandler.ts
import { useAnimations } from '@react-three/drei';
import { Group, AnimationClip, AnimationAction } from 'three';
import { useEffect } from 'react';

interface AnimationHandlerReturn {
  actions: { [key: string]: AnimationAction };
  play: (name: string) => void;
  stop: (name: string) => void;
  reset: (name: string) => void;
}

export const useAnimationHandler = (
  animations: AnimationClip[],
  scene: Group,
  animationName?: string,
  autoPlay: boolean = true
): AnimationHandlerReturn => {
  const { actions: originalActions } = useAnimations(animations, scene);

  // Filter out null values from actions
  const actions: { [key: string]: AnimationAction } = Object.fromEntries(
    Object.entries(originalActions || {}).filter(([, action]) => action !== null)
  ) as { [key: string]: AnimationAction };

  // Automatically play the specified animation
  useEffect(() => {
    if (autoPlay && animationName && actions[animationName]) {
      actions[animationName].play();
    }
  }, [actions, autoPlay, animationName]);

  const play = (name: string) => {
    if (actions[name]) {
      actions[name].reset().play();
      console.log(`Playing animation: ${name}`);
    } else {
      console.warn(`Animation "${name}" not found.`);
    }
  };

  const stop = (name: string) => {
    if (actions[name]) {
      actions[name].stop();
      console.log(`Stopped animation: ${name}`);
    }
  };

  const reset = (name: string) => {
    if (actions[name]) {
      actions[name].reset();
      console.log(`Reset animation: ${name}`);
    }
  };

  return {
    actions,
    play,
    stop,
    reset,
  };
};