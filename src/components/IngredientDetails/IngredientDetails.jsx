import styles from "./IngredientDetails.module.css";
import { shallowEqual, useSelector } from "react-redux";

const IngridientDetails = () => {

  const { element } = useSelector(store => ({
    element: store.ingridientObjReducer,
  }), shallowEqual);

  return (
    <div className={`mb-5`}>
      <div className={styles.titleWrapper}>
        <h2 className={`${styles.title} text text_type_main-large`}>Детали ингридиента</h2>
      </div>
      <img className={`${styles.img} ml-15 mr-15`} alt={element.ingridient.name} src={element.ingridient.image_large}/>
      <h3 className={`${styles.name} text text_type_main-medium ml-15 mr-15 mt-4`}>{element.ingridient.name}</h3>
      <div className={`${styles.infosWrapper} ml-15 mr-15 mt-8`}>
        <div className={styles.infoWrapper}>
          <h4 className={`${styles.infoText} text text_type_main-default text_color_inactive`}>Калории, ккал</h4>
          <span className='text text_type_main-default text_color_inactive text_type_digits-default'>{element.ingridient.calories}</span>
        </div>
        <div className={styles.infoWrapper}>
          <h4 className={`${styles.infoText} text text_type_main-default text_color_inactive`}>Белки, г</h4>
          <span className='text text_type_main-default text_color_inactive text_type_digits-default'>{element.ingridient.proteins}</span>
        </div>
        <div className={styles.infoWrapper}>
          <h4 className={`${styles.infoText} text text_type_main-default text_color_inactive`}>Жиры, г</h4>
          <span className='text text_type_main-default text_color_inactive text_type_digits-default'>{element.ingridient.fat}</span>
        </div>
        <div className={styles.infoWrapper}>
          <h4 className={`${styles.infoText} text text_type_main-default text_color_inactive`}>Углеводы, г</h4>
          <span className='text text_type_main-default text_color_inactive text_type_digits-default'>{element.ingridient.carbohydrates}</span>
        </div>
      </div>
    </div>
  )

}

export default IngridientDetails;
