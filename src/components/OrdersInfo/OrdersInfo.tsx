import { shallowEqual, useSelector } from "react-redux";
import styles from './OrdersInfo.module.css';
import { v4 as uuidv4 } from 'uuid';

const OrdersInfo = () => {

  const { total, totalToday, connected, done, pending } = useSelector(store => ({
    pending: store.ordersReducer.orders.filter(item=>item.status==='pending'),
    done: store.ordersReducer.orders.filter(item=>item.status==='done'),
    total: store.ordersReducer.total,
    totalToday: store.ordersReducer.totalToday,
    connected: store.ordersReducer.connected,
  }), shallowEqual);

  return !connected ?
    (<></>) :
    (<div className={styles.content}>
      <div  className={styles.top}>
        <div className={styles.topOrders}>
          <h2 className="text text_type_main-medium">Готовы:</h2>
          <ul className={`${styles.list} pt-6`}>
            {done.map(element => {
              const uuid = uuidv4();
              return (
                <li className={`text text_type_digits-default ${styles.done}`} key={uuid}>
                  {element.number}
                </li>
              )
            })}
          </ul>
        </div>
        <div className={styles.topOrders}>
          <h2 className="text text_type_main-medium">В работе:</h2>
          <ul className={`${styles.list} pt-6`}>
            {pending.map(element => {
              const uuid = uuidv4();
              return (
                <li className={`text text_type_digits-default`} key={uuid}>
                  {element.number}
                </li>
              )
            })}
          </ul>
        </div>
      </div>
      <div>
        <h2 className="text text_type_main-medium">Выполнено за все время:</h2>
        <p className='text text_type_digits-large'>{total.toLocaleString()}</p>
      </div>
      <div>
        <h2 className="text text_type_main-medium">Выполнено за сегодня:</h2>
        <p className='text text_type_digits-large'>{totalToday.toLocaleString()}</p>
      </div>
    </div>
    );
}

export default OrdersInfo;