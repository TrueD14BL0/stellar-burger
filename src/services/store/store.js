import { applyMiddleware } from "@reduxjs/toolkit";
import { legacy_createStore as createStore } from "redux";
import thunk from "redux-thunk";
import composeEnhanters from "../enhancers/composeEnhancers";
import rootReducer from "../reducers/rootReducer";

const enhancer = composeEnhanters(applyMiddleware(thunk));
const store = createStore(rootReducer, enhancer);

export default store;
