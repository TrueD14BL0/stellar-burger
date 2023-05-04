import styles from "./OrderDetailInfoUnit.module.css";
import OrderUnitThumbnail from "../OrderUnitThumbnail/OrderUnitThumbnail";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC } from "react";

interface IOrderDetailInfoUnit {
  name: string,
  url: string,
  qty: number,
  price: number,
}

const OrderDetailInfoUnit: FC<IOrderDetailInfoUnit> = ({name, url, qty, price}) => {

  return (
    <div className={styles.content}>
      <OrderUnitThumbnail image={url} name={name} />
      <p className={`${styles.name} text text_type_main-default`}>{name}</p>
      <p className={`${styles.total} text text_type_digits-default`}>{qty} x {price}<span><CurrencyIcon type="primary" /></span></p>
    </div>
  );

}

export default OrderDetailInfoUnit;
