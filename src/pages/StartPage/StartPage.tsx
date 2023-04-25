import styles from './StartPage.module.css';
import { DndProvider } from "react-dnd";
import BurgerConstructor from "../../components/BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../../components/BurgerIngredients/BurgerIngredients";
import MainContent from "../../components/MainContent/MainContent";
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Location, Outlet, Params, useLocation, useParams } from 'react-router-dom';
import { FC } from 'react';

const StartPage: FC = () => {
  const location: Location = useLocation();
  const params: Readonly<Params<string>> = useParams();

  return (params.id&&!(location.state&&location.state.modal))?
  (<Outlet/>):
  (
    <div className={`${styles.page} pt-10`}>
      <DndProvider backend={HTML5Backend}>
        <MainContent>
          <BurgerIngredients/>
          <BurgerConstructor/>
        </MainContent>
      </DndProvider>
    </div>
  )
}

export default StartPage;
