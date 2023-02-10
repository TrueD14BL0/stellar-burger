import { ORDER_CLEAR, ORDER_ERROR, ORDER_REQUEST, ORDER_SUCCESS } from "../../utils/const";

const initialState = {
  "number": 0
}

const orderObjReducer = (state = initialState, action) => {
  switch (action.type) {
    case ORDER_REQUEST:
      /*здесь запускаем лоадер, которого нет*/
      break;
    case ORDER_SUCCESS:
      state = action.order;
      break;
    case ORDER_ERROR:
      console.log(`Some error with order: ${action.err}`);
      state = initialState;
      break;
    case ORDER_CLEAR:
      state = initialState;
      break;
    default:
      break;
  }
  return state;
}

export default orderObjReducer;
