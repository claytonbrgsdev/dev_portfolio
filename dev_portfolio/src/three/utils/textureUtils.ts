// src/three/utils/textureUtils.ts

import {
    TextureLoader,
    Texture,
    Material,
    MeshStandardMaterial,
    MeshPhysicalMaterial,
    MeshPhongMaterial,
    MeshLambertMaterial,
  } from 'three';
  
  /**
   * Loads a texture from the given URL.
   * @param url - The URL of the texture to load.
   * @returns A Promise that resolves to the loaded Texture.
   */
  export const loadTexture = (url: string): Promise<Texture> => {
    const loader = new TextureLoader();
    return new Promise((resolve, reject) => {
      loader.load(
        url,
        (texture) => resolve(texture),
        undefined,
        (error) => reject(error)
      );
    });
  };
  
  /**
   * Applies a texture to a material.
   * @param material - The material to apply the texture to.
   * @param texture - The texture to apply.
   */
  export const applyTextureToMaterial = (
    material: Material,
    texture: Texture
  ): void => {
    if (
      material instanceof MeshStandardMaterial ||
      material instanceof MeshPhysicalMaterial ||
      material instanceof MeshPhongMaterial ||
      material instanceof MeshLambertMaterial
    ) {
      material.map = texture;
      material.needsUpdate = true;
    } else {
      console.warn('Material does not support the map property:', material);
    }
  };