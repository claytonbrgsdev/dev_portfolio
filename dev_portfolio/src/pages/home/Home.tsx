import React from 'react';
import styles from './Home.module.css'; 

const Home: React.FC = () => {

    return (
        <div className={styles.home} style={{ color: 'white'}}>
            home
            <h1 className={styles['title']}>
                Clayton Borges *** DEV PORTFOLIO 
                </h1>
                <p>home</p>
                <span>home</span>
                <div>home</div>
            <div className={styles.homeSection}>
                home
                
            </div>
        </div>
    );
};

export default Home;