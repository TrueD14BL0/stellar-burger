import styles from './BurgerElement.module.css'
import { useDispatch } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { TDNDObj, TIngredient } from '../../services/types/types';
import { FC } from 'react';
import { delIngredientFromConstructor, swapIngredient } from '../../services/actions/constructorList';

interface IBurgerElement {
  index: number,
  item: TIngredient
}

const BurgerElement: FC<IBurgerElement> = ({index, item}) =>{

  const dispatch = useDispatch();
  const [{isDrag}, dragRef] = useDrag({
    type:'constructor_ingredient',
    item: {index},
    collect: monitor => ({
      isDrag: monitor.isDragging(),
    })
  });
  const [{isOver}, dropRef] = useDrop({
    accept:'constructor_ingredient',
    drop(dropElIdex: TDNDObj) {
      dispatch(swapIngredient(dropElIdex, {index}));
    },
    collect: monitor =>({
      isOver: monitor.isOver()
    }),
  });
  const handleDel = (index: number, item: TIngredient)=>{
    dispatch(delIngredientFromConstructor(item, index));
  }

  const style = isOver ? styles.highlighted : null;

  return (
    !isDrag ?
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
    : null
  )
}

export default BurgerElement;
