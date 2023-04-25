import { Navigate, useLocation } from 'react-router-dom';
import { PAGES } from '../../utils/const';
import { getCookie } from '../../utils/utils';
import { FC, ReactElement } from "react";

interface IProtectedRouteElement {
  element: ReactElement,
};

const ProtectedRouteElement: FC<IProtectedRouteElement> = ({element}) =>{

  const location = useLocation();

  const isLogin = getCookie('refreshToken');

  return isLogin ? element : <Navigate to={PAGES.LOGIN_PAGE} state={{prev: location.pathname}} replace={true}/>;

}

export default ProtectedRouteElement
