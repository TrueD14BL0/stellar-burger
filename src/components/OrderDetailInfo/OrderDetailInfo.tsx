import styles from "./OrderDetailInfo.module.css";
import { shallowEqual, useSelector } from "react-redux";
import { FC, useMemo } from "react";
import { Location, Params, useLocation, useParams } from "react-router-dom";
import { chooseOrderReducer, diffDateInDays, diffToString } from "../../utils/utils";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import OrderDetailInfoUnit from "../OrderDetailInfoUnit/OrderDetailInfoUnit";
import { RootState, TIngredient, TIngredientSmall, TOrdersFeed, TOrdersState } from "../../services/types/types";
import { ordersStatus } from "../../utils/const";

const OrderDetailInfo: FC = () => {

  const params: Readonly<Params<string>> = useParams();
  const location: Location = useLocation();
  let orderReducer: string = chooseOrderReducer(location)||'';

  const order: TOrdersFeed | undefined = useSelector((store: RootState) => {
      const orders: TOrdersState = store[orderReducer].orders;
      return orders.orders.find(element=>element._id===params.id);
    }
    , shallowEqual
  );
  const ingredientsList = useSelector((store: RootState) => store.ingredientsListReducer, shallowEqual);

  const orderDate = order ? new Date(Date.parse(order.createdAt)) : new Date();
  const today = new Date();
  const differenceDate = diffDateInDays(orderDate.getDate(), today.getDate());

  const orderSum = useMemo(() => {
      let sum = 0;
      order && order.ingredients.forEach(element => {
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
      const arrToReturn: TIngredientSmall[] = [];
      order.ingredients.forEach(element => {
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

  return order?
    (
      <div className={`${styles.content} mt-5`}>
        <p className={`text text_type_digits-default ${styles.number} ${!location.state&&styles.numberSinglePage}`}>{`#${order.number}`}</p>
        <div>
          <h2 className={`text text_type_main-medium ${styles.name}`}>{order.name}</h2>
          <p className={`text text_type_main-small pt-3 pb-5 ${styles[order.status]}`}>{ordersStatus[order.status as keyof typeof ordersStatus]}</p>
        </div>
        <div className={styles.listContent}>
          <p className={`text text_type_main-medium pb-6`}>Состав</p>
          <ul className={`${styles.list}`}>
            {orderContent&&orderContent.map((element) => {
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
    :null
}

export default OrderDetailInfo;
