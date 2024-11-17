import React from "react";
import { Plane } from "@react-three/drei";

const ReflectivePlane: React.FC = () => {
  return (
    <Plane args={[50, 50]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -10, 0]}>
      <meshStandardMaterial
        color="#111111" // Dark metallic color
        roughness={0.1}  // Slightly smoother for a reflective look
        metalness={0.8}
        emissive="#0a0a0a"
      />
    </Plane>
  );
};

export default ReflectivePlane;