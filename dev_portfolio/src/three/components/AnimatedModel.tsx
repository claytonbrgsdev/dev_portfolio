// src/three/components/AnimatedModel.tsx

import { useEffect, useImperativeHandle, forwardRef } from 'react';
import { Group, AnimationClip } from 'three';
import { useAnimationHandler } from '../hooks/useAnimationHandler';

interface AnimationControl {
  playAll: boolean;
  stopAll: boolean;
}

interface AnimatedModelProps {
  scene: Group;
  animations: AnimationClip[];
  animationControl: AnimationControl;
}

export interface AnimatedModelRef {
  playAnimation: () => void;
  stopAnimation: () => void;
}

const AnimatedModel = forwardRef<AnimatedModelRef, AnimatedModelProps>(
  ({ scene, animations, animationControl }, ref) => {
    const { playAll, stopAll } = useAnimationHandler(animations, scene);

    useImperativeHandle(ref, () => ({
      playAnimation: () => {
        playAll();
      },
      stopAnimation: () => {
        stopAll();
      },
    }));

    useEffect(() => {
      if (animationControl.playAll) {
        playAll();
      }
      if (animationControl.stopAll) {
        stopAll();
      }
    }, [animationControl, playAll, stopAll]);

    return null;
  }
);

export default AnimatedModel;