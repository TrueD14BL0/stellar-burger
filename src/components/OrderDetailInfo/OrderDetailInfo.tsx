import styles from "./OrderDetailInfo.module.css";
import { shallowEqual, useSelector } from "react-redux";
import { useMemo } from "react";
import { useLocation, useParams } from "react-router-dom";
import { chooseOrderReducer, diffDateInDays, diffToString } from "../../utils/utils";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import OrderDetailInfoUnit from "../OrderDetailInfoUnit/OrderDetailInfoUnit";
import { ordersStatus } from "../../utils/data";

const OrderDetailInfo = () => {

  const params = useParams();
  const location = useLocation();
  let orderReducer = chooseOrderReducer(location);

  const order = useSelector(store => store[orderReducer].orders.find(element=>element._id===params.id), shallowEqual);
  const ingredientsList = useSelector(store => store.ingridientsListReducer, shallowEqual);

  const orderDate = order ? new Date(Date.parse(order.createdAt)) : new Date();
  const today = new Date();
  const differenceDate = diffDateInDays(orderDate, today);

  const orderSum = useMemo(() => {
      let sum = 0;
      order.ingredients.forEach(element => {
        const ingredientEl = ingredientsList.content.find(ingr => ingr._id === element);
        if(ingredientEl){
          sum+=ingredientEl.price;
        }
      });
      return sum;
    },
    [order, ingredientsList.content]
  );

  const orderContent = useMemo(() => {
    if(order){
      const arrToReturn = [];
      order.ingredients.forEach(element => { // маппинг не вариант (хоть и удобнее) так как мне надо создать новый массив с другим количеством элементов
        const ingredientEl = ingredientsList.content.find(ingr => ingr._id === element);
        if(ingredientEl){
          const item = arrToReturn.find(innerItem => innerItem.id === element);
          if(item){
            item.qty += 1;
          }else{
            arrToReturn.push({
              id: ingredientEl._id,
              name: ingredientEl.name,
              url: ingredientEl.image,
              qty: 1,
              price: ingredientEl.price,
            });
          }
        }
      });
      return arrToReturn;
    }}
    ,[order, ingredientsList.content]);

  return order&&(
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
              return  (
                <li key={element.id}> {/* здесь можно использовать id не дублируется в разрезе списка ингредиентов - сворачивали список. */}
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
