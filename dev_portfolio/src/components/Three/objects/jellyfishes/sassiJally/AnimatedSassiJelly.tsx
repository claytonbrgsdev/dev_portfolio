// JellyfishScene.tsx

"use client"

import { useRef } from "react"
import {  useFrame } from "@react-three/fiber"
import * as THREE from 'three';
import SassiJelly from "./SassiJelly";

export default function AnimatedSassiJelly() {
  const jellyfishRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (jellyfishRef.current) {
      // Define a smooth, natural swimming path
      const speed = .7
      const radius = 4

      const x = Math.cos(t * speed) * radius
      const y = Math.sin(t * speed * 2) * 1.5 + Math.sin(t * speed * 0.5) * 1
      const z = Math.sin(t * speed) * radius

      jellyfishRef.current.position.set(x, y, z)

      // Make the jellyfish face the direction of movement
      const lookAtPosition = new THREE.Vector3(
        Math.cos((t + 2) * speed) * radius,
        y,
        Math.sin((t + 1) * speed) * radius
      )
      jellyfishRef.current.lookAt(lookAtPosition)
    }
  })

  return (
    <group ref={jellyfishRef}>
      <SassiJelly />

    </group>
  )
}

// export default function JellyfishScene() {
//   return (
//     <Canvas camera={{ position: [0, 2, 15], fov: 50 }}>
//       <ambientLight intensity={0.5} />
//       <AnimatedJellyfish />
//       <OrbitControls />
//     </Canvas>
//   )
// }