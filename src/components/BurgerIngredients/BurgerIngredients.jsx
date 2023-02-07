import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './BurgerIngredients.module.css'
import { useMemo, useState } from 'react';
import IngridientType from '../IngridientType/IngridientType';
import Modal from '../Modal/Modal';
import IngridientDetails from '../IngredientDetails/IngredientDetails';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { closeIngridient } from '../../services/actions/ingridientObj';

const BurgerIngredients = () => {
  const [current, setCurrent] = useState('bun');
  const dispatch = useDispatch();

  const { ingridientsList, modal } = useSelector(store => ({
    ingridientsList: store.ingridientsListReducer,
    modal: store.ingridientObjReducer,
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

  const elToScroll = document.getElementById(current);
  if(elToScroll){
    elToScroll.scrollIntoView({ block: 'start',  behavior: 'smooth' });
  }

  const closeModal = ()=>{
    dispatch(closeIngridient());
  }

  return (
    <section className={`mt-10`}>
      <h1 className='text text_type_main-large'>Соберите бургер</h1>
      <div className={`mt-5 ${styles.contentWrapper}`}>
        <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="main" active={current === 'main'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <div className={`${styles.content} mt-10`}>
        <IngridientType data={buns} title='Булки' anchor='bun' />
        <IngridientType data={sauce} title='Соусы' anchor='sauce' />
        <IngridientType data={main} title='Начинки' anchor='main' />
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
