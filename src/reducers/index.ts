import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { History } from "history";

import dealerReducer from "./dealers";

// Reducers
export default (history: History) =>
	combineReducers({
		router: connectRouter(history),
		// More reducers will go here
		dealers: dealerReducer
	});
