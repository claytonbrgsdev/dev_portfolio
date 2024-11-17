// src/components/Three/canvasLayout/CanvasLayout.tsx
import React from 'react';
import { Canvas } from '@react-three/fiber';
import Slide3 from '../scenes/intro/slide3/Slide3';

const CanvasLayout3: React.FC = () => {
    return (
        <Canvas
            style={{
                
                height: '100vh',
                width: '100vw',
                backgroundColor: 'black',
            }}
        >
            <Slide3 />
        </Canvas>
    );
};

export default CanvasLayout3;