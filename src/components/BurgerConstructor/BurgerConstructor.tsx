import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import BurgerConstructorBottom from '../BurgerConstructorBottom/BurgerConstructorBottom';
import styles from './BurgerConstructor.module.css';
import { useDrop } from 'react-dnd/dist/hooks';
import { addIngredientToConstructor } from '../../services/actions/constructorList';
import { decrimentIngridientCount } from '../../services/actions/ingridientList';
import BurgerElement from '../BurgerElement/BurgerElement';
import { FC } from 'react';
import { TIngredient } from '../../services/types/types';
import { useAppDispatch, useAppSelector } from '../../services/hooks/customHooks';
import { shallowEqual } from 'react-redux';

const BurgerConstructor: FC = () =>{

  const dispatch = useAppDispatch();

  const { constructorList } = useAppSelector(store => ({
    constructorList: store.constructorListReducer,
  }), shallowEqual);

  const handleAddIngredient = (item: TIngredient)=>{
    if(item.type === 'bun'){
      if(item !== constructorList.bun){
        if(constructorList.bun){
          dispatch(decrimentIngridientCount(constructorList.bun))
        };
      }
    }
    dispatch(addIngredientToConstructor(item));
  }

  const [, dropTarget] = useDrop(
    {
      accept:'ingredient',
      drop(item: TIngredient) {
        handleAddIngredient(item);
      },
    }
  );

  return (
    <div className='mt-25 pl-4' ref={dropTarget}>
      {constructorList.bun &&
        (
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${constructorList.bun.name} (верх)`}
            price={constructorList.bun.price}
            thumbnail={constructorList.bun.image}
            extraClass='ml-8 mb-4'
          />
        )
      }
      <div className={styles.contentWrapper}>
        {constructorList.content &&
          constructorList.content.map((item, index)=>
              (<BurgerElement item={item} index={index} key={item.key}/>)
            )
        }
      </div>
      {constructorList.bun &&
        (
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${constructorList.bun.name} (низ)`}
            price={constructorList.bun.price}
            thumbnail={constructorList.bun.image}
            extraClass='ml-8 mb-4'
          />
        )
      }
      <BurgerConstructorBottom/>
    </div>
  );
}

export default BurgerConstructor;
