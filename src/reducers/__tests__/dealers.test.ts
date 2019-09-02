import dealerReducer, { initialState } from "../dealers";
import { API_START, API_END, FETCH_ALL_DEALERS } from "../../actions/types";

describe("Dealer reducer", () => {
	it("should return the initial state", () => {
		expect(dealerReducer(undefined, {})).toEqual(initialState);
	});

	it("handles actions of type API_START", () => {
		const action = {
			type: API_START,
			data: {},
			payload: FETCH_ALL_DEALERS
		};

		const expectedState = {
			...initialState,
			isLoadingData: true
		};

		const newState = dealerReducer(initialState, action);
		expect(newState).toEqual(expectedState);
	});

	it("should handle action of type of API_END", () => {
		const action = {
			type: API_END,
			data: {},
			payload: FETCH_ALL_DEALERS
		};

		const expectedState = {
			...initialState,
			isLoadingData: false
		};

		const newState = dealerReducer(initialState, action);
		expect(newState).toEqual(expectedState);
	});

	it("should handle action of type of FETCH_ALL_DEALERS", () => {
		const payload = {
			name: "dealer1"
		};
		const action = {
			type: FETCH_ALL_DEALERS,
			data: { payload }
		};

		const expectedState = {
			payload
		};

		const newState = dealerReducer(initialState, action);
		expect(newState).toEqual(expectedState);
	});

	// it('handles actions of type GET_DEALER_HOURS_SUCCESS', () => {
	// 	const payload = {
	// 		fetching: false,
	// 		data: [
	// 			'9:00 AM - 11:00 AM',
	// 			'11:00 AM - 1:00 PM',
	// 			'1:00 PM - 3:00 PM',
	// 			'3:00 PM - 5:00 PM',
	// 			'5:00 PM - 6:00 PM'
	// 		]
	// 	};

	// 	const action = {
	// 		type: GET_DEALER_HOURS_SUCCESS,
	// 		payload
	// 	};

	// 	const expectedState = {
	// 		...initialState,
	// 		dealerHours: {
	// 			fetched: true,
	// 			...payload,
	// 		}
	// 	};

	// 	const newState = dealerReducer(initialState, action);
	// 	expect(newState).toEqual(expectedState);
	// });

	// it('handles actions of type GET_DEALER_HOURS_FAIL', () => {
	// 	const payload = {
	// 		fetching: false,
	// 		error: {
	// 			message: 'failed request'
	// 		}
	// 	};

	// 	const action = {
	// 		type: GET_DEALER_HOURS_FAIL,
	// 		payload
	// 	};

	// 	const expectedState = {
	// 		...initialState,
	// 		dealerHours: {
	// 			fetched: false,
	// 			...payload,
	// 		}
	// 	};

	// 	const newState = dealerReducer(initialState, action);
	// 	expect(newState).toEqual(expectedState);
	// });

	// it('handles actions of type GET_DEALER_OPEN_DAYS_START', () => {
	// 	const payload = {
	// 		fetching: true,
	// 		data: []
	// 	};

	// 	const action = {
	// 		type: GET_DEALER_OPEN_DAYS_START,
	// 		payload
	// 	};

	// 	const expectedState = {
	// 		...initialState,
	// 		openDays: {
	// 			fetched: false,
	// 			...payload,
	// 		}
	// 	};

	// 	const newState = dealerReducer(initialState, action);
	// 	expect(newState).toEqual(expectedState);
	// });

	// it('handles actions of type GET_DEALER_OPEN_DAYS_SUCCESS', () => {
	// 	const payload = {
	// 		fetching: false,
	// 		data: openDays
	// 	};

	// 	const action = {
	// 		type: GET_DEALER_OPEN_DAYS_SUCCESS,
	// 		payload
	// 	};

	// 	const expectedState = {
	// 		...initialState,
	// 		openDays: {
	// 			fetched: true,
	// 			...payload,
	// 		}
	// 	};

	// 	const newState = dealerReducer(initialState, action);
	// 	expect(newState).toEqual(expectedState);
	// });

	// it('handles actions of type GET_DEALER_OPEN_DAYS_FAIL', () => {
	// 	const payload = {
	// 		fetching: false,
	// 		error: {
	// 			message: 'failed request'
	// 		}
	// 	};

	// 	const action = {
	// 		type: GET_DEALER_OPEN_DAYS_FAIL,
	// 		payload
	// 	};

	// 	const expectedState = {
	// 		...initialState,
	// 		openDays: {
	// 			fetched: false,
	// 			...payload,
	// 		}
	// 	};

	// 	const newState = dealerReducer(initialState, action);
	// 	expect(newState).toEqual(expectedState);
	// });

	// it('handles actions of type SELECT_DROP_OFF_TIME', () => {
	// 	const payload = {
	// 		fetched: true,
	// 		time: '9:00 AM - 11:00 AM'
	// 	};

	// 	const action = {
	// 		type: SELECT_DROP_OFF_TIME,
	// 		payload
	// 	};

	// 	const expectedState = {
	// 		...initialState,
	// 		selectedDropOffTime: {
	// 			fetched: false,
	// 			...payload,
	// 		}
	// 	};

	// 	const newState = dealerReducer(initialState, action);
	// 	expect(newState).toEqual(expectedState);
	// });

	// it('handles actions of type SELECT_DROP_OFF_DAY', () => {
	// 	const payload = {
	// 		fetched: true,
	// 		day: '2/25/2019'
	// 	};

	// 	const action = {
	// 		type: SELECT_DROP_OFF_DAY,
	// 		payload
	// 	};

	// 	const expectedState = {
	// 		...initialState,
	// 		selectedDropOffDay: {
	// 			fetched: false,
	// 			...payload,
	// 		}
	// 	};

	// 	const newState = dealerReducer(initialState, action);
	// 	expect(newState).toEqual(expectedState);
	// });
});
