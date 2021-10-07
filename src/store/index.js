import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import reducers from "./reducers";

const enhancers = compose(
  applyMiddleware(thunk)
);

export const makeStore = initialState => {
  return createStore(reducers, initialState, enhancers);
};