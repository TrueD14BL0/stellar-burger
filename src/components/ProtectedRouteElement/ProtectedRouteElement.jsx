import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { getCookie } from '../utils/utils';

const ProtectedRouteElement = ({element}) =>{

  let isLogin = false;

  if(getCookie('refreshToken')){
    isLogin = true;
  };

  return isLogin ? element : <Navigate to="/login" replace/>;

}

ProtectedRouteElement.propTypes = {
  element: PropTypes.element.isRequired,
};

export default ProtectedRouteElement
