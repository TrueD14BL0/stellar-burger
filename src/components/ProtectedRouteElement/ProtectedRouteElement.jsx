import PropTypes from 'prop-types';
import { Navigate, useLocation } from 'react-router-dom';
import { getCookie } from '../utils/utils';

const ProtectedRouteElement = ({element}) =>{

  let isLogin = false;
  const location = useLocation();

  if(getCookie('refreshToken')){
    isLogin = true;
  };

  return isLogin ? element : <Navigate to="/login" state={{prev: location.pathname}} replace={true}/>;

}

ProtectedRouteElement.propTypes = {
  element: PropTypes.element.isRequired,
};

export default ProtectedRouteElement
