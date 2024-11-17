// src/components/Three/scenes/intro/slide1/Slide1.tsx
import React from 'react';
import { Html } from '@react-three/drei';
// import DeepSeaBackground from '../../../backgrounds/environments/DeepSeaBackground';
// import AnimatedSassiJelly from '../../../objects/jellyfishes/sassiJally/AnimatedSassiJelly';

const Slide1: React.FC = () => {
    return (
        <>
            {/* <DeepSeaBackground />
            <AnimatedSassiJelly /> */}
            <Html center>
                <div
                    style={{
                        width: '100vw',
                        height: '100vh',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <h1 style={{ fontSize: '6rem', color: 'white', textAlign: 'center' }}>
                        HI! MY NAME IS CLAYTON
                    </h1>
                </div>
            </Html>
        </>
    );
};

export default Slide1;