import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './BurgerIngredients.module.css'
import { useMemo, useState } from 'react';
import IngridientType from '../IngridientType/IngridientType';
import Modal from '../Modal/Modal';
import IngridientDetails from '../IngredientDetails/IngredientDetails';
import { ingridientsListProps } from '../../utils/propTypes';

const BurgerIngredients = ({ingridientsList}) => {
  const style = `mt-10`;
  const [current, setCurrent] = useState('bun');
  const [dataForModal, setDataForModal] = useState(null);

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
    <section className={style}>
      <h1 className='text text_type_main-large'>Соберите бургер</h1>
      <div style={{ display: 'flex' }} className='mt-5'>
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

BurgerIngredients.propTypes = {
  ingridientsList: ingridientsListProps,
}

export default BurgerIngredients;
