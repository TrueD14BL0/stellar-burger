import styles from "./OrderDetailInfo.module.css";
import { shallowEqual, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { diffDateInDays, diffToString } from "../../utils/utils";
import { v4 as uuidv4 } from 'uuid';
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import OrderDetailInfoUnit from "../OrderDetailInfoUnit/OrderDetailInfoUnit";
import { ordersStatus } from "../../utils/data";

const OrderDetailInfo = () => {

  const [element, setElement] = useState(null);
  const params = useParams();
  const location = useLocation();
  let orderDate = new Date();
  let today = new Date();
  let differenceDate = diffDateInDays(orderDate, today);
  let orderSum = 0;
  const orderContent = [];
  const { order, ingredientsList } = useSelector(store => ({
    order: store.ordersReducer.orders.find(element=>element._id===params.id),
    ingredientsList: store.ingridientsListReducer,
  }), shallowEqual);

  useEffect(()=>{
    setElement(order);
  }, [order]);

  if(element){
    orderDate = new Date(Date.parse(element.createdAt));
    today = new Date();
    differenceDate = diffDateInDays(orderDate, today);

    element.ingredients.forEach(element => {
      const ingredientEl = ingredientsList.content.find(ingr => ingr._id === element);
      if(ingredientEl){
        orderSum+=ingredientEl.price;
        const item = orderContent.find(innerItem => innerItem.id === element);
        if(item){
          item.qty += 1;
        }else{
          orderContent.push({
            id: ingredientEl._id,
            name: ingredientEl.name,
            url: ingredientEl.image,
            qty: 1,
            price: ingredientEl.price,
          });
        }
      }
    });
  }

  return element&&(
    <div className={`${styles.content} mt-5`}>
      <p className={`text text_type_digits-default ${styles.number} ${!location.state&&styles.numberSinglePage}`}>{`#${order.number}`}</p>
      <div>
        <h2 className={`text text_type_main-medium ${styles.name}`}>{order.name}</h2>
        <p className={`text text_type_main-small pt-3 pb-5 ${styles[order.status]}`}>{ordersStatus[order.status]}</p>
      </div>
      <div className={styles.listContent}>
        <p className={`text text_type_main-medium pb-6`}>Состав</p>
        <ul className={`${styles.list}`}>
          {orderContent.map((element) => {
              const uuid = uuidv4();
              return  (
                <li key={uuid}>
                  <OrderDetailInfoUnit name={element.name} url={element.url} qty={element.qty} price={element.price} />
                </li>
              );
            }
          )}
        </ul>
      </div>
      <div className={styles.bottom}>
        <p className={`text text_type_main-default text_color_inactive`}>
          {`${diffToString(differenceDate)},${orderDate.getHours()}:${orderDate.getMinutes()}
          i-GMT${orderDate.getTimezoneOffset()>0?`+${orderDate.getTimezoneOffset()/60}`
          :orderDate.getTimezoneOffset()/60}`}</p>
          <div className={styles.total}>
            <p className='text text_type_digits-default'>{orderSum}</p>
            <CurrencyIcon type="primary" />
          </div>
      </div>
    </div>
  )
}

export default OrderDetailInfo;
