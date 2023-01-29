import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useContext, useState } from 'react';
import BurgerConstructorBottom from '../BurgerConstructorBottom/BurgerConstructorBottom';
import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';
import styles from './BurgerConstructor.module.css';
import { BurgerConstructorContext } from '../../context/BurgerConstructorContext';


const BurgerConstructor = () =>{
  const [isOpen, setModalOpen] = useState(false);
  const { constructorList } = useContext(BurgerConstructorContext);

  return (
    <div className='mt-25 pl-4'>
      {constructorList.bun &&
        (
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${constructorList.bun.name} (верх)`}
            price={constructorList.bun.price}
            thumbnail={constructorList.bun.image}
            extraClass='ml-8 mb-4'
            key={0}
          />
        )
      }
      <div className={styles.contentWrapper}>
        {constructorList.content &&
          constructorList.content.map((item, index)=>{
            return (
              <div className={styles.elementContent} key={index+1}>
                <div className={styles.dragBtn}>
                  <DragIcon type="primary" />
                </div>
                <ConstructorElement
                  isLocked={false}
                  text={`${item.name}`}
                  price={item.price}
                  thumbnail={item.image}
                  extraClass='ml-2'
                />
              </div>
          )})
        }
      </div>
      {constructorList.bun &&
        (
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${constructorList.bun.name} (низ)`}
            price={constructorList.bun.price}
            thumbnail={constructorList.bun.image}
            extraClass='ml-8 mt-4'
            key={constructorList.content?constructorList.content.length+1:1}
          />
        )
      }
      <BurgerConstructorBottom openModal={setModalOpen}/>
      {isOpen &&
        <Modal close={setModalOpen}>
          <OrderDetails ingridient={constructorList} close={setModalOpen} order={constructorList}/>
        </Modal>
      }
    </div>
  );
}

export default BurgerConstructor;
