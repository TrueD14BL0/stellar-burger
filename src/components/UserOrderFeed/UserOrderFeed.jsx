import { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { CLOSE_USER_ORDERS_SOCKET, INIT_USER_ORDERS_SOCKET } from "../../services/actions/OrdersActions";
import { ORDERS_PAGE, PROFILE_PAGE } from "../../utils/const";
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

  const connected = useSelector(store => (store.userOrdersReducer.connected), shallowEqual);
  const userOrders = useSelector(store => (store.userOrdersReducer.orders), shallowEqual);

  useEffect(() => {
    if(!connected){
      dispatch({ type: INIT_USER_ORDERS_SOCKET });
    }
    return () => {
      dispatch({ type: CLOSE_USER_ORDERS_SOCKET });
    };
  }, []);

  const closeModal = ()=>{
    navigation(`${PROFILE_PAGE}/${ORDERS_PAGE}`);
  }
  return (params.id&&!(location.state&&location.state.modal))?
    (<Outlet/>):
    (!connected||!userOrders) ?
      (<></>) :
      (
        <>
          <ul className={`${styles.content} pr-2`}>
            {userOrders&&userOrders.map(
              (item) => {
                return(
                  <OrderUnit itemInfo={item} key={item._id} page={`${PROFILE_PAGE}/${ORDERS_PAGE}`} withStatus={true} />
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
