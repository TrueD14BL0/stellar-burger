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

function App() {

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getIngridientsList());
  }, [])

  return (
    <BrowserRouter>
      <AppHeader />
      <Routes>
        <Route path="/" element={<StartPage/>}/>
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/register" element={<RegistrationPage />}/>
        <Route path="/forgot-password" element={<ForgotPassword />}/>
        <Route path="/reset-password" element={<ResetPassword />}/>
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
