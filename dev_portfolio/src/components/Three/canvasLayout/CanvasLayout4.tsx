// src/components/Three/canvasLayout/CanvasLayout.tsx
import React from 'react';
import { Canvas } from '@react-three/fiber';
import Slide4 from '../scenes/intro/slide4/Slide4';

const CanvasLayout4: React.FC = () => {
    return (
        <Canvas
            style={{
                
                height: '100vh',
                width: '100vw',
                backgroundColor: 'black',
            }}
        >
            <Slide4 />
        </Canvas>
    );
};

export default CanvasLayout4;