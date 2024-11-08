import styles from './About.module.css'

export default function About() {
    return (
        <div className={styles['aboutPageContainer']}>
            <h1 className={styles['title']}>About</h1>
            <p className={styles['paragraph']}>this is the content for my about page</p>
        </div>
    )
}
