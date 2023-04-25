import { shallowEqual, useSelector } from "react-redux";
import { diffDateInDays, diffToString } from "../../utils/utils";
import styles from './OrderUnit.module.css';
import { v4 as uuidv4 } from 'uuid';
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { NavigateFunction, useNavigate } from "react-router-dom";
import OrderUnitThumbnail from "../OrderUnitThumbnail/OrderUnitThumbnail";
import { MAX_VISIBLE_INGREDIENTS_IN_ORDER, ordersStatus } from "../../utils/const";
import { FC, useMemo } from "react";
import { TOrdersFeed } from "../../services/types/types";
import { RootState } from "../../services/types/types";

interface IOrderUnit {
  itemInfo: TOrdersFeed,
  page: string,
  withStatus?: boolean,
};

const OrderUnit: FC<IOrderUnit> = ({ itemInfo, page, withStatus }) => {

  const ingredientsList = useSelector((store: RootState) => store.ingredientsListReducer, shallowEqual);
  const orderSum = useMemo(() => {
    let sum = 0;
    itemInfo.ingredients.forEach(element => {
      const ingredientEl = ingredientsList.content.find(ingr => ingr._id === element);
      if(ingredientEl){
        sum+=ingredientEl.price;
      }
    });
    return sum;
  },
    [ingredientsList.content, itemInfo.ingredients]
  );

  const navigation: NavigateFunction = useNavigate();
  const orderDate: Date = new Date(Date.parse(itemInfo.createdAt));
  const today: Date = new Date();
  const differenceDate = diffDateInDays(orderDate.getDate(), today.getDate());

  const orderIngridients = useMemo(()=>{
    return itemInfo.ingredients.map((element, index) => {
      const uuid = uuidv4(); {/* А вот тут все таки uuid - так как здесь могут попасться полностью идентичные экземпляры */}
      const ingredientEl = ingredientsList.content.find(ingr => ingr._id === element);
      let el = null;
      if(ingredientEl){
        if(index < MAX_VISIBLE_INGREDIENTS_IN_ORDER){
          el = (
            <li key={uuid} className={`${styles.ingridientsImageContainer} ${styles.roundedBorder} p-1`}>
              <OrderUnitThumbnail image={ingredientEl.image} name={ingredientEl.name} />
            </li>
          );
        }else if(index===MAX_VISIBLE_INGREDIENTS_IN_ORDER){
          el =  (
            <li key={uuid} className={`${styles.ingridientsImageContainer} p-1`}>
              <OrderUnitThumbnail image={ingredientEl.image} name={ingredientEl.name} />
              <div className={styles.mask}></div>
              <p className={`${styles.remainsQty} ${styles.mainPosition} text text_type_main-small`}>+{itemInfo.ingredients.length-5}</p>
            </li>
          );
        }
      }
      return el;
    })
  },
    [ingredientsList.content, itemInfo.ingredients]
  );

  return (
    <li className={`${styles.content} p-6`} onClick={()=>{
      navigation(`${page}/${itemInfo._id}`, {state:{modal:true}});
    }}>
      <p className={`${styles.title} text text_type_digits-default`}>#{itemInfo.number}
        <span className={`${styles.updatedAt} text text_type_main-default text_color_inactive`}>
          {`${diffToString(differenceDate)},${orderDate.getHours()}:${orderDate.getMinutes()}
          i-GMT${orderDate.getTimezoneOffset()>0?`+${orderDate.getTimezoneOffset()/60}`
          :orderDate.getTimezoneOffset()/60}`}</span></p>
      <div>
        <p className={`text text_type_main-medium`}>{itemInfo.name}</p>
        {withStatus&&
          <p className={`text text_type_main-small pt-2 pb-5 ${styles[itemInfo.status]}`}>{ordersStatus[itemInfo.status as keyof typeof ordersStatus]}</p>
        }
      </div>
      <div className={styles.bottom}>
        <ul className={styles.list}>
          {orderIngridients.map(element=>element)}
        </ul>
        <div className={styles.total}>
          <p className='text text_type_digits-default'>{orderSum}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </li>
  );
}

export default OrderUnit;
