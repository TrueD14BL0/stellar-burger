import styles from './StartPage.module.css';
import { DndProvider } from "react-dnd";
import BurgerConstructor from "../../components/BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../../components/BurgerIngredients/BurgerIngredients";
import MainContent from "../../components/MainContent/MainContent";
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Outlet, useLocation, useParams } from 'react-router-dom';

const StartPage = () => {
  const location = useLocation();
  const params = useParams();

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
