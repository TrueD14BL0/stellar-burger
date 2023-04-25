import { shallowEqual, useSelector } from "react-redux";
import { Location, NavigateFunction, Params, useLocation, useNavigate, useParams } from "react-router-dom";
import { PAGES } from "../../utils/const";
import Modal from "../Modal/Modal";
import OrderDetailInfo from "../OrderDetailInfo/OrderDetailInfo";
import OrderUnit from "../OrderUnit/OrderUnit";
import styles from './OrderFeed.module.css'
import { RootState } from "../../services/types/types";
import { FC } from "react";

const OrderFeed: FC = () => {

  const params: Readonly<Params<string>> = useParams();
  const location: Location = useLocation();
  const navigation: NavigateFunction = useNavigate();
  const modal: boolean = params.id&&location.state&&location.state.modal;
  const orders = useSelector((store: RootState) => store.ordersReducer.orders, shallowEqual);
  const connected = useSelector((store: RootState) => store.ordersReducer.connected, shallowEqual);

  const closeModal = ()=>{
    navigation(PAGES.FEED_PAGE);
  }

  return !connected ?
    null :
    (
      <>
        <ul className={`${styles.content} pr-2`}>
          {orders.map(
            (item) => {
              return(
                <OrderUnit itemInfo={item} key={item._id} page={PAGES.FEED_PAGE}/>
              )
            }
          )}
        </ul>
        {modal &&
          <Modal close={closeModal}>
            <OrderDetailInfo />
          </Modal>}
      </>
    );
}

export default OrderFeed;
