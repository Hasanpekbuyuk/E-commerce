import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import logger from "redux-logger";

import clientReducer from "./reducers/clientReducer";
import productReducer from "./reducers/productReducer";
import cartReducer from "./reducers/cartReducer";

const rootReducer = combineReducers({
  client: clientReducer,
  product: productReducer,
  cart: cartReducer,
});

const middlewares = [thunk, logger];

const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;
