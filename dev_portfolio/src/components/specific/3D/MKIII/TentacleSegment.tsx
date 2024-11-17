import React from 'react';
import * as THREE from 'three';

type TentacleSegmentProps = {
  path: THREE.Curve<THREE.Vector3>;
};

const TentacleSegment: React.FC<TentacleSegmentProps> = ({ path }) => {
  return (
    <mesh>
      <tubeGeometry args={[path, 64, 0.05, 8, false]} />
      <meshPhysicalMaterial
        color="#ffffff"
        transparent
        opacity={0.5}
        transmission={0.9}
        roughness={0.1}
        metalness={0}
        clearcoat={1}
        clearcoatRoughness={0}
        reflectivity={0.5}
        emissive="#aaffff"
        emissiveIntensity={0.7}
      />
    </mesh>
  );
};

export default TentacleSegment;