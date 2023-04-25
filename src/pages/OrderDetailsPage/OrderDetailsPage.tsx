import { FC } from 'react';
import OrderDetailInfo from '../../components/OrderDetailInfo/OrderDetailInfo';
import styles from './OrderDetailsPage.module.css';

const OrderDetailsPage: FC = () => {
  return (
    <div className={`${styles.content} pt-30`}>
      <OrderDetailInfo />
    </div>
  );
}

export default OrderDetailsPage;
