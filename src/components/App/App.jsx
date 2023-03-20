import AppHeader from '../AppHeader/AppHeader';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getIngridientsList } from '../../services/actions/ingridientList';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from '../../pages/LoginPage/LoginPage';
import RegistrationPage from '../../pages/RegistrationPage/RegistrationPage';
import ForgotPassword from '../../pages/ForgotPassword/ForgotPassword';
import ResetPassword from '../../pages/ResetPassword/ResetPassword';
import StartPage from '../../pages/StartPage/StartPage';
import AccountPage from '../../pages/AccountPage/AccountPage';
import ProfilePage from '../../pages/ProfilePage/ProfilePage';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';
import ProtectedRouteElement from '../ProtectedRouteElement/ProtectedRouteElement';
import LogoutPage from '../../pages/LogoutPage/LogoutPage';
import IngridientsPage from '../../pages/IngridientsPage/IngridientsPage';
import UnauthRouteElement from '../UnauthRouteElement/UnauthRouteElement';
import { ANOTHER_PAGE, FEED_PAGE, FORGOT_PAGE, INGRIDIENTS_PAGE, LOGIN_PAGE, LOGOUT_PAGE, MAIN_PAGE, ORDERS_PAGE, PROFILE_PAGE, REGISTER_PAGE, RESET_PAGE } from '../../utils/const';
import FeedPage from '../../pages/FeedPage/FeedPage';
import OrderDetailsPage from '../../pages/OrderDetailsPage/OrderDetailsPage';
import UserOrderFeed from '../UserOrderFeed/UserOrderFeed';

function App() {

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getIngridientsList());
  }, [])

  return (
    <BrowserRouter>
      <AppHeader />
      <Routes>
        <Route path={MAIN_PAGE} element={<StartPage />}>
          <Route path={`${INGRIDIENTS_PAGE}/:id`} element={<IngridientsPage />}/>
        </Route>
        <Route path={LOGIN_PAGE} element={<UnauthRouteElement element={<LoginPage />}/>}/>
        <Route path={LOGOUT_PAGE} element={<LogoutPage />}/>
        <Route path={REGISTER_PAGE} element={<UnauthRouteElement element={<RegistrationPage />}/>}/>
        <Route path={FORGOT_PAGE} element={<UnauthRouteElement element={<ForgotPassword />}/>}/>
        <Route path={RESET_PAGE} element={<UnauthRouteElement element={<ResetPassword />}/>}/>
        <Route path={PROFILE_PAGE} element={<ProtectedRouteElement element={<AccountPage/>}/>}>
          <Route path="" element={<ProfilePage/>}/>
          <Route path={ORDERS_PAGE} element={<UserOrderFeed />}>
            <Route path={`${ORDERS_PAGE}/:id`} element={<></>}/>
          </Route>
        </Route>
        <Route path={FEED_PAGE} element={<FeedPage />}>
          <Route path={`${FEED_PAGE}/:id`} element={<OrderDetailsPage />}/>
        </Route>
        <Route path={ANOTHER_PAGE} element={<NotFoundPage />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
