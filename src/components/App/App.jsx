import styles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import MainContent from '../MainContent/MainContent';
import { useEffect, useState } from 'react';
import Api from '../Api/Api';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import { BurgerConstructorContext } from '../../context/BurgerConstructorContext';
import { useDispatch } from 'react-redux';
import { addIngridients } from '../../services/actions/ingridientList';

function App() {

  const dispatch = useDispatch();
  const [constructorList, setConstructorList] = useState({
    content: [],
    bun: null,
    id: 0,
    sum: 0,
  });
  const order = {
    content: [],
    bun: null,
    sum: 0,
    id: 0,
  };

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
        <MainContent>
          <BurgerConstructorContext.Provider value={{constructorList, setConstructorList}}>
            <BurgerIngredients/>
            <BurgerConstructor/>
          </BurgerConstructorContext.Provider>
        </MainContent>
      </div>
    )
}

export default App;
