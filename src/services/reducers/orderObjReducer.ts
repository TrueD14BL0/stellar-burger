import { ORDER_CLEAR, ORDER_ERROR, ORDER_REQUEST, ORDER_SUCCESS } from "../../utils/const";
import { TOrderActions } from "../actions/orderObj";

type TOrderObjState = {
  loading: boolean,
  error: boolean,
  number: number|null,
}

const initialState: TOrderObjState = {
  loading: false,
  error: false,
  number: null
}

const orderObjReducer = (state = initialState, action: TOrderActions): TOrderObjState => {
  switch (action.type) {
    case ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        number: action.order.number,
      }
    case ORDER_ERROR:
      console.log(`Some error with order: ${action.err}`);
      state = initialState;
      return {
        ...initialState,
        error: true,
      }
    case ORDER_CLEAR:
      return initialState;
    default:
      return state;
  }
}

export default orderObjReducer;
