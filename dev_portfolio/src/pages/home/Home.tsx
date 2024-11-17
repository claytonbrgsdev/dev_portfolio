// src/pages/home/Home.tsx
import React from 'react';
import styles from './Home.module.css';
import CanvasLayout from '../../components/Three/canvasLayout/CanvasLayout';
// import CanvasLayout2 from '../../components/Three/canvasLayout/CanvasLayout2';
// import CanvasLayout3 from '../../components/Three/canvasLayout/CanvasLayout3';
// import CanvasLayout4 from '../../components/Three/canvasLayout/CanvasLayout4';

const Home: React.FC = () => {
    return (
        <div
            className={styles.home}
            style={{
                height: "440vh",
                overflowY: 'scroll',
                scrollSnapType: 'y mandatory',
            }}
        >
            {/* <h1 style={{ color: "white" }}>isto é a home</h1> */}

            <div style={{ height: '100vh', width: "100%", scrollSnapAlign: 'start' }}>
                <CanvasLayout />
            </div>
            {/* <div style={{ height: '100vh', width: "100%", scrollSnapAlign: 'start' }}>
                <CanvasLayout2 />
            </div>
            <div style={{ height: '100vh', width: "100%", scrollSnapAlign: 'start' }}>
                <CanvasLayout3 />
            </div>
            <div style={{ height: '100vh', width: "100%", scrollSnapAlign: 'start' }}>
                <CanvasLayout4 />
            </div>  */}
        </div>

    );
};

export default Home;