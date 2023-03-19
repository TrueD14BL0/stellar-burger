import { applyMiddleware, legacy_createStore as createStore } from "redux";
import thunk from "redux-thunk";
import { WS_URL } from "../../utils/const";
import { wsOrdersActions } from "../actions/OrdersActions";
import composeEnhanters from "../enhancers/composeEnhancers";
import { socketMiddleware } from "../middleware/socketMiddleware";
import rootReducer from "../reducers/rootReducer";

const enhancer = composeEnhanters(applyMiddleware(thunk, socketMiddleware(WS_URL, wsOrdersActions)));
const store = createStore(rootReducer, enhancer);

export default store;
