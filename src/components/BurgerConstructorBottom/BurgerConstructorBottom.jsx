import { Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { constructorListProps } from "../../utils/propTypes";
import styles from './BurgerConstructorBottom.module.css';
import PropTypes from 'prop-types';

const BurgerConstructorBottom = ({order, openModal}) => {
  return (
    <div className={`${styles.orderWrapper} mt-10`}>
      <div className={styles.priceWrapper}>
        <span className='text text_type_digits-medium'>{order.sum}</span>
        <div className={styles.iconWrapper}>
          <CurrencyIcon type="primary" />
        </div>
      </div>
      <Button htmlType="button" type="primary" size="large" onClick={()=>openModal(true)}>
        Оформить заказ
      </Button>
    </div>
  )
}

BurgerConstructorBottom.propTypes = {
  order: constructorListProps,
  openModal: PropTypes.func.isRequired,
}

export default BurgerConstructorBottom;
