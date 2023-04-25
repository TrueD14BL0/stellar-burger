import { FC } from "react";
import styles from './IngridientsPage.module.css';
import IngredientDetails from "../../components/IngredientDetails/IngredientDetails";

const IngridientsPage: FC = () => {
  return (
    <div className={`${styles.content} pt-30`}>
      <IngredientDetails />
    </div>
  );
}

export default IngridientsPage;
