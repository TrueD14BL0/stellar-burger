import { Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './BurgerConstructorBottom.module.css';
import PropTypes from 'prop-types';
import { BurgerConstructorContext } from "../../context/BurgerConstructorContext";
import { useContext } from "react";
import Api from "../Api/Api";

const BurgerConstructorBottom = ({openModal}) => {
  const { constructorList, setConstructorList } = useContext(BurgerConstructorContext);

  const onClickHandler = () => {
    Api.postOrders([constructorList.bun._id,
                    constructorList.bun._id,
                    ...constructorList.content.map(item=>item._id)])
      .then((data)=>{
        if(data.success){
          setConstructorList({...constructorList,
                              id: data.order.number});
          openModal(true);
        }else{
          console.log('Some trouble with post order to server!');
        }
      })
      .catch((err)=>{
        console.log('Some trouble with response from server! \n', err);
      });
  }

  return (
    <div className={`${styles.orderWrapper} mt-10`}>
      <div className={styles.priceWrapper}>
        <span className='text text_type_digits-medium'>{constructorList.sum}</span>
        <div className={styles.iconWrapper}>
          <CurrencyIcon type="primary" />
        </div>
      </div>
      <Button htmlType="button" type="primary" size="large" onClick={onClickHandler}>
        Оформить заказ
      </Button>
    </div>
  )
}

BurgerConstructorBottom.propTypes = {
  openModal: PropTypes.func.isRequired,
}

export default BurgerConstructorBottom;
