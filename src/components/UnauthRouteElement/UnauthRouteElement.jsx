import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { getCookie } from '../utils/utils';

const UnauthRouteElement = ({element}) =>{
  const isLogin = getCookie('refreshToken');
  return !isLogin ? element : <Navigate to="/" replace={true}/>;
}

UnauthRouteElement.propTypes = {
  element: PropTypes.element.isRequired,
};

export default UnauthRouteElement;
