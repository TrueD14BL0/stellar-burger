import { Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './BurgerConstructorBottom.module.css';
import Api from "../Api/Api";
import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { delOrder, setOrder } from "../../services/actions/orderObj";

const BurgerConstructorBottom = () => {

  const dispatch = useDispatch();

  const { constructorList } = useSelector(store => ({
    constructorList: store.constructorListReducer,
  }), shallowEqual);

  const { orderObj } = useSelector(store => ({
    orderObj: store.orderObjReducer,
  }), shallowEqual);

  const onClickHandler = () => {
    if(!constructorList.bun){
      return;
    }
    Api.postOrders([constructorList.bun._id,
                    constructorList.bun._id,
                    ...constructorList.content.map(item=>item._id)])
      .then((data)=>{
        if(data.success){
          dispatch(setOrder(data.order));
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
      {orderObj.number !== 0 &&
        <Modal close={()=>dispatch(delOrder())}>
          <OrderDetails />
        </Modal>
      }
    </div>
  )
}

export default BurgerConstructorBottom;
