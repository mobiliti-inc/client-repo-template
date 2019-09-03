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
});
