import { CLOSE_USER_ORDERS_SOCKET, GET_USER_ORDERS_DATA, INIT_USER_ORDERS_SOCKET, ON_USER_CLOSE_SOCKET, ON_USER_ERROR_SOCKET, SUCCESS_USER_ORDERS_SOCKET, TUserOrderSocketActions } from "../actions/OrdersActions";
import { TOrdersResponse, TOrdersState } from "../types/types";

const initialState: TOrdersState = {
  connected: false,
  orders: [],
  total: 0,
  totalToday: 0,
  error: null,
};

/*const updateToken = () =>{
  Api.getAccessToken(getCookie('refreshToken')||'')
    .then((data)=>{
      setTokenCookies(data.accessToken, data.refreshToken)
      dispatch({ type: initUserOrder, payload:`` });
    })
    .catch((err)=>{
      deleteCookie('token');
      deleteCookie('refreshToken');
      dispatch({ type: onErrorUserOrder, payload: err });
    }
  );
}

userSocket.onerror = event => {
  if(event as unknown as string==='401'){
    updateToken();
  }else{
    dispatch({ type: onErrorUserOrder, payload: event });
  }
};*/

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
      return {
        ...state,
        total: payload.total,
        totalToday: payload.totalToday,
        orders: payload.orders.reverse(),
      };
    case ON_USER_ERROR_SOCKET:
      console.log(action);
      console.log(action.payload);
      console.log(action.payload);
      console.log("Cannot get user orders, error: ", action);
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
