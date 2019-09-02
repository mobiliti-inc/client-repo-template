import * as actions from "../api";
import * as types from "../types";

describe("actions", () => {
	it("should create an action to start a network request", () => {
		const payload = "Start request";
		const expectedAction = {
			type: types.API_START,
			payload
		};
		expect(actions.apiStart(payload)).toEqual(expectedAction);
	});

	it("should create an action to end a network request", () => {
		const payload = "End request";
		const expectedAction = {
			type: types.API_END,
			payload
		};
		expect(actions.apiEnd(payload)).toEqual(expectedAction);
	});

	it("should throw error in case of error on network request", () => {
		const error = "Had error";
		const expectedAction = {
			type: types.API_ERROR,
			error
		};
		expect(actions.apiError(error)).toEqual(expectedAction);
	});

	it("should throw access denied on inaccessible urls", () => {
		const url = "/dealers";
		const expectedAction = {
			type: types.ACCESS_DENIED,
			payload: {
				url
			}
		};
		expect(actions.accessDenied(url)).toEqual(expectedAction);
	});

	it("should handle api actions with custom types", () => {
		const apiDetails = {};

		const expectedAction = {
			payload: {
				...apiDetails
			}
		};

		expect(actions.apiAction(apiDetails)).toMatchObject(expectedAction);
		// Should have API type by default
		expect(actions.apiAction(apiDetails)).toMatchObject({ type: "API" });
	});

	it("should handle urls passed with base url format", () => {
		const apiDetails = {
			url: "www.mocked_url.com/dealers"
		};

		const expectedAction = {
			payload: {
				...apiDetails
			}
		};

		expect(actions.apiAction(apiDetails)).toMatchObject(expectedAction);
		// Should have API type by default
		expect(actions.apiAction(apiDetails)).toMatchObject({ type: "API" });
	});

	it("should handle urls missing base urls", () => {
		const apiDetails = {
			url: "dealers"
		};

		const expectedAction = {
			payload: {
				...apiDetails
			}
		};

		expect(actions.apiAction(apiDetails)).toMatchObject(expectedAction);
		// Should have API type by default
		expect(actions.apiAction(apiDetails)).toMatchObject({ type: "API" });
	});
});
