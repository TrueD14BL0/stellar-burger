import { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteCookie, getCookie } from "../../components/utils/utils";
import { logoutAction } from '../../services/actions/logoutActions';

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
      navigate('/', {replace:true})
    }
  },[logoutData]);

  return <h1>типа беда</h1>;

}

export default LogoutPage
