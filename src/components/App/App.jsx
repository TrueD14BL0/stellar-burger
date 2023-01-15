import './App.css';
import AppHeader from '../AppHeader/AppHeader';
import MainContent from '../MainContent/MainContent';
import { useEffect, useState } from 'react';
import Api from '../Api/Api';
import ORDER_CONTENT from '../../utils/data';

function App() {

  const [ingridientsList, setIngridientsList] = useState([]);
  const [constructorList, setConstructorList] = useState({
                                                          content: [],
                                                          id: 0,
                                                          bun: null,
                                                          sum: 0,});
  const order = {
                  content: [],
                  id: 0,
                  bun: null,
                  sum: 0,
                };

  const fillOrder = (ingridients) => { // сделано временно для загрузки тестовых данных
    order.id = Math.round(Math.random()*100000);
    order.bun = ingridients.find(element => {
      if(element._id === ORDER_CONTENT.bun){
        order.sum+=element.price;
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
  }, [])

  return (
      <div className={`page pt-10`}>
        <AppHeader/>
        <MainContent ingridientsList={ingridientsList} constructorList={constructorList}/>
      </div>
    )
}

export default App;
