import styles from './Loader.module.css'

const Loader = () => {
  return (
    <h2 className={`${styles.center} text text_type_main-medium pt-5`}>Запрашиваю сервер</h2>
  )
}

export default Loader;
