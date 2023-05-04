import { Navigate } from 'react-router-dom';
import { PAGES } from '../../utils/const';
import { getCookie } from '../../utils/utils';

import { FC, ReactElement } from "react";

interface IUnauthRouteElement {
  element: ReactElement,
};

const UnauthRouteElement: FC<IUnauthRouteElement> = ({element}) =>{
  const isLogin = getCookie('refreshToken');
  return !isLogin ? element : <Navigate to={PAGES.MAIN_PAGE} replace={true}/>;
}

export default UnauthRouteElement;
