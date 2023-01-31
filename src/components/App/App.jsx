import styles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import MainContent from '../MainContent/MainContent';
import { useEffect, useState } from 'react';
import Api from '../Api/Api';
import ORDER_CONTENT from '../../utils/data';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import { BurgerConstructorContext } from '../../context/BurgerConstructorContext';
import { IngridientsContext } from '../../context/IngridientsContext';

function App() {

  const [ingridientsList, setIngridientsList] = useState([]);
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

  const fillOrder = (ingridients) => { // сделано временно для загрузки тестовых данных
    order.bun = ingridients.find(element => {
      if(element._id === ORDER_CONTENT.bun){
        order.sum+=element.price*2;
        element.__v+=1;
        return true;
      }
      return false;
    });
    ORDER_CONTENT.content.forEach(element => {
      order.content.push(ingridients.find(el => {
        if(el._id === element.id){
          order.sum+=el.price;
          el.__v+=1;
          return true;
        }
        return false;
      }));
    });
    setConstructorList(order);
  }

  useEffect(()=>{
    Api.getIngredients()
      .then((data)=>{
        setIngridientsList(data.data);
        fillOrder(data.data);
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
            <IngridientsContext.Provider value={ingridientsList}>
              <BurgerIngredients/>
            </IngridientsContext.Provider>
            <BurgerConstructor/>
          </BurgerConstructorContext.Provider>
        </MainContent>
      </div>
    )
}

export default App;
