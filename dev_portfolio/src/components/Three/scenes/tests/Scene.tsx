// Scene.tsx
import { Canvas } from '@react-three/fiber';
// import DeepSeaBackground from './DeepSeaBackground';
// import Particles from "./Particles";
// import NeonLights from './NeonLights';
import { OrbitControls } from '@react-three/drei'; // For testing and checking alignment
import { Environment } from '@react-three/drei';
// import AnimatedJellyfish from './JellyfishScene';
// import Jellyfish from './Weird/WeirdLookingThing';

// import TextTransition from './TextTransitions';
// import WaterEffect from './WaterEffect';

const Scene = () => {
    return (
        <Canvas
            shadows
            camera={{ position: [90, 0, 0], fov: 45 }}
            style={{ height: '100vh', width: '100vw', marginLeft: '0' }}
        >
            <ambientLight intensity={0.1} color="#111111" />


            {/* <WaterEffect /> */}
            {/* <PerspectiveCamera makeDefault position={[200, -20, -80]} /> */}
            <Environment preset="night" />
            {/* <Particles /> */}
            {/* <DeepSeaBackground/> */}
            {/* <AnimatedJellyfish /> */}
            {/* <fogExp2 args={['#000', 0.15]} /> */}
            {/* <Jellyfish/> */}
            {/* <NeonLights /> */}
            {/* <TextTransition
        phrases={[
          'HI, MY NAME IS CLAYTON.',
          "I'M A DEVELOPER.",
          'LET ME SHOW YOU MY WORK.',
          'SIT BACK AND SCROLL DOWN.',
        ]}
      /> */}
            <OrbitControls />
        </Canvas>
    );
};

export default Scene;