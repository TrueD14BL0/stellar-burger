import styles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import MainContent from '../MainContent/MainContent';
import { useEffect } from 'react';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import { useDispatch } from 'react-redux';
import { getIngridientsList } from '../../services/actions/ingridientList';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd/dist/core';

function App() {

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getIngridientsList());
  }, [])

  return (
    <div className={`${styles.page} pt-10`}>
      <AppHeader/>
      <DndProvider backend={HTML5Backend}>
        <MainContent>
          <BurgerIngredients/>
          <BurgerConstructor/>
        </MainContent>
      </DndProvider>
    </div>
  )
}

export default App;
