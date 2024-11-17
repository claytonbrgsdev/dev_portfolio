// src/three/hooks/useAnimationHandler.ts
import { useAnimations } from '@react-three/drei';
import { Group, AnimationClip, AnimationAction } from 'three';
import { useEffect } from 'react';

interface AnimationHandlerReturn {
  actions: { [key: string]: AnimationAction }; // Garantir que não há `null`
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
  const { actions } = useAnimations(animations, scene);

  // Filtrar ações para remover valores nulos
  const filteredActions: { [key: string]: AnimationAction } = Object.fromEntries(
    Object.entries(actions || {}).filter(
      ([, action]) => action !== null
    )
  ) as { [key: string]: AnimationAction };

  // Reproduz automaticamente a animação padrão ou especificada
  useEffect(() => {
    if (filteredActions && autoPlay && animations.length > 0) {
      const defaultAnimation = animationName || animations[0]?.name;
      filteredActions[defaultAnimation]?.play();
    }
  }, [filteredActions, autoPlay, animations, animationName]);

  // Métodos para manipulação das animações
  const play = (name: string) => filteredActions?.[name]?.play();
  const stop = (name: string) => filteredActions?.[name]?.stop();
  const reset = (name: string) => filteredActions?.[name]?.reset();

  return {
    actions: filteredActions,
    play,
    stop,
    reset,
  };
};