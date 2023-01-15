import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./IngredientDetails.module.css";
import PropTypes from 'prop-types';
import { ingredientProps } from "../../utils/propTypes";

const IngridientDetails = ({ingridient, close}) => {

  return (
    <div className={`mb-5`}>
      <div className={styles.titleWrapper}>
        <h2 className={`${styles.title} text text_type_main-large`}>Детали ингридиента</h2>
        <button className={styles.closeBtn}>
          <CloseIcon type="primary" onClick={()=>close(null)}/>
        </button>
      </div>
      <img className={`${styles.img} ml-15 mr-15`} alt={ingridient.name} src={ingridient.image_large}/>
      <h3 className={`${styles.name} text text_type_main-medium ml-15 mr-15 mt-4`}>{ingridient.name}</h3>
      <div className={`${styles.infosWrapper} ml-15 mr-15 mt-8`}>
        <div className={styles.infoWrapper}>
          <h4 className={`${styles.infoText} text text_type_main-default text_color_inactive`}>Калории, ккал</h4>
          <span className='text text_type_main-default text_color_inactive text_type_digits-default'>{ingridient.calories}</span>
        </div>
        <div className={styles.infoWrapper}>
          <h4 className={`${styles.infoText} text text_type_main-default text_color_inactive`}>Белки, г</h4>
          <span className='text text_type_main-default text_color_inactive text_type_digits-default'>{ingridient.proteins}</span>
        </div>
        <div className={styles.infoWrapper}>
          <h4 className={`${styles.infoText} text text_type_main-default text_color_inactive`}>Жиры, г</h4>
          <span className='text text_type_main-default text_color_inactive text_type_digits-default'>{ingridient.fat}</span>
        </div>
        <div className={styles.infoWrapper}>
          <h4 className={`${styles.infoText} text text_type_main-default text_color_inactive`}>Углеводы, г</h4>
          <span className='text text_type_main-default text_color_inactive text_type_digits-default'>{ingridient.carbohydrates}</span>
        </div>
      </div>
    </div>
  )

}

IngridientDetails.propTypes = {
  ingridient: ingredientProps,
  close: PropTypes.func.isRequired,
};

export default IngridientDetails;
