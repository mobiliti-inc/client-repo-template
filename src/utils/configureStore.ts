import { createStore, applyMiddleware } from "redux";
import apiMiddleware from "./apiMiddleware";
import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import { composeWithDevTools } from "redux-devtools-extension";

import rootReducer from "../reducers";

const initialState = {};
export const history = createBrowserHistory();

const store = createStore(
	rootReducer(history),
	initialState,
	composeWithDevTools(applyMiddleware(routerMiddleware(history), apiMiddleware))
);

export default store;
