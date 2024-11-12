"use client"

import { useRef, useMemo, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import { Trail, useTexture } from "@react-three/drei"
import * as THREE from "three"

export default function Jellyfish() {
  const jellyfishRef = useRef<THREE.Group>(null)
  const tentaclesRef = useRef<THREE.InstancedMesh>(null)
  const shaderMaterialRef = useRef<THREE.ShaderMaterial>(null)
  
  const texture = useTexture('https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvcHgxMTAwMzgxLWltYWdlLWpvYjYzMC1uXzEtbDBnMDdvdWUuanBn.jpg')

  const bellGeometry = useMemo(() => new THREE.SphereGeometry(1, 64, 64, 0, Math.PI * 2, 0, Math.PI * 0.5), [])

  const tentacleData = useMemo(() => {
    const data = []
    const mainTentacleCount = 24
    const smallTentacleCount = 48

    // Main long tentacles
    for (let i = 0; i < mainTentacleCount; i++) {
      const angle = (i / mainTentacleCount) * Math.PI * 2
      const radius = 0.8
      const length = 3 + Math.random() * 2 // Varied lengths
      const segments = Math.floor(30 + Math.random() * 10) // Varied segment counts

      data.push({
        baseX: Math.cos(angle) * radius,
        baseZ: Math.sin(angle) * radius,
        angle,
        length,
        segments,
        thickness: 0.03 + Math.random() * 0.02, // Varied thickness
        type: 'main'
      })
    }

    // Smaller, more numerous tentacles
    for (let i = 0; i < smallTentacleCount; i++) {
      const angle = (i / smallTentacleCount) * Math.PI * 2
      const radius = 0.9
      const length = 1 + Math.random() * 1.5
      const segments = Math.floor(15 + Math.random() * 10)

      data.push({
        baseX: Math.cos(angle) * radius,
        baseZ: Math.sin(angle) * radius,
        angle,
        length,
        segments,
        thickness: 0.01 + Math.random() * 0.015,
        type: 'small'
      })
    }

    return data
  }, [])

  const tentacleSegments = useMemo(() => {
    return tentacleData.reduce((acc, tentacle) => acc + tentacle.segments, 0)
  }, [tentacleData])

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
    }
  }, [texture])

  // Reset tentacles every 10 seconds
  useEffect(() => {
    const interval = setInterval(resetTentacles, 10000); // Reset every 10 seconds
    return () => clearInterval(interval);
  }, [])

  const resetTentacles = () => {
    if (tentaclesRef.current) {
      tentaclesRef.current.instanceMatrix.needsUpdate = true;
    }
  }

  useFrame((state) => {
    if (!jellyfishRef.current || !tentaclesRef.current || !shaderMaterialRef.current) return

    const time = state.clock.getElapsedTime()
    
    shaderMaterialRef.current.uniforms.uTime.value = time
    
    // Swimming and pulsating motion
    const pulseFreq = 0.5
    const pulseAmp = 0.1
    const pulse = Math.sin(time * pulseFreq) * pulseAmp
    jellyfishRef.current.scale.set(1 + Math.sin(time * 2) * 0.05, 1 + pulse, 1 + Math.sin(time * 2) * 0.05)
    
    // Gentle drifting motion
    jellyfishRef.current.position.y = Math.sin(time * 0.5) * 0.2
    jellyfishRef.current.rotation.x = Math.sin(time * 0.15) * 0.05
    jellyfishRef.current.rotation.z = Math.sin(time * 0.1) * 0.05
    
    let segmentIndex = 0
    tentacleData.forEach((tentacle) => {
      for (let j = 0; j < tentacle.segments; j++) {
        const matrix = new THREE.Matrix4()
        
        const segmentRatio = j / tentacle.segments
        const yOffset = -tentacle.length * segmentRatio
        
        const waveFreq = 2 - segmentRatio // Frequency decreases along tentacle
        const waveAmp = 0.1 + segmentRatio * 0.3 // Amplitude increases along tentacle
        
        const waveX = Math.sin(time * waveFreq + tentacle.angle) * waveAmp * segmentRatio
        const waveZ = Math.cos(time * waveFreq + tentacle.angle) * waveAmp * segmentRatio

        const x = tentacle.baseX + waveX
        const y = yOffset + Math.sin(time * 2 + segmentRatio * Math.PI) * 0.1
        const z = tentacle.baseZ + waveZ

        const position = new THREE.Vector3(x, y, z)

        let rotation = new THREE.Quaternion();

        if (j === 0) {
          const eulerRotation = new THREE.Euler(0, tentacle.angle, Math.PI / 2);
          rotation.setFromEuler(eulerRotation);
        } else {
          const prevMatrix = new THREE.Matrix4();
          tentaclesRef.current?.getMatrixAt(segmentIndex - 1, prevMatrix);
          const prevPosition = new THREE.Vector3();
          prevPosition.setFromMatrixPosition(prevMatrix);
          
          const direction = new THREE.Vector3().subVectors(position, prevPosition);
          rotation.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.normalize());
        }

        const scale = new THREE.Vector3(
          tentacle.thickness * (1 - segmentRatio * 0.7), // Taper the tentacle
          tentacle.length / tentacle.segments,
          tentacle.thickness * (1 - segmentRatio * 0.7)
        )
        
        matrix.compose(position, rotation, scale)
        tentaclesRef.current?.setMatrixAt(segmentIndex, matrix)
        segmentIndex++
      }
    })
    
    tentaclesRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <group ref={jellyfishRef}>
      <mesh geometry={bellGeometry}>
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
  )
}