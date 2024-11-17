// // Particles.tsx
// import React, { useRef } from 'react';
// import { useFrame } from '@react-three/fiber';
// import * as THREE from 'three';

// interface ParticlesProps {
//   count: number;
//   radius: number;
//   size?: number;
//   color?: string;
//   speed?: number;
// }

// const Particles: React.FC<ParticlesProps> = ({
//   count,
//   radius,
//   size = 0.05,
//   color = '#00ffff',
//   speed = 0.001,
// }) => {
//   const particlesRef = useRef<THREE.Points>(null!);

//   const positions = React.useMemo(() => {
//     const positions = new Float32Array(count * 3);
//     for (let i = 0; i < count; i++) {
//       const theta = THREE.MathUtils.randFloatSpread(360);
//       const phi = THREE.MathUtils.randFloatSpread(360);

//       const x = radius * Math.sin(theta) * Math.cos(phi);
//       const y = radius * Math.sin(theta) * Math.sin(phi);
//       const z = radius * Math.cos(theta);

//       positions.set([x, y, z], i * 3);
//     }
//     return positions;
//   }, [count, radius]);

//   useFrame(() => {
//     if (particlesRef.current) {
//       particlesRef.current.rotation.y += speed; // Use the speed prop
//     }
//   });

//   return (
//     <points ref={particlesRef}>
//       <bufferGeometry>
//         <bufferAttribute
//           attach="attributes.position"
//           count={positions.length / 3}
//           array={positions}
//           itemSize={3}
//         />
//       </bufferGeometry>
//       <pointsMaterial
//         size={size} // Use the size prop
//         color={color} // Use the color prop
//         transparent
//         opacity={0.7}
//         depthWrite={false}
//       />
//     </points>
//   );
// };

// export default Particles;