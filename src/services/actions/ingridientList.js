import Api from "../../components/Api/Api";
import { DECRIMENT_INGRIDIENT_COUNT, INGRIDIENTS_LIST_ERROR, INGRIDIENTS_LIST_REQUEST, INGRIDIENTS_LIST_SUCCESS } from "../../utils/const";

export function getIngridientsList(){
  return (dispatch) => {
    dispatch({
      type: INGRIDIENTS_LIST_REQUEST,
    })

    Api.getIngredients()
      .then((data)=>{
        dispatch({
          type: INGRIDIENTS_LIST_SUCCESS,
          ingridientList: data.data,
        });
      })
      .catch((err)=>{
        dispatch({
          type: INGRIDIENTS_LIST_ERROR,
          err,
        });
      });
  }
}

export function decrimentIngridientCount(ingridient){
  return {
      type: DECRIMENT_INGRIDIENT_COUNT,
      ingridient
  }
}
