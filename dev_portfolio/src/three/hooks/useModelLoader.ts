// src/three/hooks/useModelLoader.ts
import { useGLTF } from '@react-three/drei';

export const useModelLoader = (url: string) => {
  console.log(`Tentando carregar modelo: ${url}`);

  // UseGLTF deve ser chamado de maneira consistente
  const gltf = useGLTF(url);

  return gltf; // Apenas retorna o modelo carregado
};