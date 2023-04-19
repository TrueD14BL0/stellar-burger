import styles from './NotFoundPage.module.css';

const NotFoundPage = () => {
  return (
    <div className={styles.content}>
      <p className={`${styles.paragraph} text text_type_main-large`}>Страница не найдена</p>
      <p className={`${styles.paragraph} text text_type_digits-large`}>404</p>
    </div>
  )
}

export default NotFoundPage;
