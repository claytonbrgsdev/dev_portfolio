// src/components/Three/canvasLayout/CanvasLayout.tsx
import React from 'react';
import { Canvas } from '@react-three/fiber';
import Slide2 from '../scenes/intro/slide2/Slide2';

const CanvasLayout2: React.FC = () => {
    return (
        <Canvas
            style={{
                
                height: '100vh',
                width: '100vw',
                backgroundColor: 'black',
            }}
        >
            <Slide2 />
        </Canvas>
    );
};

export default CanvasLayout2;