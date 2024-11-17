// import React, { useRef } from "react";
// import { extend, useFrame, ReactThreeFiber } from "@react-three/fiber";
// import { shaderMaterial } from "@react-three/drei";
// import * as THREE from "three";

// const waterFragmentShader = `
//   uniform float uTime;
//   varying vec2 vUv;

//   void main() {
//     float strength = 0.3;
//     vec2 pos = vUv + vec2(sin(uTime * 0.1) * 0.1, cos(uTime * 0.1) * 0.1);
//     vec3 color = vec3(0.0);

//     // Set red to a dark blue shade
//     color.r = 0.2 + sin(pos.x * 10.0 + uTime * 0.3) * 0.2;

//     // Set green to a dark purple shade
//     color.g = 0.1 + sin(pos.y * 10.0 + uTime * 0.5) * 0.2;

//     // Keep blue as it is
//     color.b = 1.0;

//     gl_FragColor = vec4(color * strength, 1.0);
//   }
// `;

// const waterVertexShader = `
//   varying vec2 vUv;

//   void main() {
//     vUv = uv;
//     gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
//   }
// `;

// // Define the shader material with uniforms
// const WaterMaterial = shaderMaterial(
//   { uTime: 0 }, // Uniforms
//   waterVertexShader,
//   waterFragmentShader
// );

// extend({ WaterMaterial });

// // Extend IntrinsicElements for JSX to recognize `waterMaterial`
// declare global {
//   namespace JSX {
//     interface IntrinsicElements {
//       waterMaterial: ReactThreeFiber.Object3DNode<THREE.ShaderMaterial, typeof WaterMaterial>;
//     }
//   }
// }

// const WaterEffect: React.FC = () => {
//   // Use a generic ShaderMaterial ref without strict typing on uniforms
//   const ref = useRef<THREE.ShaderMaterial>(null!);

//   useFrame((state) => {
//     if (ref.current) {
//       // Assert uniforms to bypass TypeScript strict typing
//       (ref.current.uniforms as any).uTime.value = state.clock.getElapsedTime();
//     }
//   });

//   return (
//     <mesh position={[0, 0, -5]}>
//       <planeGeometry args={[80, 80]} />
//       <waterMaterial ref={ref} attach="material" />
//     </mesh>
//   );
// };

// export default WaterEffect;