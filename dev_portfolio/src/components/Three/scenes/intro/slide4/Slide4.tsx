// src/components/Three/scenes/intro/slide4/Slide4.tsx
import React from 'react';
import { Html } from '@react-three/drei';
import DeepSeaBackground from '../../../backgrounds/environments/DeepSeaBackground';

const Slide4: React.FC = () => {
    return (
        <>
            <DeepSeaBackground/>
            <Html center>
                <div
                    style={{

                        width: '100vw', // Increase the width to fit the screen better
                        height: '100vh', // Increase the height to fit the screen better
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',


                    }}
                >
                    <h1 style={{ fontSize: '6rem', color: 'white', textAlign: 'center' }}>
                        SIT BACK AND SCROLL DOWN
                    </h1>
                </div>
            </Html>
        </>
    );
};

export default Slide4;