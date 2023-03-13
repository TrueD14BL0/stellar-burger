import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { MAIN_PAGE } from '../../utils/const';
import { getCookie } from '../../utils/utils';

const UnauthRouteElement = ({element}) =>{
  const isLogin = getCookie('refreshToken');
  return !isLogin ? element : <Navigate to={MAIN_PAGE} replace={true}/>;
}

UnauthRouteElement.propTypes = {
  element: PropTypes.element.isRequired,
};

export default UnauthRouteElement;
