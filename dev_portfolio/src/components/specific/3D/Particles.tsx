import React, { useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Vector3, Color } from "three";

const Particles: React.FC = () => {
  // Memoize particle properties
  const particles = useMemo(() => {
    const temp: {
      position: Vector3;
      color: Color;
      opacity: number;
      driftSpeed: Vector3;
    }[] = [];
    for (let i = 0; i < 150; i++) {
      // Randomize position within a larger range for more depth
      const x = (Math.random() - 0.5) * 20;
      const y = (Math.random() - 0.5) * 10 + 1;
      const z = (Math.random() - 0.5) * 20;

      // Randomize color and properties
      const color = new Color(`hsl(${Math.random() * 360}, 100%, 60%)`);
      const opacity = 0.5 + Math.random() * 0.5;

      // Randomize drift speed for each particle for subtle independent movement
      const driftSpeed = new Vector3(
        (Math.random() - 0.5) * 0.01,
        (Math.random() - 0.5) * 0.01,
        (Math.random() - 0.5) * 0.01
      );

      temp.push({
        position: new Vector3(x, y, z),
        color,
        opacity,
        driftSpeed,
      });
    }
    return temp;
  }, []);

  // Apply drifting effect in useFrame
  useFrame(() => {
    particles.forEach((particle) => {
      particle.position.add(particle.driftSpeed); // Drift by adding speed to position
    });
  });

  return (
    <>
      {particles.map(({ position, color, opacity }, index) => (
        <mesh
          key={index}
          position={position}
          scale={0.1} // Adjust size if needed
        >
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.4}
            opacity={opacity}
            transparent
            roughness={0.5} // Give a metallic look with higher roughness
            metalness={0.6}  // Add metallic effect
          />
        </mesh>
      ))}
    </>
  );
};

export default Particles;