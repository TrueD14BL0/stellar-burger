import styles from './OrderUnitThumbnail.module.css';
import PropTypes from 'prop-types';

const OrderUnitThumbnail = ({name, image}) => {
  return (
    <div className={`${styles.roundedBorder}`}>
      <img src={image} alt={name} className={styles.ingridientsImage}></img>
    </div>
  )
}

OrderUnitThumbnail.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
}

export default OrderUnitThumbnail;
