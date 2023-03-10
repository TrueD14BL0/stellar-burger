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

function App() {

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getIngridientsList());
  }, [])

  return (
    <BrowserRouter>
      <AppHeader />
      <Routes>
        <Route exact path="/" element={<StartPage />}>
          <Route path="ingredients/:id" element={<IngridientsPage />}/>
        </Route>
        <Route path="/login" element={<UnauthRouteElement element={<LoginPage />}/>}/>
        <Route path="/logout" element={<LogoutPage />}/>
        <Route path="/register" element={<UnauthRouteElement element={<RegistrationPage />}/>}/>
        <Route path="/forgot-password" element={<UnauthRouteElement element={<ForgotPassword />}/>}/>
        <Route path="/reset-password" element={<UnauthRouteElement element={<ResetPassword />}/>}/>
        <Route path="/profile" element={<ProtectedRouteElement element={<AccountPage/>}/>}>
          <Route path="" element={<ProfilePage/>}/>
          <Route path="orders" element={<></>}/>
        </Route>
        <Route path="*" element={<NotFoundPage />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
