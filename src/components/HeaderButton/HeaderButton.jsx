import './HeaderButton.css'
import PropTypes from 'prop-types';

const HeaderButton = (props) => {
  const classes = `header__button p-5 pt-4 pb-4 ${props.addedClass}`
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
