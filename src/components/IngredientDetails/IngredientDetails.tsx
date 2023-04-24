import styles from "./IngredientDetails.module.css";
import { shallowEqual, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Location, Params, useLocation, useParams } from "react-router-dom";
import { RootState, TIngredient } from "../../services/types/types";

const IngredientDetails = () => {

  const [element, setElement] = useState<TIngredient|undefined>(undefined);
  const params:Readonly<Params<string>> = useParams();
  const location: Location = useLocation();

  const { ingredientsList } = useSelector((store:RootState) => ({
    ingredientsList: store.ingredientsListReducer,
  }), shallowEqual);

  useEffect(()=>{
    setElement(ingredientsList.content.find(el=>el._id===params.id))
  }, [ingredientsList]);

  return element ?
    (
      <div className={`mb-5`}>
        <div className={styles.titleWrapper}>
          <h2 className={`${styles.title} ${!location.state&&styles.centerText} text text_type_main-large`}>Детали ингридиента</h2>
        </div>
        <img className={`${styles.img} ml-15 mr-15`} alt={element.name} src={element.image_large}/>
        <h3 className={`${styles.name} text text_type_main-medium ml-15 mr-15 mt-4`}>{element.name}</h3>
        <div className={`${styles.infosWrapper} ml-15 mr-15 mt-8`}>
          <div className={styles.infoWrapper}>
            <h4 className={`${styles.infoText} text text_type_main-default text_color_inactive`}>Калории, ккал</h4>
            <span className='text text_type_main-default text_color_inactive text_type_digits-default'>{element.calories}</span>
          </div>
          <div className={styles.infoWrapper}>
            <h4 className={`${styles.infoText} text text_type_main-default text_color_inactive`}>Белки, г</h4>
            <span className='text text_type_main-default text_color_inactive text_type_digits-default'>{element.proteins}</span>
          </div>
          <div className={styles.infoWrapper}>
            <h4 className={`${styles.infoText} text text_type_main-default text_color_inactive`}>Жиры, г</h4>
            <span className='text text_type_main-default text_color_inactive text_type_digits-default'>{element.fat}</span>
          </div>
          <div className={styles.infoWrapper}>
            <h4 className={`${styles.infoText} text text_type_main-default text_color_inactive`}>Углеводы, г</h4>
            <span className='text text_type_main-default text_color_inactive text_type_digits-default'>{element.carbohydrates}</span>
          </div>
        </div>
      </div>
    )
  : null
}

export default IngredientDetails;
