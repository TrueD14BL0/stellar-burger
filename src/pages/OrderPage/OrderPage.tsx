import { FC } from "react";
import OrderDetailInfo from "../../components/OrderDetailInfo/OrderDetailInfo";
import styles from './OrderPage.module.css';

const OrderPage: FC = () => {
  return (
    <div className={`${styles.content} pt-30`}>
      <OrderDetailInfo/>
    </div>
  );
}

export default OrderPage;
