import { Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './BurgerConstructorBottom.module.css';
import { BurgerConstructorContext } from "../../context/BurgerConstructorContext";
import { useContext, useState } from "react";
import Api from "../Api/Api";
import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';

const BurgerConstructorBottom = () => {
  const { constructorList } = useContext(BurgerConstructorContext);
  const [isOpen, setModalOpen] = useState(false);
  const [orderNumber, setOrderNumber] = useState();

  const onClickHandler = () => {
    Api.postOrders([constructorList.bun._id,
                    constructorList.bun._id,
                    ...constructorList.content.map(item=>item._id)])
      .then((data)=>{
        if(data.success){
          setOrderNumber(data.order.number);
          setModalOpen(true);
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
      {isOpen &&
        <Modal close={setModalOpen}>
          <OrderDetails orderNumber={orderNumber}/>
        </Modal>
      }
    </div>
  )
}

export default BurgerConstructorBottom;
