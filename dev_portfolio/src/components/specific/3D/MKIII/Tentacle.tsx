import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import TentacleSegment from './TentacleSegment';
import * as THREE from 'three';
import { createNoise2D } from 'simplex-noise';

const simplex = createNoise2D();

type TentacleProps = {
  segmentCount: number;
  segmentLength: number;
  baseRadius: number;
  frequency: number;
  amplitude: number;
  phaseOffset: number;
};

class TentaclePath extends THREE.Curve<THREE.Vector3> {
  private segmentLength: number;
  private segmentCount: number;
  private baseRadius: number;

  constructor(segmentCount: number, segmentLength: number, baseRadius: number) {
    super();
    this.segmentCount = segmentCount;
    this.segmentLength = segmentLength;
    this.baseRadius = baseRadius;
  }

  getPoint(t: number, optionalTarget = new THREE.Vector3()): THREE.Vector3 {
    const x = Math.sin(t * Math.PI * 2) * this.baseRadius;
    const y = -t * this.segmentLength * this.segmentCount;
    return optionalTarget.set(x, y, 0);
  }
}

const Tentacle: React.FC<TentacleProps> = ({
  segmentCount,
  segmentLength,
  baseRadius,
  frequency,
  amplitude,
  phaseOffset,
}) => {
  const segmentsRef = useRef<THREE.Group[]>([]);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();

    for (let i = 0; i < segmentCount; i++) {
      const segment = segmentsRef.current[i];
      if (segment) {
        const noiseOffset = simplex(i * 0.1, time * 0.2) * 0.2;
        const angle =
          Math.sin(time * frequency + i * phaseOffset) * amplitude + noiseOffset;

        segment.position.y = -segmentLength * i;
        segment.rotation.z = angle;
      }
    }
  });

  const tentaclePath = new TentaclePath(segmentCount, segmentLength, baseRadius);

  return (
    <group>
      <TentacleSegment path={tentaclePath} />
    </group>
  );
};

export default Tentacle;