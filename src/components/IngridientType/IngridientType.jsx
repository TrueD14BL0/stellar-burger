import styles from './IngridientType.module.css'
import PropTypes from 'prop-types';
import { ingridientsListProps } from "../../utils/propTypes";
import IngridientItem from "../IngridientItem/IngridientItem";

const IngridientType = ({title, data, anchor}) => {

  return (
    <div ref={anchor}>
      <h2 className="text text_type_main-medium mb-6">
        {title}
      </h2>
      <ul className={`${styles.content} pl-4 pr-4`}>
        {data.map(
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

IngridientType.propTypes = {
  title: PropTypes.string.isRequired,
  anchor: PropTypes.object.isRequired,
  data: ingridientsListProps,
};

export default IngridientType;
