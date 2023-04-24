import styles from './IngridientType.module.css'
import IngridientItem from "../IngredientItem/IngredientItem";
import { TIngredient, TIngredientList } from '../../services/types/types';
import { FC, RefObject } from 'react';

interface IIngredientType {
  title: string,
  anchor: RefObject<HTMLDivElement>,
  data?: TIngredient[],
}

const IngredientType: FC<IIngredientType> = ({title, data, anchor}) => {

  return (
    <div ref={anchor}>
      <h2 className="text text_type_main-medium mb-6">
        {title}
      </h2>
      <ul className={`${styles.content} pl-4 pr-4`}>
        {data && data.map(
          (item) => {
            return(
              <IngridientItem item={item} key={item._id}/>
            )
          }
        )}
      </ul>
    </div>
  )
}

export default IngredientType;
