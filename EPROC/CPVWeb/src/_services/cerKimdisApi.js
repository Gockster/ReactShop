import axios from 'axios';
import { addNotificationService } from "../components/notificationComponent/NotificationsService";
import rootStore from "../store/configureStore";
import i18next from "../translations/i18nConfigInstance";
import { isoDateFormat } from "../utils/dateTimeUtils";

// Get current redux store state
const reduxStoreState = rootStore;

/**
 * Create Axios Instance to be used across Application Requests
 * @type {AxiosInstance}
 */
const cerKimdisApiAxiosInstance = axios.create({
	baseURL: process.env.REACT_APP_WEB_API_BASE
});

/**
 * Axios Request Interceptor
 * Add Axios Authorization Header for API Secured Routes
 */
cerKimdisApiAxiosInstance.interceptors.request.use(function (config) {

	if (process.env.NODE_ENV === 'development') {
		// In case of local/dev environment we pass a custom OAM_REMOTE_USER value so we can trick the backend
		config.headers[process.env.REACT_APP_OAM_REMOTE_USER] = "dummyOamUser";
		config.headers[process.env.REACT_APP_OAM_GROUPS] = "DELIBERATIONS";
	}

	return config;
}, function (error) {
	return Promise.reject(error);
});

/**
 * Axios Response Interceptor
 * Error Handling Interceptor showing Error Notification
 */
cerKimdisApiAxiosInstance.interceptors.response.use(function (response) {
	return response;
}, function (error) {

	const {
		config,
		response: {
			status
		}
	} = error; // Access the error object props
	const date = new Date();
	// Configuration of request that can be used eg: Retry functionality
	const originalRequestConfiguration = config;

	const notificationTitle = i18next.t("networking.networkError", { error, date });

	// Handle 401 Unauthorized Http Status by redirecting to LoginScreen and showing Notification
	if (status === 401) {
		addNotificationService(notificationTitle, i18next.t("networking.401HttpError", { error, date }), "danger");
		// AuthService.logoutAndGoToLoginScreen();
	} else if (status === 404) {
		addNotificationService(notificationTitle, i18next.t("networking.404HttpError", { error, date }), "danger");
	} else if (status >= 400 && status < 500) {
		addNotificationService(notificationTitle, i18next.t("networking.400RangeHttpError", { error, date }), "danger");
	} else if (status >= 500) {
		addNotificationService(notificationTitle, i18next.t("networking.500RangeHttpError", { error, date }), "danger");
	}
	// Return the error as promise in case any Axios instance is in need to handle error in a custom way
	return Promise.reject(error);
});

/**
 * Convert String Dates from Network Response onto Date Objects
 */
cerKimdisApiAxiosInstance.interceptors.response.use(originalResponse => {
	originalResponse.data = handleDates(originalResponse.data);
	return originalResponse;
});

/**
 * Check if String Date is valid date format against a regex
 * @param value
 * @returns {boolean}
 */
function isIsoDateString(value: any): boolean {
	if (value && typeof value === "string") {
		return isoDateFormat.test(value);
	}
}

/**
 * Recursively check Network Response Body for String Dates and converts them in Date Object
 * @param body
 * @returns {*}
 */
export function handleDates(body: any) {
	if (body === null || body === undefined || typeof body !== "object")
		return body;

	const xmlType = '<?xml';
	const bodyStringify = JSON.stringify(body);
	const containsXml = bodyStringify.includes(xmlType);

	if (!containsXml) {
		for (const key of Object.keys(body)) {
			const value = body[key];
			if (isIsoDateString(value)) body[key] = new Date(value);
			else if (typeof value === "object") handleDates(value);
		}
	}

	return body;
}

/**
 * Function retrying original axios request,
 * passed as callback function
 * @param originalRequestConfiguration
 */
function retryRequest(originalRequestConfiguration: any) {
	cerKimdisApiAxiosInstance(originalRequestConfiguration)
		.catch(error => {
			console.log("Retry Request error: " + error);
		});
}

//Later we might have an employer instance etc
export default cerKimdisApiAxiosInstance;
