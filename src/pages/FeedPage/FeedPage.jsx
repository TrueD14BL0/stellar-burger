import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import MainContent from '../../components/MainContent/MainContent';
import OrderFeed from '../../components/OrderFeed/OrderFeed';
import OrdersInfo from '../../components/OrdersInfo/OrdersInfo';
import { CLOSE_ORDERS_SOCKET, INIT_ORDERS_SOCKET } from '../../services/actions/OrdersActions';
import { MAIN_CONTENT_GAP_FEED } from '../../utils/const';
import styles from './FeedPage.module.css';

const FeedPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const params = useParams();

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
      <MainContent gap={MAIN_CONTENT_GAP_FEED}>
        <OrderFeed />
        <OrdersInfo />
      </MainContent>
    </>
  );
}

export default FeedPage;
