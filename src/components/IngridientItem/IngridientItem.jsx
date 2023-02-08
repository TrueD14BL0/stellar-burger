import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux';
import { openIngridient } from '../../services/actions/ingridientObj';
import styles from './IngridientItem.module.css'
import PropTypes from 'prop-types';
import { useDrag } from 'react-dnd';

const IngridientItem = ({item}) => {

  const dispatch = useDispatch();
  const [, dragRef] = useDrag({type:'ingridient',
                              item});

  return (
    <li ref={dragRef} className={styles.ingridient_card} onClick={()=>dispatch(openIngridient(item))}>
      <img src={item.image} alt={item.image} className="pb-1 ml-4 mr-4"></img>
      {item.__v
        ?<Counter count={item.__v} size="default" extraClass="m-1" />
        : null
      }
      <h3 className={`pb-2 text text_type_digits-default ${styles.price}`}>
        {item.price} <CurrencyIcon />
      </h3>
      <span className={`text text_type_main-default ${styles.title}`}>
        {item.name}
      </span>
    </li>
  );
}

IngridientItem.propTypes = {
  item: PropTypes.object.isRequired,
};


export default IngridientItem;
