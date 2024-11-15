import styles from './NavBar.module.css'
export default function NavBar() {
    return (
        <div className={styles['navbarContainer']} >
            <h1 className={styles['title']} style={{ display: 'flex', margin: "2.5rem 5rem" }}>
            C B
            </h1>
                <div className={styles['menuTab']} >
                    <a href='contact' className={styles['menuItem']}>contact</a>
                </div>
        </div>
    )
}
