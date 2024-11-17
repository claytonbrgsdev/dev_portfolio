// src/three/index.ts

export { default as ModelRenderer } from './components/ModelRenderer';
export { default as ModelAnimator } from './components/ModelAnimator';
export { default as TextureApplier } from './components/TextureApplier';

export { useAnimationHandler } from './hooks/useAnimationHandler';
export { useTextureLoader } from './hooks/useTextureLoader';
export { useModelLoader } from './hooks/useModelLoader';

export { preloadModel, usePreloadedModel } from './utils/preloadModels';
export * from './utils/modelUtils';
export * from './utils/textureUtils';