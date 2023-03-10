import IngridientDetails from "../../components/IngredientDetails/IngredientDetails"
import styles from './IngridientsPage.module.css';

const IngridientsPage = () => {
  return (
    <div className={`${styles.content} pt-30`}>
      <IngridientDetails/>
    </div>
  );
}

export default IngridientsPage;
