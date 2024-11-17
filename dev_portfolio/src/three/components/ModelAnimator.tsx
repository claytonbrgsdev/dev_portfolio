// src/three/components/ModelAnimator.tsx
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

  // Log para verificar o carregamento das animações
  console.log('ModelAnimator: Animações carregadas:', animations);
  console.log('ModelAnimator: Actions configuradas:', actions);
  console.log('ModelAnimator: Nome da animação atual:', animationName);

  // Reproduz a animação especificada ao alterar o nome
  useEffect(() => {
    if (animationName && actions?.[animationName]) {
      console.log(`Reproduzindo animação: ${animationName}`);
      play(animationName);
    } else if (autoPlayAnimation && animations.length > 0) {
      console.log('Reproduzindo animação padrão:', animations[0]?.name);
      play(animations[0]?.name);
    } else {
      console.warn('Nenhuma animação encontrada ou configurada para reprodução.');
    }
  }, [animationName, actions, play, autoPlayAnimation, animations]);

  return null; // Não renderiza nada diretamente
};

export default ModelAnimator;