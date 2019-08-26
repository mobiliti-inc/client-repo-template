import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { History } from "history";

// Reducers

export default (history: History) =>
	combineReducers({
		router: connectRouter(history)
		// More reducers will go here
	});
