import { CLOSE_USER_ORDERS_SOCKET, GET_USER_ORDERS_DATA, INIT_USER_ORDERS_SOCKET, ON_USER_CLOSE_SOCKET, ON_USER_ERROR_SOCKET, SUCCESS_USER_ORDERS_SOCKET, TUserOrderSocketActions } from "../actions/OrdersActions";
import { TOrdersResponse, TOrdersState } from "../types/types";

const initialState: TOrdersState = {
  connected: false,
  orders: [],
  total: 0,
  totalToday: 0,
  error: null,
};

const userOrdersReducer = (state = initialState, action: TUserOrderSocketActions): TOrdersState => {
  switch (action.type) {
    case INIT_USER_ORDERS_SOCKET:
      return initialState;
    case SUCCESS_USER_ORDERS_SOCKET:
      return {
        ...state,
        error: null,
        connected: true
      };
    case GET_USER_ORDERS_DATA:
      const payload: TOrdersResponse = JSON.parse(action.payload.data);
      return payload.success?
        {
          ...state,
          total: payload.total||0,
          totalToday: payload.totalToday||0,
          orders: (payload.orders||[]).reverse(),
        }:
        {
          ...initialState,
          error: payload.message,
        };
    case ON_USER_ERROR_SOCKET:
      console.log("Cannot get user orders, error: ", action.payload);
      return {
        ...state,
        error: action.payload,
        connected: false,
      };
    case CLOSE_USER_ORDERS_SOCKET:
      return initialState;
    case ON_USER_CLOSE_SOCKET:
      return initialState;
    default:
      return state;
  }
};

export default userOrdersReducer;
