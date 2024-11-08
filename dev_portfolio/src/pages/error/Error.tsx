import styles from './Error.module.css'

export default function Error() {
  return (
    <div className={styles['errorPageContainer']}>
    <h1 className={styles['title']}>About</h1>
    <p className={styles['paragraph']}>this is the content for my about page</p>
</div>
  )
}
