import { CLOSE_ORDERS_SOCKET, GET_ORDERS_DATA, INIT_ORDERS_SOCKET, ON_CLOSE_SOCKET, ON_ERROR_SOCKET, SET_ORDERS_DATA, SUCCESS_ORDERS_SOCKET } from "../actions/OrdersActions";

const initialState = {
  connected: false,
  orders: [],
  total: 0,
  totalToday: 0,
  error: null,
};

const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_ORDERS_SOCKET:
      return initialState;
    case SUCCESS_ORDERS_SOCKET:
      return {
        ...state,
        error: null,
        connected: true
      };
    case GET_ORDERS_DATA:
      const payload = JSON.parse(action.payload);
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
