import { FC } from 'react';
import styles from './OrderUnitThumbnail.module.css';

interface IOrderUnitThumbnail {
  name: string,
  image: string,
}

const OrderUnitThumbnail: FC<IOrderUnitThumbnail> = ({name, image}) => {
  return (
    <div className={`${styles.roundedBorder}`}>
      <img src={image} alt={name} className={styles.ingridientsImage}></img>
    </div>
  )
}

export default OrderUnitThumbnail;
