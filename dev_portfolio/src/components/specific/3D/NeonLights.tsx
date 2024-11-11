import React, { useMemo } from "react";
import { Vector3, Color } from "three";

const NeonLights: React.FC = () => {
  const lights = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 10; i++) {
      // Randomize position within a large range for background effect
      const x = (Math.random() - 0.5) * 20;
      const y = (Math.random() - 0.5) * 10;
      const z = (Math.random() - 0.5) * 20;

      // Randomize color
      const color = new Color(`hsl(${Math.random() * 360}, 100%, 50%)`);

      temp.push({ position: new Vector3(x, y, z), color });
    }
    return temp;
  }, []);

  return (
    <>
      {lights.map((light, index) => (
        <pointLight
          key={index}
          position={light.position}
          color={light.color}
          intensity={0.15} // Low intensity for subtle effect
          distance={5}
          decay={2}
        />
      ))}
    </>
  );
};

export default NeonLights;