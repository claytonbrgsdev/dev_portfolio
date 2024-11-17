// // Tentacle.tsx
// import React, { useRef, useEffect } from 'react';
// import { useFrame, extend, ReactThreeFiber } from '@react-three/fiber';
// import * as THREE from 'three';
// import { createNoise3D } from 'simplex-noise';

// // Custom shader material for the tentacle
// class TentacleMaterial extends THREE.ShaderMaterial {
//   constructor() {
//     super({
//       uniforms: {
//         time: { value: 0 },
//       },
//       vertexShader: `
//         varying vec2 vUv;
//         varying float vNoise;
//         uniform float time;

//         // Noise generation
//         float random(vec3 scale, float seed) {
//           return fract(sin(dot(gl_Position.xyz + seed, scale)) * 43758.5453 + seed);
//         }

//         void main() {
//           vUv = uv;

//           // Apply noise for displacement
//           float noiseFreq = 3.5;
//           float noiseAmp = 0.15;

//           vec3 pos = position;
//           vec3 noisePos = vec3(pos.x * noiseFreq + time, pos.y, pos.z);
//           float noise = random(noisePos, 0.0);
//           pos.x += noise * noiseAmp;
//           pos.y += noise * noiseAmp;
//           pos.z += noise * noiseAmp;

//           vNoise = noise;

//           gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
//         }
//       `,
//       fragmentShader: `
//         varying vec2 vUv;
//         varying float vNoise;

//         void main() {
//           // Gradient color based on UV coordinates and noise
//           vec3 color = mix(vec3(1.0, 0.5, 0.8), vec3(0.8, 0.0, 0.5), vUv.y + vNoise * 0.1);
//           gl_FragColor = vec4(color, 1.0);
//         }
//       `,
//     });
//   }
// }

// extend({ TentacleMaterial });

// /* eslint-disable @typescript-eslint/no-namespace */
// declare global {
//   namespace JSX {
//     interface IntrinsicElements {
//       tentacleMaterial: ReactThreeFiber.MaterialNode<TentacleMaterial, typeof TentacleMaterial>;
//     }
//   }
// }
// /* eslint-enable @typescript-eslint/no-namespace */

// interface TentacleProps {
//   segments: number;
//   segmentLength: number;
//   basePosition: THREE.Vector3;
//   segmentRadius: number;
//   index: number;
// }

// const Tentacle: React.FC<TentacleProps> = ({
//   segments,
//   segmentLength,
//   basePosition,
//   segmentRadius,
//   index,
// }) => {
//   const groupRef = useRef<THREE.Group>(null!);
//   const meshRef = useRef<THREE.Mesh>(null!);
//   const positions = useRef<THREE.Vector3[]>([]);
//   const noiseOffsets = useRef<number[]>([]);
//   const clock = new THREE.Clock();

//   const noise3D = createNoise3D();

//   useEffect(() => {
//     // Initialize positions along the tentacle
//     positions.current = [];
//     for (let i = 0; i < segments; i++) {
//       positions.current.push(
//         new THREE.Vector3(
//           basePosition.x,
//           basePosition.y - i * segmentLength,
//           basePosition.z
//         )
//       );
//     }

//     // Initialize noise offsets
//     noiseOffsets.current = [];
//     for (let i = 0; i < segments; i++) {
//       noiseOffsets.current.push(Math.random() * 100);
//     }
//   }, [segments, segmentLength, basePosition]);

//   useFrame(() => {
//     const time = clock.getElapsedTime();

//     // Update positions with noise for organic movement
//     positions.current.forEach((pos, i) => {
//       const noiseScale = 0.5;
//       const noiseSpeed = 0.2;
//       const offset = noiseOffsets.current[i];

//       const nx =
//         noise3D(
//           pos.x * noiseScale + time * noiseSpeed + offset,
//           pos.y * noiseScale,
//           pos.z * noiseScale
//         ) * segmentRadius;

//       const ny =
//         noise3D(
//           pos.x * noiseScale,
//           pos.y * noiseScale + time * noiseSpeed + offset,
//           pos.z * noiseScale
//         ) * segmentRadius;

//       const nz =
//         noise3D(
//           pos.x * noiseScale,
//           pos.y * noiseScale,
//           pos.z * noiseScale + time * noiseSpeed + offset
//         ) * segmentRadius;

//       pos.x += nx;
//       pos.y += ny;
//       pos.z += nz;
//     });

//     // Create a smooth curve through the points
//     const curve = new THREE.CatmullRomCurve3(positions.current);
//     const geometry = new THREE.TubeGeometry(
//       curve,
//       segments * 5,
//       segmentRadius,
//       8,
//       false
//     );

//     if (meshRef.current) {
//       meshRef.current.geometry.dispose();
//       meshRef.current.geometry = geometry;
//     }

//     // Update shader material time uniform
//     if (meshRef.current.material instanceof TentacleMaterial) {
//       meshRef.current.material.uniforms.time.value = time + index;
//     }
//   });

//   return (
//     <group ref={groupRef}>
//       <mesh ref={meshRef}>
//         <tentacleMaterial attach="material" />
//       </mesh>
//     </group>
//   );
// };

// export default Tentacle;