import { DEL_ORDER, SET_ORDER } from "../../utils/const";

const initialState = {
  "number": 0
}

const orderObjReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDER:
      state = action.order;
      break;
    case DEL_ORDER:
      state = initialState;
      break;
    default:
      break;
  }
  return state;
}

export default orderObjReducer;
