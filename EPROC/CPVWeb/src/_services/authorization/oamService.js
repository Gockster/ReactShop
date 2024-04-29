import cerKimdisApiAxiosInstance from "../cerKimdisApi";
const API_URL = process.env.REACT_APP_WEB_API_BASE;

class OamService {

	validateOamRemoteUser = () => {
		return new Promise((resolve, reject) => {
		cerKimdisApiAxiosInstance.get(API_URL + "/deliberation/checkOam")
				.then((res) => {
				 	const mappedResponse = res.data;
				 	resolve(mappedResponse);
				})
				 .catch((error) => {
				 	reject(error);
	 		});
		});
	};

}

export default new OamService();
