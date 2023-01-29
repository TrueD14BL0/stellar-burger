import PropTypes from 'prop-types';
import styles from './HeaderButton.module.css';

const HeaderButton = (props) => {
  const classes = `${styles.button} p-5 pt-4 pb-4 ${props.addedClass}`
  return (
    <button className={classes}>
      {props.children}
      <p className='text text_type_main-default'>{props.text}</p>
    </button>
  )
}

HeaderButton.propTypes = {
  text: PropTypes.string.isRequired,
  addedClass: PropTypes.string.isRequired,
  children: PropTypes.element,
};

export default HeaderButton;
