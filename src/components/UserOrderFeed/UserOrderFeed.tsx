import { FC, useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Location, NavigateFunction, Outlet, Params, useLocation, useNavigate, useParams } from "react-router-dom";
import { CLOSE_USER_ORDERS_SOCKET, INIT_USER_ORDERS_SOCKET, TOrderSocketActions } from "../../services/actions/OrdersActions";
import { PAGES } from "../../utils/const";
import Modal from "../Modal/Modal";
import OrderDetailInfo from "../OrderDetailInfo/OrderDetailInfo";
import OrderUnit from "../OrderUnit/OrderUnit";
import styles from './UserOrderFeed.module.css'
import { AppThunk, RootState, TOrdersFeed } from "../../services/types/types";

const UserOrderFeed: FC = () => {

  const params: Readonly<Params<string>> = useParams();
  const location: Location = useLocation();
  const navigation: NavigateFunction = useNavigate();
  const dispatch: AppThunk = useDispatch();

  const modal: boolean = params.id&&location.state&&location.state.modal;

  const connected: boolean = useSelector((store: RootState) => (store.userOrdersReducer.connected), shallowEqual);
  const userOrders: TOrdersFeed[] = useSelector((store: RootState) => (store.userOrdersReducer.orders), shallowEqual);

  useEffect(() => {
    if(!connected){
      dispatch({ type: INIT_USER_ORDERS_SOCKET });
    }
    return () => {
      dispatch({ type: CLOSE_USER_ORDERS_SOCKET });
    };
  }, []);

  const closeModal: () => void = ()=>{
    navigation(`${PAGES.PROFILE_PAGE}/${PAGES.ORDERS_PAGE}`);
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
                  <OrderUnit itemInfo={item} key={item._id} page={`${PAGES.PROFILE_PAGE}/${PAGES.ORDERS_PAGE}`} withStatus={true} />
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
