import { FC, useEffect } from "react";
import { shallowEqual } from "react-redux";
import { Location, NavigateFunction, Outlet, Params, useLocation, useNavigate, useParams } from "react-router-dom";
import { CLOSE_USER_ORDERS_SOCKET, INIT_USER_ORDERS_SOCKET, ON_USER_ERROR_SOCKET } from "../../services/actions/OrdersActions";
import { PAGES, WS_ERROR_WRONG_USER } from "../../utils/const";
import Modal from "../Modal/Modal";
import OrderDetailInfo from "../OrderDetailInfo/OrderDetailInfo";
import OrderUnit from "../OrderUnit/OrderUnit";
import styles from './UserOrderFeed.module.css'
import { TOrdersFeed } from "../../services/types/types";
import { useAppDispatch, useAppSelector } from "../../services/hooks/customHooks";
import { deleteCookie, getCookie, setTokenCookies } from "../../utils/utils";
import Api from "../Api/Api";

const UserOrderFeed: FC = () => {

  const params: Readonly<Params<string>> = useParams();
  const location: Location = useLocation();
  const navigation: NavigateFunction = useNavigate();
  const dispatch = useAppDispatch();

  const modal: boolean = params.id&&location.state&&location.state.modal;

  const error: any = useAppSelector(store => (store.userOrdersReducer.error), shallowEqual);
  const connected: boolean = useAppSelector(store => (store.userOrdersReducer.connected), shallowEqual);
  const userOrders: TOrdersFeed[] = useAppSelector(store => (store.userOrdersReducer.orders), shallowEqual);

  const initUserWs = () => {
    const token:string = getCookie('token')||'Bearer ';
    const payload:string = `?token=${token.replace('Bearer ','')}`;
    dispatch({ type: INIT_USER_ORDERS_SOCKET, payload: payload });
  }

  useEffect(() => {
    if(!connected){
      initUserWs();
    }
    return () => {
      dispatch({ type: CLOSE_USER_ORDERS_SOCKET });
    };
  }, []);

  useEffect(()=>{
    if(error){
      if(error===WS_ERROR_WRONG_USER){
        Api.getAccessToken(getCookie('refreshToken')||'')
        .then((data)=>{
          setTokenCookies(data.accessToken, data.refreshToken);
          initUserWs();
        })
        .catch((err: string)=>{
          deleteCookie('token');
          deleteCookie('refreshToken');
          dispatch({
            type: ON_USER_ERROR_SOCKET,
            payload: `First: ${error};\nSecond:${err}`
          });
        });
      }
    }
  }, [error])

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
