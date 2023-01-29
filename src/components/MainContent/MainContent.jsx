import { constructorListProps, ingridientsListProps } from '../../utils/propTypes';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import styles from './MainContent.module.css';

const MainContent = ({ingridientsList, constructorList}) => {
  return (
    <main className={styles.content}>
      <BurgerIngredients ingridientsList={ingridientsList}/>
      <BurgerConstructor constructorList={constructorList}/>
    </main>
  )
}

MainContent.propTypes = {
  ingridientsList: ingridientsListProps,
  constructorList: constructorListProps,
}

export default MainContent;
