import styles from './NavBar.module.css'
export default function NavBar() {
    return (
        <div className={styles['navbarContainer']} >
            <h1 className={styles['title']} style={{ display: 'flex', margin: "auto auto auto 0" }}>
            C B
            </h1>
                <div className={styles['menuTab']}>
                    <a href='/home' className={styles['menuItem']}>home</a>
                </div>
                <div className={styles['menuTab']} >
                    <a href='contact' className={styles['menuItem']}>contact</a>
                </div>
                <div className={styles['menuTab']}>
                    <a href='about' className={styles['menuItem']}>about</a>
                </div>
            
        </div>
    )
}
