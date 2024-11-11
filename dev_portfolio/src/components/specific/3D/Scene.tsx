import React from "react";
import { Canvas } from "@react-three/fiber";
import Jellyfish from "./Jellyfish";
import Particles from "./Particles";
import NeonLights from "./NeonLights";
import { OrbitControls } from "@react-three/drei"; // For testing and checking alignment
import WaterEffect from "./WaterEffect";

const Scene = () => {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 2, 5], fov: 45 }}
      style={{ border: "1px solid white", height: "100vh", width: "100vw", marginLeft: "0"}}
    >
      <ambientLight intensity={0.1} color="#111111" />
      <NeonLights />
      <WaterEffect/>
      <Jellyfish />
      <Particles />
      <OrbitControls /> 
    </Canvas>
  );
};

export default Scene;