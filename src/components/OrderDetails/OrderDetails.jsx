import { CheckMarkIcon, CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./OrderDetails.module.css"
import PropTypes from 'prop-types';
import { constructorListProps } from "../../utils/propTypes";

const OrderDetails = ({order, close}) => {
  const orderId = "000000" + order.id;

  return (
    <div className={`${styles.contentWrapper} pt-20 pb-20`}>
      <button className={`${styles.closeBtn}`}>
        <CloseIcon type="primary" onClick={()=>close(null)}/>
      </button>
      <h2 className={`text text_type_digits-large ml-15 mr-15 ${styles.centeredText}`}>{orderId.substring(orderId.length-6)}</h2>
      <h3 className={`text text_type_main-medium ml-15 mr-15 mt-8 ${styles.centeredText}`}>идентификатор заказа</h3>
      <div className={`${styles.pic}`}>
        <CheckMarkIcon type="primary" />
      </div>
      <p className={`text text_type_main-small ml-15 mr-15 mt-15 ${styles.centeredText}`}>Ваш заказ начали готовить</p>
      <p className={`text text_type_main-default text_color_inactive ml-15 mr-15 mt-2 ${styles.centeredText}`}>Дождитесь готовности на орбитальной станции</p>
    </div>
  )
}

OrderDetails.propTypes = {
  order: constructorListProps,
  close: PropTypes.func.isRequired,
};

export default OrderDetails;
