import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import BurgerConstructorBottom from '../BurgerConstructorBottom/BurgerConstructorBottom';
import styles from './BurgerConstructor.module.css';
import { useDrop } from 'react-dnd/dist/hooks';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { addIngridientToConstructor, delIngridientFromConstructor } from '../../services/actions/constructorList';
import { decrimentIngridientCount, incrimentIngridientCount } from '../../services/actions/ingridientList';


const BurgerConstructor = () =>{

  const dispatch = useDispatch();
  const { constructorList } = useSelector(store => ({
    constructorList: store.constructorListReducer,
  }), shallowEqual);

  const handleAddIngridient = (item)=>{
    if(item.type === 'bun'){
      if(item !== constructorList.bun){
        dispatch(incrimentIngridientCount(item));
        dispatch(decrimentIngridientCount(constructorList.bun));
      }
    }else{
      dispatch(incrimentIngridientCount(item));
    }
    dispatch(addIngridientToConstructor(item));
  }

  const [, dropTarget] = useDrop({
                                    accept:'ingridient',
                                    drop(item) {
                                      handleAddIngridient(item);
                                    },
                                  });

  const handleDel = (index, item)=>{
    dispatch(delIngridientFromConstructor(index));
    dispatch(decrimentIngridientCount(item));
  }

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
          constructorList.content.map((item, index)=>{
            return (
              <div className={styles.elementContent} key={index}>
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
          )})
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
