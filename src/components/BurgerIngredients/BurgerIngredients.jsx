import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './BurgerIngredients.module.css'
import { useMemo, useState, useRef, useEffect } from 'react';
import IngridientType from '../IngridientType/IngridientType';
import Modal from '../Modal/Modal';
import IngridientDetails from '../IngredientDetails/IngredientDetails';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { closeIngridient } from '../../services/actions/ingridientObj';
import { addIngridientToConstructor } from '../../services/actions/constructorList';
import { incrimentIngridientCount } from '../../services/actions/ingridientList';

const BurgerIngredients = () => {
  const [current, setCurrent] = useState('bun');
  const dispatch = useDispatch();
  const bunsRef = useRef(null);
  const saucesRef = useRef(null);
  const mainsRef = useRef(null);

  const { ingridientsList, modal } = useSelector(store => ({
    ingridientsList: store.ingridientsListReducer,
    modal: store.ingridientObjReducer,
  }), shallowEqual);

  const { constructorList } = useSelector(store => ({
    constructorList: store.constructorListReducer,
  }), shallowEqual);

  const buns = useMemo(
    () =>
    ingridientsList.filter((item) => {
        return item.type === "bun"
      }),
    [ingridientsList]
  );

  const sauce = useMemo(
    () =>
    ingridientsList.filter((item) => {
        return item.type === "sauce"
      }),
    [ingridientsList]
  );

  const main = useMemo(
    () =>
    ingridientsList.filter((item) => {
        return item.type === "main"
      }),
    [ingridientsList]
  );

  const setCurrentScroll = (elToScroll) =>{
    elToScroll.current.scrollIntoView({ block: 'start',  behavior: 'smooth' });
  }

  const scrollHandler = (evt)=>{
    const parentTop = evt.target.offsetTop;
    const scrollSize = evt.target.scrollTop;
    const bunsTop = Math.abs(bunsRef.current.offsetTop - scrollSize - parentTop);
    const saucesTop = Math.abs(saucesRef.current.offsetTop - scrollSize - parentTop);
    const mainsTop = Math.abs(mainsRef.current.offsetTop - scrollSize - parentTop);
    const minCoord = Math.min(bunsTop, saucesTop, mainsTop)

    if(minCoord===bunsTop){
      setCurrent('bun');
    }else if(minCoord===saucesTop){
      setCurrent('sauce');
    }else{
      setCurrent('main');
    }
  }

  const closeModal = ()=>{
    dispatch(closeIngridient());
  }

  useEffect(()=>{
    if(constructorList.bun===null && buns.length>0){
      dispatch(addIngridientToConstructor(buns[0]));
      dispatch(incrimentIngridientCount(buns[0]));
    }
  });

  return (
    <section className={`mt-10`}>
      <h1 className='text text_type_main-large'>Соберите бургер</h1>
      <div className={`mt-5 ${styles.contentWrapper}`}>
        <Tab value="bun" active={current === 'bun'} onClick={()=>setCurrentScroll(bunsRef)}>
          Булки
        </Tab>
        <Tab value="sauce" active={current === 'sauce'} onClick={()=>setCurrentScroll(saucesRef)}>
          Соусы
        </Tab>
        <Tab value="main" active={current === 'main'} onClick={()=>setCurrentScroll(mainsRef)}>
          Начинки
        </Tab>
      </div>
      <div className={`${styles.content} mt-10`} onScroll={scrollHandler}>
        <IngridientType data={buns} title='Булки' anchor={bunsRef} />
        <IngridientType data={sauce} title='Соусы' anchor={saucesRef} />
        <IngridientType data={main} title='Начинки' anchor={mainsRef} />
      </div>
      {modal._id !== '' &&
        <Modal close={closeModal}>
          <IngridientDetails/>
        </Modal>
      }
    </section>
  )
}

export default BurgerIngredients;
