import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './IngridientItem.module.css'
import { useDrag } from 'react-dnd';
import { ingredientProps } from '../../utils/propTypes';
import { useNavigate } from 'react-router-dom';
import { INGRIDIENTS_PAGE } from '../../utils/const';

const IngridientItem = ({item}) => {
  const [, dragRef] = useDrag({type:'ingridient',
                              item});
  const navigation = useNavigate();

  return (
    <li ref={dragRef} className={styles.ingridient_card} onClick={()=>{
      navigation(`${INGRIDIENTS_PAGE}/${item._id}`, {state:{modal:true}});
    }}>
      <img src={item.image} alt={item.image} className="pb-1 ml-4 mr-4"></img>
      {item.qty
        ?<Counter count={item.qty} size="default" extraClass="m-1" />
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
  item: ingredientProps,
};


export default IngridientItem;
