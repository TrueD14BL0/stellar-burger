import styles from "./OrderDetailInfoUnit.module.css";
import OrderUnitThumbnail from "../OrderUnitThumbnail/OrderUnitThumbnail";
import PropTypes from 'prop-types';
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const OrderDetailInfoUnit = ({name, url, qty, price}) => {

  return (
    <div className={styles.content}>
      <OrderUnitThumbnail image={url} name={name} />
      <p className={`${styles.name} text text_type_main-default`}>{name}</p>
      <p className={`${styles.total} text text_type_digits-default`}>{qty} x {price}<span><CurrencyIcon type="primary" /></span></p>
    </div>
  );

}

OrderDetailInfoUnit.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  qty: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
}


export default OrderDetailInfoUnit;
