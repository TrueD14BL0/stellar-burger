import styles from './ModalOverlay.module.css'

const ModalOverlay = ({close}) => {
  return (
    <div className={styles.overlay} onClick={()=>close(null)}/>
  )
}

export default ModalOverlay;
