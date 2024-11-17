// src/three/hooks/useTextureLoader.ts
import { useTexture } from '@react-three/drei';
import { Texture, Material, MeshStandardMaterial } from 'three';

interface TextureLoaderReturn {
  texture: Texture | null;
  applyToMaterial: (material: Material | MeshStandardMaterial) => void; // Tipo específico de material
}

export const useTextureLoader = (textureUrl?: string): TextureLoaderReturn => {
  // Sempre chama useTexture, mesmo que textureUrl seja undefined ou null
  const loadedTexture = useTexture(textureUrl || '') as Texture | null;

  // Função para aplicar a textura dinamicamente a um material
  const applyToMaterial = (material: Material | MeshStandardMaterial) => {
    if (loadedTexture && material instanceof MeshStandardMaterial) {
      material.map = loadedTexture; // Aplica textura apenas se o material for MeshStandardMaterial
      material.needsUpdate = true; // Força atualização do material
    }
  };

  return {
    texture: loadedTexture,
    applyToMaterial,
  };
};