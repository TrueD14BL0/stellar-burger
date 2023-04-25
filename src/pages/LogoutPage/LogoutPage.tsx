import { FC, useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { NavigateFunction, useNavigate } from "react-router-dom";
import Loader from '../../components/Loader/Loader';
import { deleteCookie, getCookie } from "../../utils/utils";
import { logoutAction } from '../../services/actions/logoutActions';
import { AppThunk, RootState } from '../../services/types/types';
import { PAGES } from '../../utils/const';

const LogoutPage: FC = () => {

  const refreshToken: string|undefined = getCookie('refreshToken');

  const dispatch:AppThunk = useDispatch();
  const navigate: NavigateFunction = useNavigate();

  const { logoutData } = useSelector((store: RootState) => ({
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
