import AppHeader from '../AppHeader/AppHeader';
import { FC, useEffect } from 'react';
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
import { PAGES } from '../../utils/const';
import FeedPage from '../../pages/FeedPage/FeedPage';
import OrderDetailsPage from '../../pages/OrderDetailsPage/OrderDetailsPage';
import UserOrderFeed from '../UserOrderFeed/UserOrderFeed';
import { useAppDispatch } from '../../services/hooks/customHooks';

const App:FC = () => {

  const dispatch = useAppDispatch();

  useEffect(()=>{
    dispatch(getIngridientsList());
  }, [])

  return (
    <>
      <BrowserRouter>
        <AppHeader />
        <Routes>
          <Route path={PAGES.MAIN_PAGE} element={<StartPage />}>
            <Route path={`${PAGES.INGREDIENTS_PAGE}/:id`} element={<IngridientsPage />} />
          </Route>
          <Route path={PAGES.LOGIN_PAGE} element={<UnauthRouteElement element={<LoginPage />} />} />
          <Route path={PAGES.LOGOUT_PAGE} element={<LogoutPage />} />
          <Route path={PAGES.REGISTER_PAGE} element={<UnauthRouteElement element={<RegistrationPage />} />} />
          <Route path={PAGES.FORGOT_PAGE} element={<UnauthRouteElement element={<ForgotPassword />} />} />
          <Route path={PAGES.RESET_PAGE} element={<UnauthRouteElement element={<ResetPassword />} />} />
          <Route path={PAGES.PROFILE_PAGE} element={<ProtectedRouteElement element={<AccountPage />} />}>
            <Route path="" element={<ProfilePage />} />
            <Route path={PAGES.ORDERS_PAGE} element={<UserOrderFeed />}>
              <Route path={`:id`} element={<OrderDetailsPage />} />
            </Route>
          </Route>
          <Route path={PAGES.FEED_PAGE} element={<FeedPage />}>
            <Route path={`${PAGES.FEED_PAGE}/:id`} element={<OrderDetailsPage />} />
          </Route>
          <Route path={PAGES.ANOTHER_PAGE} element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
