import { CLOSE_ORDERS_SOCKET, GET_ORDERS_DATA, INIT_ORDERS_SOCKET, ON_CLOSE_SOCKET, ON_ERROR_SOCKET, SUCCESS_ORDERS_SOCKET, TOrderSocketActions } from "../actions/OrdersActions";
import { TOrdersResponse } from "../types/types";
import { TOrdersState } from "../types/types";

const initialState: TOrdersState = {
  connected: false,
  orders: [],
  total: 0,
  totalToday: 0,
  error: null,
};

const ordersReducer = (state = initialState, action: TOrderSocketActions): TOrdersState => {
  switch (action.type) {
    case INIT_ORDERS_SOCKET:
      return initialState;
    case SUCCESS_ORDERS_SOCKET:
      return {
        ...state,
        error: false,
        connected: true
      };
    case GET_ORDERS_DATA:
      const payload: TOrdersResponse = JSON.parse(action.payload);
      return {
        ...state,
        total: payload.total,
        totalToday: payload.totalToday,
        orders: payload.orders,
      };
    case ON_ERROR_SOCKET:
      return {
        ...state,
        error: action.payload,
        connected: false,
      };
    case CLOSE_ORDERS_SOCKET:
      return initialState;
    case ON_CLOSE_SOCKET:
      return initialState;
    default:
      return state;
  }
};

export default ordersReducer;
