// src/components/Three/modelsTest/IntrinsicAnimations.tsx
import React, { useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import MyModel from './MyModel';

const IntrinsicAnimations: React.FC = () => {
  // Carrega o modelo e as animações embutidas
  const { scene, animations } = useGLTF('/Crystal-jelly/Crystal-jelly.gltf');
  const { actions } = useAnimations(animations, scene);

  // Ativa uma animação padrão ao carregar o modelo
  useEffect(() => {
    if (actions && animations.length > 0) {
      // Executa a primeira animação disponível
      actions[animations[0].name]?.play();
    }
  }, [actions, animations]);

  return (
    <group>
      {/* Renderiza o modelo encapsulado em MyModel */}
      <MyModel />
    </group>
  );
};

export default IntrinsicAnimations;

// Certifique-se de carregar o arquivo GLTF usando useGLTF.preload
useGLTF.preload('/Crystal-jelly/Crystal-jelly.gltf');