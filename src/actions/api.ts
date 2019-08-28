import { API, API_START, API_END, API_ERROR, ACCESS_DENIED } from "./types";

const { api_url } = process.env;

const expression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
export const urlRegex = new RegExp(expression);

// Api statuses
export const apiStart = (label: string) => ({
	type: API_START,
	payload: label
});

export const apiEnd = (label: string) => ({
	type: API_END,
	payload: label
});

export const accessDenied = (url: string) => ({
	type: ACCESS_DENIED,
	payload: {
		url
	}
});

export const apiError = (error: any) => ({
	type: API_ERROR,
	error
});

// Api action creator for avoiding to write the payload the payload every single time
export const apiAction = ({
	url = "",
	method = "GET",
	data = null,
	accessToken = null,
	onSuccess = () => {},
	onFailure = () => {},
	label = "",
	headersOverride = null
}: any) => {
	return {
		type: API,
		payload: {
			url: !!url && !url.match(urlRegex) ? api_url + url : url,
			method,
			data,
			accessToken,
			onSuccess,
			onFailure,
			label,
			headersOverride
		}
	};
};
