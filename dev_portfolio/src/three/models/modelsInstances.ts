// src/three/models/modelInstances.ts

interface ModelInstance {
    id: string;
    name: string;
    position?: [number, number, number];
    rotation?: [number, number, number];
    scale?: [number, number, number];
  }
  
  const modelInstances: ModelInstance[] = [
    {
      id: 'model1',
      name: 'Crystal-jelly',
      position: [0, 0, 0],
      rotation: [0, 0, 0],
      scale: [1, 1, 1],
    },
    {
      id: 'model2',
      name: 'Flower-hat-jelly',
      position: [2, 0, 0],
      rotation: [0, Math.PI / 4, 0],
      scale: [1.5, 1.5, 1.5],
    },
    {
      id: 'model3',
      name: 'Hydrozoan-jelly',
      position: [-2, 0, 0],
      rotation: [0, -Math.PI / 4, 0],
      scale: [1, 1, 1],
    },
    {
      id: 'model4',
      name: 'Jelly256',
      position: [0, 0, -2],
      rotation: [0, 0, 0],
      scale: [0.8, 0.8, 0.8],
    },
  ];
  
  export default modelInstances;