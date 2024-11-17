// src/three/models/modelsUrls.ts

export interface ModelUrls {
    modelUrl: string;
    textureUrl?: string;
    normalMapUrl?: string;
    bumpMapUrl?: string;
    displacementMapUrl?: string;
    roughnessMapUrl?: string;
    metalnessMapUrl?: string;
    aoMapUrl?: string;
  }
  
  const modelsUrls: { [key: string]: ModelUrls } = {
    'Crystal-jelly': {
      modelUrl: '/models/Crystal-jelly/Crystal-jelly.gltf',
      textureUrl: '/models/Crystal-jelly/Crystal-jelly_tex.png',
      // Uncomment and add other maps if available
      // normalMapUrl: '/models/Crystal-jelly/Crystal-jelly_normal.png',
      // bumpMapUrl: '/models/Crystal-jelly/Crystal-jelly_bump.png',
      // displacementMapUrl: '/models/Crystal-jelly/Crystal-jelly_displacement.png',
      // roughnessMapUrl: '/models/Crystal-jelly/Crystal-jelly_roughness.png',
      // metalnessMapUrl: '/models/Crystal-jelly/Crystal-jelly_metalness.png',
      // aoMapUrl: '/models/Crystal-jelly/Crystal-jelly_ao.png',
    },
    'Flower-hat-jelly': {
      modelUrl: '/models/Flower-hat-jelly/Flower-hat-jelly.gltf',
      textureUrl: '/models/Flower-hat-jelly/Flower-hat-jelly_tex.png',
      // Uncomment and add other maps if available
      // normalMapUrl: '/models/Flower-hat-jelly/Flower-hat-jelly_normal.png',
      // bumpMapUrl: '/models/Flower-hat-jelly/Flower-hat-jelly_bump.png',
      // displacementMapUrl: '/models/Flower-hat-jelly/Flower-hat-jelly_displacement.png',
      // roughnessMapUrl: '/models/Flower-hat-jelly/Flower-hat-jelly_roughness.png',
      // metalnessMapUrl: '/models/Flower-hat-jelly/Flower-hat-jelly_metalness.png',
      // aoMapUrl: '/models/Flower-hat-jelly/Flower-hat-jelly_ao.png',
    },
    'Hydrozoan-jelly': {
      modelUrl: '/models/Hydrozoan-jelly/Hydrozoan-jelly.gltf',
      textureUrl: '/models/Hydrozoan-jelly/Hydrozoan-jelly_tex.png',
      // Uncomment and add other maps if available
      // normalMapUrl: '/models/Hydrozoan-jelly/Hydrozoan-jelly_normal.png',
      // bumpMapUrl: '/models/Hydrozoan-jelly/Hydrozoan-jelly_bump.png',
      // displacementMapUrl: '/models/Hydrozoan-jelly/Hydrozoan-jelly_displacement.png',
      // roughnessMapUrl: '/models/Hydrozoan-jelly/Hydrozoan-jelly_roughness.png',
      // metalnessMapUrl: '/models/Hydrozoan-jelly/Hydrozoan-jelly_metalness.png',
      // aoMapUrl: '/models/Hydrozoan-jelly/Hydrozoan-jelly_ao.png',
    },
    'Jelly256': {
      modelUrl: '/models/Jelly256/Jelly256.gltf',
      textureUrl: '/models/Jelly256/Jelly_tex_256.png',
      bumpMapUrl: '/models/Jelly256/Tri_tex_256.png',
      // Uncomment and add other maps if available
      // normalMapUrl: '/models/Jelly256/Jelly256_normal.png',
      // displacementMapUrl: '/models/Jelly256/Jelly256_displacement.png',
      // roughnessMapUrl: '/models/Jelly256/Jelly256_roughness.png',
      // metalnessMapUrl: '/models/Jelly256/Jelly256_metalness.png',
      // aoMapUrl: '/models/Jelly256/Jelly256_ao.png',
    },
  };
  
  export default modelsUrls;