// // Scene.tsx
// import { Suspense } from 'react';
// import { Canvas } from '@react-three/fiber';
// import { OrbitControls, Environment } from '@react-three/drei';
// import Jellyfish from './Jellyfish';
// // import Particles from './Particles';
// import AnimatedJellyfish from '../JellyfishScene';
// import WeirdLookingThing from '../../../Three/objects/jellyfishes/weirdJelly/WeirdJelly';


// const Scene = () => {
//   return (
//     <Canvas
//       shadows
//       camera={{ position: [0, 5, 15], fov: 45 }}
//       style={{ height: '100vh', width: '100vw' }}
//     >
//       {/* Set the background color */}
//       <color attach="background" args={['#001e0f']} />

//       {/* Lighting */}
//       <ambientLight intensity={0.3} />
//       <directionalLight
//         position={[10, 10, 10]}
//         intensity={0.5}
//         castShadow
//         shadow-mapSize-width={1024}
//         shadow-mapSize-height={1024}
//       />

//       {/* Wrap components that load assets in Suspense */}
//       <Suspense fallback={null}>
//         {/* Environment */}
//         <Environment preset="sunset" />

//         {/* Particles */}
//         {/* <Particles count={500} radius={10} size={0.05} color="#00ffff" speed={0.001} />
//         <Particles count={200} radius={8} size={0.1} color="#ffffff" speed={0.002} /> */}

//         {/* Jellyfish */}
//         <Jellyfish />
//         <AnimatedJellyfish/>
//         <WeirdLookingThing/>
//       </Suspense>

//       <OrbitControls />
//     </Canvas>
//   );
// };

// export default Scene;