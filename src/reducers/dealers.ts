import { FETCH_ALL_DEALERS, API_START, API_END } from "../actions/types";

const initialState = {};

const dealerReducer = (state = initialState, action: any) => {
	const { type, data } = action;
	switch (type) {
		case FETCH_ALL_DEALERS:
			return {
				...data
			};
		case API_START:
			if (action.payload === FETCH_ALL_DEALERS) {
				return {
					...state,
					isLoadingData: true
				};
			}
			break;
		case API_END:
			if (action.payload === FETCH_ALL_DEALERS) {
				return {
					...state,
					isLoadingData: false
				};
			}
			break;
		default:
			return state;
	}
};

export default dealerReducer;
