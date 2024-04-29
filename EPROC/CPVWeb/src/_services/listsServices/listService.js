import cerKimdisApiAxiosInstance from "../cerKimdisApi";

const urlPath = '/codeListValues';

const listService = {
	getPaginatedListOfValues: function (data) {
		if(data !== null) {
			if (!data.searchFilters) {
				data.searchFilters = {
					searchFilters: {

					}
				}
			}
		}

		return new Promise((resolve, reject) => {
			cerKimdisApiAxiosInstance.post(
				urlPath + "/" + data?.listId + "/" + data?.pageNumber + "/" + data?.pageSize,
				data.searchFilters
			)
				.then((response) => {
					const paginatedDataFromResp = response.data;
					const mappedResponse = {
						elements: paginatedDataFromResp?.content,
						currentPage: paginatedDataFromResp?.pageable?.pageNumber,
						totalPages: paginatedDataFromResp?.totalPages
					}
					resolve(mappedResponse);
				}).catch((error) => {
				reject(error);
			});
		});
	},
	findSingleByCodeAndCliKeyAndCliLang: function (data) {
		return new Promise((resolve, reject) => {
			cerKimdisApiAxiosInstance.get(
				urlPath + "/findSingleByCodeCliKeyAndLang/" + data?.listCode + "/" + data?.cliKey + "/" + data?.cliLang
			)
				.then((response) => {
					const mappedResponse = response.data;
					resolve(mappedResponse);
				}).catch((error) => {
				reject(error);
			});
		});
	},
	findSingleByCodeCliKeyAndPkeyAndCliLang: function (data) {
		return new Promise((resolve, reject) => {
			cerKimdisApiAxiosInstance.get(
				urlPath + "/findSingleByCodeCliKeyPkeyAndLang/" + data?.listCode + "/" + data?.cliKey + "/" + data?.cliPkey + "/" + data?.cliLang
			)
				.then((response) => {
					const mappedResponse = response.data;
					resolve(mappedResponse);
				}).catch((error) => {
				reject(error);
			});
		});
	}
}

export default listService;
