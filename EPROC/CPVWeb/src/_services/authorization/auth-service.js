import history from "../../routing/history";
import axios from "axios";

const API_URL = process.env.REACT_APP_WEB_API_BASE + "/api/auth/";
const LOCAL_STORAGE_AUTH_USER_DATA = process.env.REACT_APP_AUTH_USER_DATA;

class AuthService {
	login(username, password) {
		return axios.post(API_URL + "signin", {
			username,
			password
		})
			.then(response => {
				if (response.data.accessToken) {
					localStorage.setItem(LOCAL_STORAGE_AUTH_USER_DATA, JSON.stringify(response.data));
				}

				return response.data;
			});
	}

	logout() {
		localStorage.removeItem(LOCAL_STORAGE_AUTH_USER_DATA);
	}

	logoutAndGoToLoginScreen() {
		this.logout();
		history.push('/sign-in')
	}

	register(username, email, password) {
		return axios.post(API_URL + "signup", {
			username,
			email,
			password
		});
	}

	validateTokenAndGetUser = (callback) => {
		const accessTokenFromLocalStorage = JSON.parse(localStorage.getItem(LOCAL_STORAGE_AUTH_USER_DATA))?.accessToken;
		if(accessTokenFromLocalStorage) {
			return axios.post(API_URL + "validate", {
				accessToken: accessTokenFromLocalStorage,
			}).then((response) => {
				response.data.accessToken = accessTokenFromLocalStorage;
				callback(response.data);
			}).catch((error) => {
				console.log("Error from token validation:", error);
				callback(null);
			});
		} else {
			callback(null);
		}
	};

	getCurrentUser() {
		const userFromStorage = JSON.parse(localStorage.getItem(LOCAL_STORAGE_AUTH_USER_DATA));
		if(typeof userFromStorage !== "undefined" && userFromStorage !== null && userFromStorage !== '') {
			return userFromStorage;
		} else {
			return null;
		}
	}
}

export default new AuthService();
