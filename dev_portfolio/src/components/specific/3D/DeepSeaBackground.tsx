"use client"

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { 
  PerspectiveCamera, 
  Plane, 
  useTexture, 
  Points, 
  PointMaterial 
} from '@react-three/drei'
import { 
  EffectComposer, 
  Bloom, 
  DepthOfField, 
  Vignette 
} from '@react-three/postprocessing'
import * as THREE from 'three'

interface CustomShaderMaterial extends THREE.ShaderMaterial {
  uniforms: {
    time: { value: number }
    normalMap: { value: THREE.Texture }
  }
}

const DeepSeaBackground = () => {
  // const { viewport } = useThree()
  
  // Water surface
  const waterRef = useRef<THREE.Mesh>(null)
  const waterNormal = useTexture('https://acg-download.struffelproductions.com/file/ambientCG-Web/download/NightSkyHDRI007_mtiJpeMF/NightSkyHDRI007_16K-TONEMAPPED.jpg')
  
  // Ambient particles
  const ambientParticlesRef = useRef<THREE.Points>(null)
  const ambientParticleCount = 800  // Further reduced from 1500
  const ambientParticlePositions = useMemo(() => {
    const positions = new Float32Array(ambientParticleCount * 3)
    for (let i = 0; i < ambientParticleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50
      positions[i * 3 + 1] = Math.random() * -50 // Only in the lower half
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50
    }
    return positions
  }, [ambientParticleCount])

  // Rising particles (bubbles)
  const risingParticlesRef = useRef<THREE.Points>(null)
  const risingParticleCount = 50  // Further reduced from 80
  const risingParticlePositions = useMemo(() => {
    const positions = new Float32Array(risingParticleCount * 3)
    for (let i = 0; i < risingParticleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 40
      positions[i * 3 + 1] = Math.random() * -50 // Start from bottom
      positions[i * 3 + 2] = (Math.random() - 0.5) * 40
    }
    return positions
  }, [risingParticleCount])

  useFrame((state, delta) => {
    if (waterRef.current && (waterRef.current.material as CustomShaderMaterial).uniforms) {
      (waterRef.current.material as CustomShaderMaterial).uniforms.time.value += delta
    }
    if (ambientParticlesRef.current) {
      ambientParticlesRef.current.rotation.y += delta * 0.05
      console.log(`só pra parar de reclamar, esse é o state: ${state}`)
    }
    if (risingParticlesRef.current) {
      const positions = risingParticlesRef.current.geometry.attributes.position.array as Float32Array
      for (let i = 0; i < risingParticleCount; i++) {
        positions[i * 3 + 1] += delta * (0.5 + Math.random() * 1.5) // Random upward speed
        if (positions[i * 3 + 1] > 25) {
          positions[i * 3 + 1] = -25 // Reset to bottom when reaching top
        }
      }
      risingParticlesRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <>
      <color attach="background" args={['#001220']} />
      
      <PerspectiveCamera makeDefault position={[0, 0, 10]} />
      
      <ambientLight intensity={0.1} />
      <directionalLight position={[0, 10, 5]} intensity={0.5} />

      {/* Water surface */}
      <Plane
        ref={waterRef}
        args={[100, 100, 100, 100]}
        rotation-x={-Math.PI / 2}
        position-y={5}
      >
        <shaderMaterial
          transparent
          uniforms={{
            time: { value: 0 },
            normalMap: { value: waterNormal },
          }}
          vertexShader={`
            uniform float time;
            varying vec2 vUv;
            varying float noise;
            
            // Simplex 3D Noise
            vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
            vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
            float snoise(vec3 v){
              const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
              const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
              vec3 i  = floor(v + dot(v, C.yyy) );
              vec3 x0 =   v - i + dot(i, C.xxx) ;
              vec3 g = step(x0.yzx, x0.xyz);
              vec3 l = 1.0 - g;
              vec3 i1 = min( g.xyz, l.zxy );
              vec3 i2 = max( g.xyz, l.zxy );
              vec3 x1 = x0 - i1 + 1.0 * C.xxx;
              vec3 x2 = x0 - i2 + 2.0 * C.xxx;
              vec3 x3 = x0 - 1. + 3.0 * C.xxx;
              i = mod(i, 289.0 );
              vec4 p = permute( permute( permute(
                         i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
                       + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
                       + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
              float n_ = 1.0/7.0;
              vec3  ns = n_ * D.wyz - D.xzx;
              vec4 j = p - 49.0 * floor(p * ns.z *ns.z);
              vec4 x_ = floor(j * ns.z);
              vec4 y_ = floor(j - 7.0 * x_ );
              vec4 x = x_ *ns.x + ns.yyyy;
              vec4 y = y_ *ns.x + ns.yyyy;
              vec4 h = 1.0 - abs(x) - abs(y);
              vec4 b0 = vec4( x.xy, y.xy );
              vec4 b1 = vec4( x.zw, y.zw );
              vec4 s0 = floor(b0)*2.0 + 1.0;
              vec4 s1 = floor(b1)*2.0 + 1.0;
              vec4 sh = -step(h, vec4(0.0));
              vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
              vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
              vec3 p0 = vec3(a0.xy,h.x);
              vec3 p1 = vec3(a0.zw,h.y);
              vec3 p2 = vec3(a1.xy,h.z);
              vec3 p3 = vec3(a1.zw,h.w);
              vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
              p0 *= norm.x;
              p1 *= norm.y;
              p2 *= norm.z;
              p3 *= norm.w;
              vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
              m = m * m;
              return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                dot(p2,x2), dot(p3,x3) ) );
            }
            
            void main() {
              vUv = uv;
              vec3 pos = position;
              float noiseFreq = 1.5;
              float noiseAmp = 0.25;
              vec3 noisePos = vec3(pos.x * noiseFreq + time, pos.y, pos.z);
              noise = snoise(noisePos) * noiseAmp;
              pos.y += noise;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
            }
          `}
          fragmentShader={`
            uniform sampler2D normalMap;
            varying vec2 vUv;
            varying float noise;
            
            void main() {
              vec3 color = vec3(0.0, 0.3, 0.5);
              vec3 normal = texture2D(normalMap, vUv * 10.0).rgb;
              vec3 light = normalize(vec3(0.5, 0.5, 1.0));
              float shading = dot(normal, light) * 0.5;
              gl_FragColor = vec4(color + shading + noise * 0.1, 0.8);
            }
          `}
        />
      </Plane>

      {/* Ambient underwater particles */}
      <Points ref={ambientParticlesRef} positions={ambientParticlePositions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#ffffff"
          size={0.1}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.6}
        />
      </Points>

      {/* Rising particles (bubbles) */}
      <Points ref={risingParticlesRef} positions={risingParticlePositions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#a0f0ff"
          size={0.2}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.8}
        />
      </Points>

      {/* Post-processing effects */}
      <EffectComposer>
        <DepthOfField
          focusDistance={0}
          focalLength={0.02}
          bokehScale={2}
          height={480}
        />
        <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} />
        <Vignette eskil={false} offset={0.1} darkness={1.1} />
      </EffectComposer>
    </>
  )
}

export default DeepSeaBackground