import PropTypes from 'prop-types';
import { Navigate, useLocation } from 'react-router-dom';
import { getCookie } from '../utils/utils';

const ProtectedRouteElement = ({element}) =>{

  const location = useLocation();

  const isLogin = getCookie('refreshToken');

  return isLogin ? element : <Navigate to="/login" state={{prev: location.pathname}} replace={true}/>;

}

ProtectedRouteElement.propTypes = {
  element: PropTypes.element.isRequired,
};

export default ProtectedRouteElement
