// src/components/Three/scenes/intro/slide3/Slide3.tsx
import React from 'react';
import { Html, MeshWobbleMaterial } from '@react-three/drei';
import Jellyfish from '../../../../specific/3D/MKIII/Jellyfish';
import DeepSeaBackground from '../../../backgrounds/environments/DeepSeaBackground';



const Slide3: React.FC = () => {
    return (
        <>
        <DeepSeaBackground/>
        <MeshWobbleMaterial/>
<Jellyfish/>


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
                    LET ME SHOW YOU MY WORK
                </h1>
            </div>
        </Html>
        </>
    );
};

export default Slide3;