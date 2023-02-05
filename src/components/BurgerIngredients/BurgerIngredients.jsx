import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './BurgerIngredients.module.css'
import { useContext, useEffect, useMemo, useState } from 'react';
import IngridientType from '../IngridientType/IngridientType';
import Modal from '../Modal/Modal';
import IngridientDetails from '../IngredientDetails/IngredientDetails';
import { IngridientsContext } from '../../context/IngridientsContext';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import Api from '../Api/Api';
import { addIngridient } from '../../services/action/ingridientList';

const BurgerIngredients = () => {
  const [current, setCurrent] = useState('bun');
  const [dataForModal, setDataForModal] = useState(null);
  //const ingridientsList = useContext(IngridientsContext);
  const dispatch = useDispatch();
  const { ingridientsList } = useSelector(store => ({
    ingridientsList: store.ingridientsListReducer,
  }), shallowEqual);

  useEffect(()=>{
    Api.getIngredients()
      .then((data)=>{
        console.log(data.data);
        dispatch(addIngridient)
      })
      .catch((err)=>{
        console.log('Some trouble with response from server! \n', err);
      });
  }, )

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
        <IngridientType data={buns} title='Булки' modal={setDataForModal} anchor='bun' />
        <IngridientType data={sauce} title='Соусы' modal={setDataForModal} anchor='sauce' />
        <IngridientType data={main} title='Начинки' modal={setDataForModal} anchor='main' />
      </div>
      {dataForModal &&
        <Modal close={setDataForModal}>
          <IngridientDetails ingridient={dataForModal} close={setDataForModal}/>
        </Modal>
      }
    </section>
  )
}

export default BurgerIngredients;
