import PropTypes from 'prop-types';
import styles from './HeaderButton.module.css';
import { NavLink } from 'react-router-dom';

const HeaderButton = (props) => {
  const classes = `${styles.button} p-5 pt-4 pb-4`
  return (
    <NavLink
      to={props.linkTo}
      className={({ isActive }) => isActive ? `${styles.headerActiveBtn} ${classes}` : `${styles.headerInactiveBtn} ${classes}`}
    >
      {props.children}
      <p className='text text_type_main-default'>{props.text}</p>
    </NavLink>
  )
}

HeaderButton.propTypes = {
  text: PropTypes.string.isRequired,
  linkTo: PropTypes.string.isRequired,
  children: PropTypes.element,
};

export default HeaderButton;
