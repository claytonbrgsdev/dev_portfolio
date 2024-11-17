// // JellyfishBodyShader.tsx
// import { ShaderMaterial, ShaderMaterialParameters, Vector2 } from 'three';
// import { ReactThreeFiber } from '@react-three/fiber';

// class JellyfishBodyMaterial extends ShaderMaterial {
//   constructor(parameters?: ShaderMaterialParameters) {
//     super({
//       ...parameters,
//       uniforms: {
//         uTime: { value: 0 },
//         uResolution: { value: new Vector2(window.innerWidth, window.innerHeight) },
//       },
//       vertexShader: `
//         varying vec2 vUv;
//         void main() {
//           vUv = uv;
//           vec3 pos = position;
//           gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
//         }
//       `,
//       fragmentShader: `
//         uniform float uTime;
//         varying vec2 vUv;
//         void main() {
//           vec3 color = vec3(1.0, 0.5 + 0.5 * sin(uTime), 0.8);
//           gl_FragColor = vec4(color, 1.0);
//         }
//       `,
//     });
//   }
// }

// /* eslint-disable @typescript-eslint/no-namespace */
// declare global {
//   namespace JSX {
//     interface IntrinsicElements {
//       jellyfishBodyMaterial: ReactThreeFiber.MaterialNode<
//         JellyfishBodyMaterial,
//         typeof JellyfishBodyMaterial
//       >;
//     }
//   }
// }
// /* eslint-enable @typescript-eslint/no-namespace */

// export default JellyfishBodyMaterial;