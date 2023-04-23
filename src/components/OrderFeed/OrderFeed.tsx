import { shallowEqual, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FEED_PAGE } from "../../utils/const";
import Modal from "../Modal/Modal";
import OrderDetailInfo from "../OrderDetailInfo/OrderDetailInfo";
import OrderUnit from "../OrderUnit/OrderUnit";
import styles from './OrderFeed.module.css'

const OrderFeed = () => {

  const params = useParams();
  const location = useLocation();
  const navigation = useNavigate();
  const modal = params.id&&location.state&&location.state.modal;
  const orders = useSelector(store => store.ordersReducer.orders, shallowEqual);
  const connected = useSelector(store => store.ordersReducer.connected, shallowEqual);

  const closeModal = ()=>{
    navigation(FEED_PAGE);
  }

  return !connected ?
    null :
    (
      <>
        <ul className={`${styles.content} pr-2`}>
          {orders.map(
            (item) => {
              return(
                <OrderUnit itemInfo={item} key={item._id} page={FEED_PAGE}/>
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