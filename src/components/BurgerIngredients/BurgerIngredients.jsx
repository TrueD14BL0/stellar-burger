import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './BurgerIngredients.module.css'
import { useMemo, useState, useRef } from 'react';
import IngridientType from '../IngridientType/IngridientType';
import Modal from '../Modal/Modal';
import IngridientDetails from '../IngredientDetails/IngredientDetails';
import { useSelector, shallowEqual } from 'react-redux';
import { MAIN_PAGE, Tabs } from '../../utils/const';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const BurgerIngredients = () => {
  const [current, setCurrent] = useState('bun');
  const bunsRef = useRef(null);
  const saucesRef = useRef(null);
  const mainsRef = useRef(null);
  const navigation = useNavigate();
  const params = useParams();
  const location = useLocation();
  const modal = params.id&&location.state&&location.state.modal;

  const { ingridientsList } = useSelector(store => ({
    ingridientsList: store.ingridientsListReducer,
  }), shallowEqual);

  const buns = useMemo(
    () =>
    ingridientsList.content.filter((item) => {
        return item.type === "bun"
      }),
    [ingridientsList]
  );

  const sauce = useMemo(
    () =>
    ingridientsList.content.filter((item) => {
        return item.type === "sauce"
      }),
    [ingridientsList]
  );

  const main = useMemo(
    () =>
    ingridientsList.content.filter((item) => {
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
      setCurrent(Tabs.BUN);
    }else if(minCoord===saucesTop){
      setCurrent(Tabs.SAUCE);
    }else{
      setCurrent(Tabs.MAIN);
    }
  }

  const closeModal = ()=>{
    navigation(MAIN_PAGE);
  }

  return (
    <section className={`mt-10`}>
      <h1 className='text text_type_main-large'>???????????????? ????????????</h1>
      <div className={`mt-5 ${styles.contentWrapper}`}>
        <Tab value={Tabs.BUN} active={current === Tabs.BUN} onClick={()=>setCurrentScroll(bunsRef)}>
          ??????????
        </Tab>
        <Tab value={Tabs.SAUCE} active={current === Tabs.SAUCE} onClick={()=>setCurrentScroll(saucesRef)}>
          ??????????
        </Tab>
        <Tab value={Tabs.MAIN} active={current === Tabs.MAIN} onClick={()=>setCurrentScroll(mainsRef)}>
          ??????????????
        </Tab>
      </div>
      <div className={`${styles.content} mt-10`} onScroll={scrollHandler}>
        <IngridientType data={buns} title='??????????' anchor={bunsRef} />
        <IngridientType data={sauce} title='??????????' anchor={saucesRef} />
        <IngridientType data={main} title='??????????????' anchor={mainsRef} />
      </div>
      {modal &&
        <Modal close={closeModal}>
          <IngridientDetails/>
        </Modal>}
    </section>
  )
}

export default BurgerIngredients;
