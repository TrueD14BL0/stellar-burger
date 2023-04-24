import { Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './BurgerConstructorBottom.module.css';
import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { clearOrder, getOrderInfo } from "../../services/actions/orderObj";
import { getCookie } from "../../utils/utils";
import { Location, NavigateFunction, useLocation, useNavigate } from "react-router-dom";
import { PAGES } from "../../utils/const";
import { FC } from 'react';
import { AppThunk, RootState } from "../../services/types/types";

const BurgerConstructorBottom: FC = () => {

  const dispatch: AppThunk = useDispatch();
  const location: Location = useLocation();
  const navigation: NavigateFunction = useNavigate();

  const { constructorList, sum } = useSelector((store: RootState) => ({
    constructorList: store.constructorListReducer,
    sum: store.constructorListReducer.content.reduce((partialSum, a) => partialSum + a.price, 0)
      + (store.constructorListReducer.bun ? store.constructorListReducer.bun.price*2 : 0),
  }), shallowEqual);

  const { orderObj } = useSelector((store: RootState) => ({
    orderObj: store.orderObjReducer,
  }), shallowEqual);

  const onClickHandler = () => {
    if(!getCookie('refreshToken')){
      navigation(PAGES.LOGIN_PAGE, {
        replace:true,
        state:{prev: location.pathname}
      });
    }
    if(!constructorList.bun){
      return;
    }
    dispatch(getOrderInfo(constructorList));
  }

  return (
    <div className={`${styles.orderWrapper} mt-10`}>
      <div className={styles.priceWrapper}>
        <span className='text text_type_digits-medium'>{sum}</span>
        <div className={styles.iconWrapper}>
          <CurrencyIcon type="primary" />
        </div>
      </div>
      <Button htmlType="button" type="primary" size="large" onClick={onClickHandler}>
        Оформить заказ
      </Button>
      {orderObj.number &&
        <Modal close={()=>dispatch(clearOrder())}>
          <OrderDetails />
        </Modal>
      }
    </div>
  )
}

export default BurgerConstructorBottom;
