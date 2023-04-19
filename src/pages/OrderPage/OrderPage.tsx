import OrderDetailInfo from "../../components/OrderDetailInfo/OrderDetailInfo";
import styles from './OrderPage.module.css';

const OrderPage = () => {
  return (
    <div className={`${styles.content} pt-30`}>
      <OrderDetailInfo/>
    </div>
  );
}

export default OrderPage;
