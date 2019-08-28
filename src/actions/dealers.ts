import { apiAction } from "./api";

import { FETCH_ALL_DEALERS, SET_DEALER_DETAILS } from "./types";

export const setDealerDetails = (data: any) => {
	return {
		type: SET_DEALER_DETAILS,
		payload: data
	};
};

export const fetchDealers = () => {
	return apiAction({
		url: "dealers",
		onSuccess: setDealerDetails,
		onFailure: () => console.log("Error occurred loading articles"),
		label: FETCH_ALL_DEALERS
	});
};
