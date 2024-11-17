"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Trail, useTexture } from "@react-three/drei";
import * as THREE from "three";
import texturePlaceHolder from './../../../../../assets/textures/caustics.png';

export default function SassiJelly() {
  const jellyfishRef = useRef<THREE.Group>(null);
  const tentaclesRef = useRef<THREE.InstancedMesh>(null);
  const shaderMaterialRef = useRef<THREE.ShaderMaterial>(null);
  
  const texture = useTexture(texturePlaceHolder);

  const bellGeometry = useMemo(() => new THREE.SphereGeometry(1, 64, 64, 0, Math.PI * 2, 0, Math.PI * 0.5), []);

  const tentacleData = useMemo(() => {
    const data = [];
    const mainTentacleCount = 24;
    const smallTentacleCount = 48;

    // Main long tentacles
    for (let i = 0; i < mainTentacleCount; i++) {
      const angle = (i / mainTentacleCount) * Math.PI * 2;
      const radius = 0.8;
      const length = 3 + Math.random() * 6;
      const segments = Math.floor(30 + Math.random() * 10);

      const isSwimming = Math.random() < 0.1;

      data.push({
        baseX: Math.cos(angle) * radius,
        baseZ: Math.sin(angle) * radius,
        angle,
        length,
        segments,
        thickness: 0.03 + Math.random() * 0.02,
        type: 'main',
        waveOffset: Math.random() * Math.PI * 2,
        waveFreq: 0.5 + Math.random() * 1.0,
        waveAmpBase: 0.15 + Math.random() * 0.3,
        isSwimming,
        swimFreq: isSwimming ? 2 + Math.random() * 2 : 0,
        swimAmp: isSwimming ? 0.1 + Math.random() * 0.1 : 0,
      });
    }

    // Smaller, more numerous tentacles
    for (let i = 0; i < smallTentacleCount; i++) {
      const angle = (i / smallTentacleCount) * Math.PI * 2;
      const radius = 0.9;
      const length = 1 + Math.random() * 1.5;
      const segments = Math.floor(15 + Math.random() * 10);

      data.push({
        baseX: Math.cos(angle) * radius,
        baseZ: Math.sin(angle) * radius,
        angle,
        length,
        segments,
        thickness: 0.01 + Math.random() * 0.015,
        type: 'small',
        waveOffset: Math.random() * Math.PI * 2,
        waveFreq: 0.5 + Math.random() * 1.0,
        waveAmpBase: 0.1 + Math.random() * 0.2,
        isSwimming: false,
        swimFreq: 0,
        swimAmp: 0,
      });
    }

    return data;
  }, []);

  const tentacleSegments = useMemo(() => {
    return tentacleData.reduce((acc, tentacle) => acc + tentacle.segments, 0);
  }, [tentacleData]);

  const jellyfishShaderMaterial = useMemo(() => {
    return {
      uniforms: {
        uTime: { value: 0 },
        uTexture: { value: texture },
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        uniform float uTime;
        
        void main() {
          vUv = uv;
          vNormal = normalize(normalMatrix * normal);
          
          vec3 pos = position;
          pos.y += sin(pos.x * 10.0 + uTime) * 0.05;
          pos.y += sin(pos.z * 10.0 + uTime) * 0.05;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D uTexture;
        uniform float uTime;
        varying vec2 vUv;
        varying vec3 vNormal;
        
        void main() {
          vec3 color = texture2D(uTexture, vUv).rgb;
          float pulse = sin(uTime * 2.0) * 0.5 + 0.5;
          float fresnel = pow(1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
          vec3 glowColor = vec3(0.6, 0.8, 1.0);
          
          color = mix(color, glowColor, fresnel * pulse * 0.5);
          gl_FragColor = vec4(color, 0.7 + fresnel * 0.3);
        }
      `,
    };
  }, [texture]);

  // Function to reset the tentacles
  const resetTentacles = () => {
    if (tentaclesRef.current) {
      tentaclesRef.current.instanceMatrix.needsUpdate = true;
    }
  };

  // Set up interval to reset tentacles every 15 seconds
  useEffect(() => {
    const interval = setInterval(resetTentacles, 15000);
    return () => clearInterval(interval);
  }, []);

  useFrame((state) => {
    if (!jellyfishRef.current || !tentaclesRef.current || !shaderMaterialRef.current) return;

    const time = state.clock.getElapsedTime();
    shaderMaterialRef.current.uniforms.uTime.value = time;
    
    jellyfishRef.current.scale.set(1 + Math.sin(time * 2) * 0.05, 1, 1 + Math.sin(time * 2) * 0.05);
    jellyfishRef.current.position.y = Math.sin(time * 0.5) * 0.2;
    jellyfishRef.current.rotation.x = Math.sin(time * 0.15) * 0.05;
    jellyfishRef.current.rotation.z = Math.sin(time * 0.1) * 0.05;

    let segmentIndex = 0;
    tentacleData.forEach((tentacle) => {
      for (let j = 0; j < tentacle.segments; j++) {
        const matrix = new THREE.Matrix4();
        const segmentRatio = j / tentacle.segments;
        let yOffset = -tentacle.length * segmentRatio;
        
        if (tentacle.isSwimming) {
          yOffset += Math.sin(time * tentacle.swimFreq + segmentRatio * Math.PI * 2) * tentacle.swimAmp * (1 - segmentRatio);
        }

        const waveFreq = tentacle.waveFreq * (1 - segmentRatio);
        const waveAmp = tentacle.waveAmpBase + segmentRatio * 0.3;

        const waveX = Math.sin(time * waveFreq + tentacle.angle + tentacle.waveOffset) * waveAmp * segmentRatio;
        const waveZ = Math.cos(time * waveFreq + tentacle.angle + tentacle.waveOffset) * waveAmp * segmentRatio;

        const x = tentacle.baseX + waveX;
        const y = yOffset + Math.sin(time * 2 + segmentRatio * Math.PI) * 0.1;
        const z = tentacle.baseZ + waveZ;

        const position = new THREE.Vector3(x, y, z);
        const rotation = new THREE.Quaternion();

        if (j === 0) {
          const eulerRotation = new THREE.Euler(0, tentacle.angle, Math.PI / 2);
          rotation.setFromEuler(eulerRotation);
        } else {
          const prevMatrix = new THREE.Matrix4();
          tentaclesRef.current?.getMatrixAt(segmentIndex - 1, prevMatrix);
          const prevPosition = new THREE.Vector3();
          prevPosition.setFromMatrixPosition(prevMatrix);
          
          const direction = new THREE.Vector3().subVectors(position, prevPosition).normalize();
          rotation.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);
        }

        const scale = new THREE.Vector3(
          tentacle.thickness * (1 - segmentRatio * 0.7),
          tentacle.length / tentacle.segments,
          tentacle.thickness * (1 - segmentRatio * 0.7)
        );

        matrix.compose(position, rotation, scale);
        tentaclesRef.current?.setMatrixAt(segmentIndex, matrix);
        segmentIndex++;
      }
    });

    tentaclesRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <group ref={jellyfishRef}>
      <mesh geometry={bellGeometry} position={[0, -.18, 0]}>
        <shaderMaterial ref={shaderMaterialRef} args={[jellyfishShaderMaterial]} transparent depthWrite={false} />
      </mesh>
      
      <pointLight position={[0, 0, 0]} distance={2} intensity={2} color="#fff7d6" />
      <pointLight position={[0, -0.2, 0]} distance={1.5} intensity={1.5} color="#ff9f7a" />
      
      <instancedMesh ref={tentaclesRef} args={[undefined, undefined, tentacleSegments]}>
        <cylinderGeometry args={[1, 1, 1, 8]} />
        <meshPhysicalMaterial
          transparent
          opacity={0.6}
          roughness={0.2}
          transmission={0.9}
          thickness={0.5}
          color="#a8c6ff"
          emissive="#3366ff"
          emissiveIntensity={0.2}
        />
      </instancedMesh>
      
      {tentacleData.map((tentacle, i) => (
        <Trail
          key={i}
          width={tentacle.type === 'main' ? 0.05 : 0.02}
          length={tentacle.type === 'main' ? 20 : 10}
          color={tentacle.type === 'main' ? "#77a1ff" : "#a8c6ff"}
          attenuation={(t) => t * t}
          decay={1}
        >
          <mesh position={[tentacle.baseX, -tentacle.length, tentacle.baseZ]}>
            <sphereGeometry args={[tentacle.thickness / 2, 8, 8]} />
            <meshBasicMaterial color={tentacle.type === 'main' ? "#77a1ff" : "#a8c6ff"} />
          </mesh>
        </Trail>
      ))}
    </group>
  );
}