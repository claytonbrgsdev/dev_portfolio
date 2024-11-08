import styles from './NavBar.module.css'
export default function NavBar() {
    return (
        <div className={styles['navbarContainer']}>
            <div>
                <div>
                    <a>home</a>
                </div>
                <div>
                    <a>contact</a>
                </div>
                <div>
                    <a>about</a>
                </div>
            </div>
        </div>
    )
}
