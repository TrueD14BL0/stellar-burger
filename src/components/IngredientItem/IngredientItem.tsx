import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './IngridientItem.module.css'
import { useDrag } from 'react-dnd';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { PAGES } from '../../utils/const';
import { TIngredient } from '../../services/types/types';
import { FC } from 'react';

interface IIngredientItem{
  item: TIngredient,
}

const IngredientItem: FC<IIngredientItem> = ({item}) => {
  const [, dragRef] = useDrag({type:'ingridient',
                              item});
  const navigation: NavigateFunction = useNavigate();

  return (
    <li ref={dragRef} className={styles.ingridient_card} onClick={()=>{
      navigation(`${PAGES.INGREDIENTS_PAGE}/${item._id}`, {state:{modal:true}});
    }}>
      <img src={item.image} alt={item.image} className="pb-1 ml-4 mr-4"></img>
      {item.qty
        ?<Counter count={item.qty} size="default" extraClass="m-1" />
        : null
      }
      <h3 className={`pb-2 text text_type_digits-default ${styles.price}`}>
        {item.price} <CurrencyIcon type='primary'/>
      </h3>
      <span className={`text text_type_main-default ${styles.title}`}>
        {item.name}
      </span>
    </li>
  );
}

export default IngredientItem;
