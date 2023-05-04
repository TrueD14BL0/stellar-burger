import { FC, useEffect } from 'react';
import { shallowEqual } from "react-redux";
import { NavigateFunction, useNavigate } from "react-router-dom";
import Loader from '../../components/Loader/Loader';
import { deleteCookie, getCookie } from "../../utils/utils";
import { logoutAction } from '../../services/actions/logoutActions';
import { PAGES } from '../../utils/const';
import { useAppDispatch, useAppSelector } from '../../services/hooks/customHooks';

const LogoutPage: FC = () => {

  const refreshToken: string|undefined = getCookie('refreshToken');

  const dispatch = useAppDispatch();
  const navigate: NavigateFunction = useNavigate();

  const { logoutData } = useAppSelector(store => ({
    logoutData: store.logoutReducer,
  }), shallowEqual);

  useEffect(()=>{
    if(refreshToken){
      dispatch(logoutAction());
    }
  },[]);

  useEffect(()=>{
    if(logoutData&&logoutData.status){
      deleteCookie('token');
      deleteCookie('refreshToken');
      navigate(PAGES.LOGIN_PAGE, {replace:true})
    }
  },[logoutData]);

  return (<Loader />);

}

export default LogoutPage
