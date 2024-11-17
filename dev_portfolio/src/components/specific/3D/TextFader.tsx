// // TextFader.tsx
// import { useState, useEffect } from "react";
// import { Text } from "@react-three/drei";
// import { useTransition, animated } from "@react-spring/three";

// interface TextFaderProps {
//   phrases: string[];
//   position?: [number, number, number];
// }

// const TextFader: React.FC<TextFaderProps> = ({ phrases, position = [0, 0, 0] }) => {
//   const [index, setIndex] = useState(0);

//   // Update the phrase index every few seconds
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setIndex((prevIndex) => (prevIndex + 1) % phrases.length);
//     }, 4000); // change phrase every 4 seconds

//     return () => clearInterval(interval);
//   }, [phrases.length]);

//   // Create fade transition for phrases
//   const transitions = useTransition(phrases[index], {
//     from: { opacity: 0 },
//     enter: { opacity: 1 },
//     leave: { opacity: 0 },
//     config: { duration: 2000 }, // 2 seconds for each fade in/out
//   });

//   return (
//     <>
//       {transitions((style, item) => (
//         <animated.group position={position} style={style}>
//           <Text
//             fontSize={0.5}
//             color="white"
//             anchorX="center"
//             anchorY="middle"
//           >
//             {item}
//           </Text>
//         </animated.group>
//       ))}
//     </>
//   );
// };

// export default TextFader;