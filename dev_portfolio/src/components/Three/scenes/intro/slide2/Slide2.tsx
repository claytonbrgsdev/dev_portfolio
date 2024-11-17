// src/components/Three/scenes/intro/slide2/Slide2.tsx
import React from 'react';
import { Html } from '@react-three/drei';

import WeirdJelly from '../../../objects/jellyfishes/weirdJelly/WeirdJelly';

const Slide2: React.FC = () => {
    return (
        <>
        <WeirdJelly/>

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
                        I'M A SELF TAUGHT DEVELOPER WITH FOCUS ON FRONT-END APPLICATIONS
                    </h1>
                </div>
            </Html>
        </>
    );
};

export default Slide2;