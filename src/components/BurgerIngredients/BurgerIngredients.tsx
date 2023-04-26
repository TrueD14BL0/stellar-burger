import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './BurgerIngredients.module.css'
import { useMemo, useState, useRef, RefObject, UIEventHandler } from 'react';
import IngridientType from '../IngredientType/IngredientType';
import Modal from '../Modal/Modal';
import { useSelector, shallowEqual } from 'react-redux';
import { PAGES, Tabs } from '../../utils/const';
import { Location, NavigateFunction, Params, useLocation, useNavigate, useParams } from 'react-router-dom';
import { RootState, TIngredient } from '../../services/types/types';
import IngredientDetails from '../IngredientDetails/IngredientDetails';

const BurgerIngredients = () => {
  const [current, setCurrent] = useState<string>('bun');
  const bunsRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  const saucesRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  const mainsRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  const navigation: NavigateFunction = useNavigate();
  const params: Readonly<Params<string>> = useParams();
  const location: Location = useLocation();
  const modal: boolean = params.id&&location.state&&location.state.modal;

  const { ingredientsList } = useSelector((store:RootState) => ({
    ingredientsList: store.ingredientsListReducer,
  }), shallowEqual);

  const buns = useMemo(
    () =>
    ingredientsList.content.filter((item: TIngredient) => {
        return item.type === "bun"
      }),
    [ingredientsList]
  );

  const sauce = useMemo(
    () =>
    ingredientsList.content.filter((item: TIngredient) => {
        return item.type === "sauce"
      }),
    [ingredientsList]
  );

  const main = useMemo(
    () =>
    ingredientsList.content.filter((item: TIngredient) => {
        return item.type === "main"
      }),
    [ingredientsList]
  );

  const setCurrentScroll = (elToScroll: RefObject<HTMLDivElement>) =>{
    if(elToScroll && elToScroll.current){
      elToScroll.current.scrollIntoView({ block: 'start',  behavior: 'smooth' });
    }
  }

  const scrollHandler: UIEventHandler<HTMLDivElement> = (evt) =>{
    const parentDiv: HTMLDivElement = evt.target as HTMLDivElement;
    const parentTop: number = parentDiv.offsetTop;
    const scrollSize: number = parentDiv.scrollTop;
    const bunsTop = Math.abs((bunsRef.current?.offsetTop||0) - scrollSize - parentTop);
    const saucesTop = Math.abs((saucesRef.current?.offsetTop||0) - scrollSize - parentTop);
    const mainsTop = Math.abs((mainsRef.current?.offsetTop||0) - scrollSize - parentTop);
    const minCoord = Math.min(bunsTop, saucesTop, mainsTop);

    if(minCoord===bunsTop){
      setCurrent(Tabs.BUN);
    }else if(minCoord===saucesTop){
      setCurrent(Tabs.SAUCE);
    }else{
      setCurrent(Tabs.MAIN);
    }
  }

  const closeModal = ()=>{
    navigation(PAGES.MAIN_PAGE);
  }

  return (
    <section className={`mt-10`}>
      <h1 className='text text_type_main-large'>Соберите бургер</h1>
      <div className={`mt-5 ${styles.contentWrapper}`}>
        <Tab value={Tabs.BUN} active={current === Tabs.BUN} onClick={()=>{setCurrentScroll(bunsRef)}}>
          Булки
        </Tab>
        <Tab value={Tabs.SAUCE} active={current === Tabs.SAUCE} onClick={()=>setCurrentScroll(saucesRef)}>
          Соусы
        </Tab>
        <Tab value={Tabs.MAIN} active={current === Tabs.MAIN} onClick={()=>setCurrentScroll(mainsRef)}>
          Начинки
        </Tab>
      </div>
      <div className={`${styles.content} mt-10`} onScroll={scrollHandler}>
        <IngridientType data={buns} title='Булки' anchor={bunsRef} />
        <IngridientType data={sauce} title='Соусы' anchor={saucesRef} />
        <IngridientType data={main} title='Начинки' anchor={mainsRef} />
      </div>
      {modal &&
        <Modal close={closeModal}>
          <IngredientDetails/>
        </Modal>}
    </section>
  )
}

export default BurgerIngredients;
