import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './IngridientType.module.css'

const IngridientType = ({title, data, modal, anchor}) => {

  return (
    <div >
      <h2 className="text text_type_main-medium mb-6" id={anchor}>
        {title}
      </h2>
      <ul className={`${styles.content} pl-4 pr-4`}>
        {data.map(
          (item) => {
            return (
              <li className={styles.ingridient_card} key={item._id} onClick={()=>modal(item)}>
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

export default IngridientType;
