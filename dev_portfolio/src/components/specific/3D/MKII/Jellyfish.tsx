// // Jellyfish.tsx
// import React, { useRef } from 'react';
// import { useFrame, extend } from '@react-three/fiber';
// import * as THREE from 'three';
// import JellyfishBodyMaterial from './JellyfishBodyShader';
// import Tentacle from './CrazyTentacles';

// // Extend the JellyfishBodyMaterial
// extend({ JellyfishBodyMaterial });

// const Jellyfish: React.FC = () => {
//   const groupRef = useRef<THREE.Group>(null!);
//   const bodyRef = useRef<THREE.Mesh<THREE.BufferGeometry, JellyfishBodyMaterial>>(null!);

//   const tentacleCount = 12;
//   const radius = 0.8;

//   // Generate tentacle positions
//   const tentaclePositions = React.useMemo(() => {
//     const positions: THREE.Vector3[] = [];
//     for (let i = 0; i < tentacleCount; i++) {
//       const angle = (i / tentacleCount) * Math.PI * 2;
//       const x = Math.cos(angle) * radius;
//       const z = Math.sin(angle) * radius;
//       positions.push(new THREE.Vector3(x, 0, z));
//     }
//     return positions;
//   }, [tentacleCount, radius]);

//   useFrame(({ clock }) => {
//     const time = clock.getElapsedTime();

//     // Animate the jellyfish body pulsating and moving upwards
//     const yPosition = 5 + Math.sin(time * 0.5) * 0.5;
//     groupRef.current.position.y = yPosition;

//     // Swaying motion to simulate water currents
//     groupRef.current.position.x = Math.sin(time * 0.3) * 0.5;
//     groupRef.current.position.z = Math.cos(time * 0.2) * 0.5;

//     // Slight rotation
//     groupRef.current.rotation.y = Math.sin(time * 0.2) * 0.2;

//     // Animate the jellyfish body pulsating
//     const scale = 1 + Math.sin(time * 3) * 0.1;
//     bodyRef.current.scale.set(scale, scale, scale);

//     // Slight wobble
//     bodyRef.current.rotation.y = Math.sin(time * 1.5) * 0.1;
//     bodyRef.current.rotation.x = Math.sin(time * 1.2) * 0.05;

//     // Update shader material uniform
//     bodyRef.current.material.uniforms.uTime.value = time;
//   });

//   return (
//     <group ref={groupRef}>
//       {/* Jellyfish Body */}
//       <mesh ref={bodyRef} position={[0, 2, 0]} castShadow receiveShadow>
//         <sphereGeometry args={[1, 32, 32]} />
//         <jellyfishBodyMaterial attach="material" />
//       </mesh>

//       {/* Tentacles */}
//       {tentaclePositions.map((pos, idx) => (
//         <Tentacle
//           key={idx}
//           index={idx}
//           segments={20}
//           segmentLength={0.2}
//           segmentRadius={0.05}
//           basePosition={pos.clone().add(new THREE.Vector3(0, 1.5, 0))}
//         />
//       ))}
//     </group>
//   );
// };

// export default Jellyfish;