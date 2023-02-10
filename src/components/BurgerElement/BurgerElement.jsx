import styles from './BurgerElement.module.css'
import PropTypes from 'prop-types';
import { burgerIngredientProps } from '../../utils/propTypes';
import { useDispatch } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';
import { delIngridientFromConstructor, swapIngridient } from '../../services/actions/constructorList';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const BurgerElement = ({index, item}) =>{

  const dispatch = useDispatch();
  const [{isDrag}, dragRef] = useDrag({
    type:'constructor_ingridient',
    item: {index},
    collect: monitor => ({
      isDrag: monitor.isDragging(),
    })
  });
  const [{isOver}, dropRef] = useDrop({
    accept:'constructor_ingridient',
    drop(dropElIdex) {
      dispatch(swapIngridient(dropElIdex, {index}));
    },
    collect: monitor =>({
      isOver: monitor.isOver()
    }),
  });
  const handleDel = (index, item)=>{
    dispatch(delIngridientFromConstructor(item, index));
  }

  const style = isOver ? styles.highlighted : null;

  return (
    !isDrag &&
    <div className={`${styles.elementContent} ${style}`} ref={(node)=>dragRef(dropRef(node))}>
      <div className={styles.dragBtn}>
        <DragIcon type="primary" />
      </div>
      <ConstructorElement
        isLocked={false}
        text={`${item.name}`}
        price={item.price}
        thumbnail={item.image}
        extraClass='ml-2'
        handleClose={()=>handleDel(index, item)}
      />
    </div>
  )
}

BurgerElement.propTypes = {
  item: burgerIngredientProps,
  index: PropTypes.number.isRequired,
};

export default BurgerElement;
