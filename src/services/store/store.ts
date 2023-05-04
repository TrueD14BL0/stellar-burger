import { applyMiddleware, legacy_createStore as createStore } from "redux";
import thunk from "redux-thunk";
import { WS_URL } from "../../utils/const";
import composeEnhanters from "../enhancers/composeEnhancers";
import { socketMiddleware } from "../middleware/socketMiddleware";
import rootReducer from "../reducers/rootReducer";
import { TWSActions } from "../types/types";
import { CLOSE_ORDERS_SOCKET, CLOSE_USER_ORDERS_SOCKET, GET_ORDERS_DATA, GET_USER_ORDERS_DATA, INIT_ORDERS_SOCKET, INIT_USER_ORDERS_SOCKET, ON_CLOSE_SOCKET, ON_ERROR_SOCKET, ON_USER_CLOSE_SOCKET, ON_USER_ERROR_SOCKET, SUCCESS_ORDERS_SOCKET, SUCCESS_USER_ORDERS_SOCKET } from "../actions/OrdersActions";

const wsActions: TWSActions ={
  init: INIT_ORDERS_SOCKET,
  onOpen: SUCCESS_ORDERS_SOCKET,
  onClose: ON_CLOSE_SOCKET,
  close: CLOSE_ORDERS_SOCKET,
  onError: ON_ERROR_SOCKET,
  onMessage: GET_ORDERS_DATA,
};

const wsUserActions: TWSActions ={
  init: INIT_USER_ORDERS_SOCKET,
  onOpen: SUCCESS_USER_ORDERS_SOCKET,
  onClose: ON_USER_CLOSE_SOCKET,
  close: CLOSE_USER_ORDERS_SOCKET,
  onError: ON_USER_ERROR_SOCKET,
  onMessage: GET_USER_ORDERS_DATA,
};
const enhancer = composeEnhanters(applyMiddleware(thunk, socketMiddleware(WS_URL, wsActions), socketMiddleware(WS_URL, wsUserActions)));
const store = createStore(rootReducer, enhancer);

export default store;
