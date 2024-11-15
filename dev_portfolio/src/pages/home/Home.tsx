import React from 'react';
import styles from './Home.module.css';
// import Scene from '../../components/specific/3D/Scene';

const Home: React.FC = () => {

    return (
        <div className={styles.home} style={{ color: 'white' }}>
            <div className={styles.homeSection1}>
                <h1 className={styles['title']}>
                    HI, MY NAME IS CLAYTON. I'M A DEVELOPER. LET ME SHOW YOU MY WORK. SIT BACK AND SCROLL DOWN.
                </h1>
            </div>
            {/* <div className={styles.homeSection2}>
                <Scene/>
            </div> */}
        </div>
    );
};

export default Home;