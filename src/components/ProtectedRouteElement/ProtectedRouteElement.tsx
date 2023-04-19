import PropTypes from 'prop-types';
import { Navigate, useLocation } from 'react-router-dom';
import { LOGIN_PAGE } from '../../utils/const';
import { getCookie } from '../../utils/utils';

const ProtectedRouteElement = ({element}) =>{

  const location = useLocation();

  const isLogin = getCookie('refreshToken');

  return isLogin ? element : <Navigate to={LOGIN_PAGE} state={{prev: location.pathname}} replace={true}/>;

}

ProtectedRouteElement.propTypes = {
  element: PropTypes.element.isRequired,
};

export default ProtectedRouteElement
