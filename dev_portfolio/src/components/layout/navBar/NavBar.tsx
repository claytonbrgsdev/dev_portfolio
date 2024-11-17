import styles from './NavBar.module.css'
// import logo1 from './../../../assets/Logos_ClaytonBorgesDev/Asset 4@2x.png'
// import logo2 from './../../../assets/Logos_ClaytonBorgesDev/Asset 5@2x.png'
import logo3 from './../../../assets/logos/Asset 6@2x.png'

export default function NavBar() {
    return (
        <div className={styles['navbarContainer']}  style={{ position: "static", top: 0, left: 0 }}>
            <img src={logo3} style={{ display: 'flex', color: "white", margin: "auto auto auto 2.5rem", filter: "invert()", maxHeight: "2rem", height: "100%", width: "auto" }}/>
                {/* <div className={styles['menuTab']} >
                    <a href='contact' style={{ margin: "auto"}} >contact</a>
                </div> */}
        </div>
    )
}
