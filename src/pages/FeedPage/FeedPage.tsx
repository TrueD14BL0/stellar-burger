import { FC, useEffect } from 'react';
import { Location, Outlet, Params, useLocation, useParams } from 'react-router-dom';
import MainContent from '../../components/MainContent/MainContent';
import OrderFeed from '../../components/OrderFeed/OrderFeed';
import OrdersInfo from '../../components/OrdersInfo/OrdersInfo';
import { CLOSE_ORDERS_SOCKET, INIT_ORDERS_SOCKET } from '../../services/actions/OrdersActions';
import { MAIN_CONTENT_GAP } from '../../utils/const';
import styles from './FeedPage.module.css';
import { useAppDispatch } from '../../services/hooks/customHooks';

const FeedPage: FC = () => {
  const dispatch = useAppDispatch();
  const location: Location = useLocation();
  const params: Readonly<Params<string>> = useParams();

  useEffect(() => {
    dispatch({ type: INIT_ORDERS_SOCKET });
    return () => {
      dispatch({ type: CLOSE_ORDERS_SOCKET });
    };
  }, []);

  return (params.id&&!(location.state&&location.state.modal))?
    (<Outlet/>):(
    <>
      <h1 className={`text text_type_main-large ${styles.title} mt-10 mb-5`}>Лента заказов</h1>
      <MainContent gap={MAIN_CONTENT_GAP.MAIN_CONTENT_GAP_FEED}>
        <OrderFeed />
        <OrdersInfo />
      </MainContent>
    </>
  );
}

export default FeedPage;
