// src/three/components/TextureApplier.tsx

import { useLayoutEffect } from 'react';
import {
  Material,
  MeshStandardMaterial,
  MeshPhysicalMaterial,
  MeshPhongMaterial,
  MeshLambertMaterial,
  Texture,
} from 'three';

interface TextureApplierProps {
  materials: Material[];
  textureUrl?: string;
  normalMapUrl?: string;
  bumpMapUrl?: string;
  displacementMapUrl?: string;
  roughnessMapUrl?: string;
  metalnessMapUrl?: string;
  aoMapUrl?: string;
  textures: {
    texture: Texture;
    normalMap: Texture;
    bumpMap: Texture;
    displacementMap: Texture;
    roughnessMap: Texture;
    metalnessMap: Texture;
    aoMap: Texture;
  };
}

const TextureApplier: React.FC<TextureApplierProps> = ({
  materials,
  textureUrl,
  normalMapUrl,
  bumpMapUrl,
  displacementMapUrl,
  roughnessMapUrl,
  metalnessMapUrl,
  aoMapUrl,
  textures,
}) => {
  useLayoutEffect(() => {
    materials.forEach((material) => {
      let needsUpdate = false;

      if (
        material instanceof MeshStandardMaterial ||
        material instanceof MeshPhysicalMaterial
      ) {
        if (textureUrl) {
          material.map = textures.texture;
          needsUpdate = true;
        }
        if (normalMapUrl) {
          material.normalMap = textures.normalMap;
          needsUpdate = true;
        }
        if (bumpMapUrl) {
          material.bumpMap = textures.bumpMap;
          needsUpdate = true;
        }
        if (displacementMapUrl) {
          material.displacementMap = textures.displacementMap;
          needsUpdate = true;
        }
        if (roughnessMapUrl) {
          material.roughnessMap = textures.roughnessMap;
          needsUpdate = true;
        }
        if (metalnessMapUrl) {
          material.metalnessMap = textures.metalnessMap;
          needsUpdate = true;
        }
        if (aoMapUrl) {
          material.aoMap = textures.aoMap;
          needsUpdate = true;
        }
      } else if (
        material instanceof MeshPhongMaterial ||
        material instanceof MeshLambertMaterial
      ) {
        if (textureUrl) {
          material.map = textures.texture;
          needsUpdate = true;
        }
        if (bumpMapUrl) {
          material.bumpMap = textures.bumpMap;
          needsUpdate = true;
        }
        if (displacementMapUrl) {
          material.displacementMap = textures.displacementMap;
          needsUpdate = true;
        }
        if (material instanceof MeshPhongMaterial) {
          if (normalMapUrl) {
            material.normalMap = textures.normalMap;
            needsUpdate = true;
          }
          if (aoMapUrl) {
            material.aoMap = textures.aoMap;
            needsUpdate = true;
          }
        }
      }

      if (needsUpdate) {
        material.needsUpdate = true;
      }
    });
  }, [
    materials,
    textures,
    textureUrl,
    normalMapUrl,
    bumpMapUrl,
    displacementMapUrl,
    roughnessMapUrl,
    metalnessMapUrl,
    aoMapUrl,
  ]);

  return null;
};

export default TextureApplier;