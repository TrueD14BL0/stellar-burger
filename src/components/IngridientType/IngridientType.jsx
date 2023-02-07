import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './IngridientType.module.css'
import PropTypes from 'prop-types';
import { ingridientsListProps } from "../../utils/propTypes";
import { useDispatch } from "react-redux";
import { openIngridient } from "../../services/actions/ingridientObj";

const IngridientType = ({title, data, anchor}) => {

  const dispatch = useDispatch();

  return (
    <div ref={anchor}>
      <h2 className="text text_type_main-medium mb-6">
        {title}
      </h2>
      <ul className={`${styles.content} pl-4 pr-4`}>
        {data.map(
          (item) => {
            return (
              <li className={styles.ingridient_card} key={item._id} onClick={()=>dispatch(openIngridient(item))}>
                <img src={item.image} alt={item.image} className="pb-1 ml-4 mr-4"></img>
                {item.__v
                  ?<Counter count={item.__v} size="default" extraClass="m-1" />
                  : null
                }
                <h3 className={`pb-2 text text_type_digits-default ${styles.price}`}>
                  {item.price} <CurrencyIcon />
                </h3>
                <span className={`text text_type_main-default ${styles.title}`}>
                  {item.name}
                </span>
              </li>
            );
          }
        )}
      </ul>
    </div>
  )
}

IngridientType.propTypes = {
  title: PropTypes.string.isRequired,
  anchor: PropTypes.object.isRequired,
  data: ingridientsListProps,
};

export default IngridientType;
