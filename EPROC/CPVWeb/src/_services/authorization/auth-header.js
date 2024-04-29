//service to implement token usage on request headers
const LOCAL_STORAGE_AUTH_USER_DATA = process.env.REACT_APP_AUTH_USER_DATA;

export default function authHeader() {
	const user = JSON.parse(localStorage.getItem(LOCAL_STORAGE_AUTH_USER_DATA));
	if (user && user.accessToken) {
		return { Authorization: 'Bearer ' + user.accessToken };
	} else return {};

}
