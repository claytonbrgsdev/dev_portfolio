// src/components/TestModel.tsx
import React from 'react';
import { useGLTF } from '@react-three/drei';

const TestModel: React.FC = () => {
  const { scene } = useGLTF('/models/Crystal-jelly/Crystal-jelly.gltf');
  return <primitive object={scene} dispose={null} />;
};

export default TestModel;