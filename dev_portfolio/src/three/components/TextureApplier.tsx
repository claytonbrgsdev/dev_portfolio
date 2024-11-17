// src/three/components/TextureApplier.tsx

import React, { useEffect } from 'react';
import {
  Material,
  MeshStandardMaterial,
  MeshPhysicalMaterial,
  MeshPhongMaterial,
  MeshLambertMaterial,
  TextureLoader,
} from 'three';
import { useLoader } from '@react-three/fiber';

interface TextureApplierProps {
  materials: Material[];
  textureUrl?: string;
  normalMapUrl?: string;
  bumpMapUrl?: string;
  displacementMapUrl?: string;
  roughnessMapUrl?: string;
  metalnessMapUrl?: string;
  aoMapUrl?: string;
}

const transparentPixel =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAnRSTlMA/1uRIrUAAAANSURBVAjXY2AgDQAAADAAAceqhY4AAAAASUVORK5CYII=';

const TextureApplier: React.FC<TextureApplierProps> = ({
  materials,
  textureUrl,
  normalMapUrl,
  bumpMapUrl,
  displacementMapUrl,
  roughnessMapUrl,
  metalnessMapUrl,
  aoMapUrl,
}) => {
  // Prepare an array of texture URLs, substituting missing URLs with a transparent pixel
  const textureUrls = [
    textureUrl || transparentPixel,
    normalMapUrl || transparentPixel,
    bumpMapUrl || transparentPixel,
    displacementMapUrl || transparentPixel,
    roughnessMapUrl || transparentPixel,
    metalnessMapUrl || transparentPixel,
    aoMapUrl || transparentPixel,
  ];

  // Load all textures unconditionally
  const [
    texture,
    normalMap,
    bumpMap,
    displacementMap,
    roughnessMap,
    metalnessMap,
    aoMap,
  ] = useLoader(TextureLoader, textureUrls);

  useEffect(() => {
    materials.forEach((material) => {
      let needsUpdate = false;

      if (
        material instanceof MeshStandardMaterial ||
        material instanceof MeshPhysicalMaterial
      ) {
        if (textureUrl) {
          material.map = texture;
          needsUpdate = true;
        }
        if (normalMapUrl) {
          material.normalMap = normalMap;
          needsUpdate = true;
        }
        if (bumpMapUrl) {
          material.bumpMap = bumpMap;
          needsUpdate = true;
        }
        if (displacementMapUrl) {
          material.displacementMap = displacementMap;
          needsUpdate = true;
        }
        if (roughnessMapUrl) {
          material.roughnessMap = roughnessMap;
          needsUpdate = true;
        }
        if (metalnessMapUrl) {
          material.metalnessMap = metalnessMap;
          needsUpdate = true;
        }
        if (aoMapUrl) {
          material.aoMap = aoMap;
          needsUpdate = true;
        }
      } else if (
        material instanceof MeshPhongMaterial ||
        material instanceof MeshLambertMaterial
      ) {
        if (textureUrl) {
          material.map = texture;
          needsUpdate = true;
        }
        if (bumpMapUrl) {
          material.bumpMap = bumpMap;
          needsUpdate = true;
        }
        if (displacementMapUrl) {
          material.displacementMap = displacementMap;
          needsUpdate = true;
        }
        // MeshPhongMaterial supports normalMap and aoMap
        if (material instanceof MeshPhongMaterial) {
          if (normalMapUrl) {
            material.normalMap = normalMap;
            needsUpdate = true;
          }
          if (aoMapUrl) {
            material.aoMap = aoMap;
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
    textureUrl,
    normalMapUrl,
    bumpMapUrl,
    displacementMapUrl,
    roughnessMapUrl,
    metalnessMapUrl,
    aoMapUrl,
    texture,
    normalMap,
    bumpMap,
    displacementMap,
    roughnessMap,
    metalnessMap,
    aoMap,
  ]);

  return null; // This component doesn't render anything
};

export default TextureApplier;