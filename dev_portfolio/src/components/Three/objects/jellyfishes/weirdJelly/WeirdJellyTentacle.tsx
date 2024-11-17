// Tentacle.tsx
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { createNoise2D } from 'simplex-noise';

interface TentacleProps {
  segments: number;
  segmentLength: number;
  baseRadius: number;
  tipRadius: number;
  basePosition: [number, number, number];
  curveAmplitude: number;
  noiseScale: number;
  noiseSpeed: number;
}

const WeirdJellyTentacle: React.FC<TentacleProps> = ({
  segments,
  segmentLength,
  baseRadius,
  tipRadius,
  basePosition,
  curveAmplitude,
  noiseScale,
  noiseSpeed,
}) => {
  const groupRef = useRef<THREE.Group>(null!);
  const meshRef = useRef<THREE.SkinnedMesh>(null!);

  // Create the noise function
  const noise2D = useMemo(() => createNoise2D(), []);

  // Create bones for the tentacle inside useMemo
  const bones = useMemo(() => {
    const bonesArray: THREE.Bone[] = [];
    let prevBone = new THREE.Bone();
    prevBone.position.y = 0;
    bonesArray.push(prevBone);

    for (let i = 1; i <= segments; i++) {
      const bone = new THREE.Bone();
      bone.position.y = -segmentLength;
      bonesArray.push(bone);
      prevBone.add(bone);
      prevBone = bone;
    }

    return bonesArray;
  }, [segments, segmentLength]);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();

    bones.forEach((bone, index) => {
      if (index === 0) return;
      const t = index / segments;
      const angle = curveAmplitude * Math.sin(time * noiseSpeed + t * Math.PI * 2);
      const noiseValue = noise2D(time * noiseSpeed + t, t * noiseScale);
      bone.rotation.z = angle + noiseValue * curveAmplitude;
    });
  });

  // Create geometry with skinning
  const geometry = useMemo(() => {
    const geometry = new THREE.CylinderGeometry(
      tipRadius,
      baseRadius,
      segmentLength * segments,
      8,
      segments,
      true
    );
    geometry.translate(0, -segmentLength * segments / 2, 0);

    // Skinning attributes
    const position = geometry.attributes.position as THREE.BufferAttribute;
    const vertex = new THREE.Vector3();

    const skinIndices: number[] = [];
    const skinWeights: number[] = [];

    for (let i = 0; i < position.count; i++) {
      vertex.fromBufferAttribute(position, i);

      const y = -vertex.y;
      const skinIndex = Math.floor(y / segmentLength);
      const skinWeight = (y % segmentLength) / segmentLength;

      skinIndices.push(skinIndex, skinIndex + 1, 0, 0);
      skinWeights.push(1 - skinWeight, skinWeight, 0, 0);
    }

    geometry.setAttribute('skinIndex', new THREE.Uint16BufferAttribute(skinIndices, 4));
    geometry.setAttribute('skinWeight', new THREE.Float32BufferAttribute(skinWeights, 4));

    return geometry;
  }, [segments, segmentLength, baseRadius, tipRadius]);

  return (
    <group ref={groupRef} position={basePosition}>
      <primitive object={bones[0]} />
      <skinnedMesh ref={meshRef} geometry={geometry} skeleton={new THREE.Skeleton(bones)}>
        <meshPhysicalMaterial
          color="#ff69b4"
          transmission={0.9}
          thickness={0.5}
          roughness={0}
          metalness={0}
          clearcoat={1}
          clearcoatRoughness={0}
        />
      </skinnedMesh>
    </group>
  );
};

export default WeirdJellyTentacle;