import axios from "axios";
import { API } from "../actions/types";
import { accessDenied, apiError, apiStart, apiEnd } from "../actions/api";

import { Dispatch } from "redux";

interface ApiProps {
	dispatch: Dispatch<any>;
}

const apiMiddleware = (props: ApiProps) => (next: any) => (action: any) => {
	next(action);

	const { dispatch } = props;

	// Accept only actions of API type
	if (action.type !== API) return;

	const {
		// Endpoint to be hit
		url,
		// HTTP method of the request
		method,
		// Data or query parameters to be sent to the server
		data,
		// accessToken, what else do you want me to say 🙂
		accessToken,
		// Action creators to dispatch on success
		onSuccess,
		// Action creators to dispatch on failure
		onFailure,
		// String representation of the network request
		label,
		// Network request headers
		headers
	} = action.payload;

	const dataOrParams = ["GET", "DELETE"].includes(method) ? "params" : "data";

	// axios default configs
	axios.defaults.baseURL = process.env.REACT_APP_BASE_URL || "";
	axios.defaults.headers.common["Content-Type"] = "application/json";
	axios.defaults.headers.common["Authorization"] = "Bearer some token";

	if (label) {
		dispatch(apiStart(label));
	}

	axios
		.request({
			url,
			method,
			headers,
			[dataOrParams]: data
		})
		.then(({ data }) => {
			dispatch(onSuccess(data));
		})
		.catch(error => {
			dispatch(apiError(error));
			dispatch(onFailure(error));

			if (error.response && error.response.status === 403) {
				dispatch(accessDenied(window.location.pathname));
			}
		})
		.finally(() => {
			if (label) {
				dispatch(apiEnd(label));
			}
		});
};

export default apiMiddleware;
