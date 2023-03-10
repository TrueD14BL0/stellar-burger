import { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from '../../components/Loader/Loader';
import { deleteCookie, getCookie } from "../../utils/utils";
import { logoutAction } from '../../services/actions/logoutActions';
import { LOGIN_PAGE } from '../../utils/const';

const LogoutPage = () => {

  const refreshToken = getCookie('refreshToken');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { logoutData } = useSelector(store => ({
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
      navigate(LOGIN_PAGE, {replace:true})
    }
  },[logoutData]);

  return (<Loader />);

}

export default LogoutPage
