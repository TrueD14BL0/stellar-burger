import styles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import MainContent from '../MainContent/MainContent';
import { useEffect } from 'react';
import Api from '../Api/Api';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import { useDispatch } from 'react-redux';
import { addIngridients } from '../../services/actions/ingridientList';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd/dist/core';

function App() {

  const dispatch = useDispatch();

  useEffect(()=>{
    Api.getIngredients()
      .then((data)=>{
        dispatch(addIngridients(data.data));
      })
      .catch((err)=>{
        console.log('Some trouble with response from server! \n', err);
      });
  }, )

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
