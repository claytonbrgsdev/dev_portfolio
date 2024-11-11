import React, { useRef } from 'react';
import { ReactThreeFiber, useFrame } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { extend } from '@react-three/fiber';

// GLSL shader code for the jellyfish bell
const bellFragmentShader = `
  uniform float uTime;
  varying vec2 vUv;

  void main() {
    float strength = 0.5;
    vec3 color = vec3(0.1, 0.6, 1.0); // Aqua/blue shade
    color *= strength;
    gl_FragColor = vec4(color, 0.6); // Semi-transparent
  }
`;

const bellVertexShader = `
  varying vec2 vUv;
  uniform float uTime;

  void main() {
    vUv = uv;
    vec3 pos = position;
    pos.z += sin(uTime + position.y * 2.0) * 0.1; // Creates a pulsing effect
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

// Define the shader material for the jellyfish bell
const BellMaterial = shaderMaterial(
  { uTime: 0 }, // Uniforms
  bellVertexShader,
  bellFragmentShader
);

extend({ BellMaterial });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      bellMaterial: ReactThreeFiber.Object3DNode<THREE.ShaderMaterial, typeof BellMaterial>;
    }
  }
}

const Jellyfish: React.FC = () => {
  const ref = useRef<THREE.ShaderMaterial>(null!);

  useFrame((state) => {
    if (ref.current) {
      (ref.current.uniforms as any).uTime.value = state.clock.getElapsedTime();
    }
  });

  return (
    <mesh position={[0, 0, 0]}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <bellMaterial ref={ref} attach="material" />
    </mesh>
  );
};

export default Jellyfish;