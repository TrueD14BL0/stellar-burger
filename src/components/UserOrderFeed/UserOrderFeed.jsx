import { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { CLOSE_USER_ORDERS_SOCKET, INIT_USER_ORDERS_SOCKET } from "../../services/actions/OrdersActions";
import { ORDERS_PAGE } from "../../utils/const";
import Modal from "../Modal/Modal";
import OrderDetailInfo from "../OrderDetailInfo/OrderDetailInfo";
import OrderUnit from "../OrderUnit/OrderUnit";
import styles from './UserOrderFeed.module.css'

const UserOrderFeed = () => {

  const params = useParams();
  const location = useLocation();
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const modal = params.id&&location.state&&location.state.modal;
  const { userOrders, connected } = useSelector(store => ({
    userOrders: store.userOrdersReducer.orders,
    connected: store.userOrdersReducer.connected,
  }), shallowEqual);

  useEffect(() => {
    if(!connected){
      dispatch({ type: INIT_USER_ORDERS_SOCKET });
    }
    return () => {
      dispatch({ type: CLOSE_USER_ORDERS_SOCKET });
    };
  }, []);

  const closeModal = ()=>{
    navigation(ORDERS_PAGE);
  }

  return (!connected||!userOrders) ?
    (<></>) :
    (
      <>
        <ul className={`${styles.content} pr-2`}>
          {userOrders&&userOrders.map(
            (item) => {
              return(
                <OrderUnit itemInfo={item} key={item._id} />
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

export default UserOrderFeed;
