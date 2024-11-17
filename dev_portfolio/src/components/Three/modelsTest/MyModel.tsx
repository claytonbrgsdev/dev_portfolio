// MyModel.tsx
import React from 'react';
import { useGLTF, useTexture } from '@react-three/drei';
import { MeshStandardMaterial } from 'three';

const MyModel: React.FC = () => {
  // Load the GLTF model
  const { scene, materials } = useGLTF('/Crystal-jelly/Crystal-jelly.gltf');

  // Load the PNG texture
  const texture = useTexture('/Crystal-jelly/Crystal-jelly_tex.png');

  // Log available materials for debugging
  console.log(materials);

  // Apply the texture to all materials dynamically
  Object.keys(materials).forEach((key) => {
    const material = materials[key] as MeshStandardMaterial;
    if (material) {
      material.map = texture; // Assign the texture to the map property
      material.needsUpdate = true; // Ensure the material updates
    }
  });

  return <primitive object={scene} dispose={null} />;
};

export default MyModel;