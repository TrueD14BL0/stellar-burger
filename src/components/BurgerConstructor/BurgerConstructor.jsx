import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import BurgerConstructorBottom from '../BurgerConstructorBottom/BurgerConstructorBottom';
import styles from './BurgerConstructor.module.css';
import { useDrop } from 'react-dnd/dist/hooks';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { addIngridientToConstructor, delIngridientFromConstructor } from '../../services/actions/constructorList';


const BurgerConstructor = () =>{

  const dispatch = useDispatch();
  const { constructorList } = useSelector(store => ({
    constructorList: store.constructorListReducer,
  }), shallowEqual);

  const [, dropTarget] = useDrop({
                                    accept:'ingridient',
                                    drop(item) {
                                        dispatch(addIngridientToConstructor(item));
                                    },
                                  });

  const handleDel = (index)=>{
    dispatch(delIngridientFromConstructor(index));
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
                  handleClose={()=>handleDel(index)}
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
