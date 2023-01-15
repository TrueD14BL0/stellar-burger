import styles from './ModalOverlay.module.css'
import PropTypes from 'prop-types';

const ModalOverlay = ({close}) => {
  return (
    <div className={styles.overlay} onClick={()=>close(false)}/>
  )
}

ModalOverlay.propTypes = {
  close: PropTypes.func.isRequired,
};

export default ModalOverlay;
