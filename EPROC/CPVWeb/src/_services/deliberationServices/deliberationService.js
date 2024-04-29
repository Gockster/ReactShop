import cerKimdisApiAxiosInstance from "../cerKimdisApi";
const urlPath = "/deliberation";
const urlPath2 = "/deliberationComment";

const deliberationService = {

    getSingle: function (id) {
        return new Promise((resolve, reject) => {
            cerKimdisApiAxiosInstance.get(urlPath + "/" + id)
                .then((res) => {
                    const mappedResponse = res.data;
                    resolve(mappedResponse);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
    update: function (deliberationData) {
        return new Promise((resolve, reject) => {

            cerKimdisApiAxiosInstance.put(
                urlPath + "/update",
                deliberationData
            )
                .then((res) => {
                    const mappedResponse = res.data;
                    resolve(mappedResponse);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
    create: function (deliberationData) {
        return new Promise((resolve, reject) => {
            cerKimdisApiAxiosInstance.post(
                urlPath,
                deliberationData
            )
                .then((res) => {
                    const mappedResponse = res.data;
                    resolve(mappedResponse);
                })
                .catch((error) => {

                    reject(error);
                });
        });
    },
    getDeliberationComList: function (id) {
        return new Promise((resolve, reject) => {
            cerKimdisApiAxiosInstance.get(urlPath2 + "/deliberation/" + id)
                .then((res) => {
                    const mappedResponse = res.data;
                    resolve(mappedResponse);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
    DeliberationComments: function (commentFormData, deliberationId) {
        return new Promise((resolve, reject) => {
            cerKimdisApiAxiosInstance.post('/deliberationComment/createComment', {
                comName: commentFormData.comName,
                comEmail: commentFormData.comEmail,
                comTitle: commentFormData.comTitle,
                comComment: commentFormData.comComment,
                deliberation: Number(deliberationId),
                // captcha_key: this.state.commentFormData.captcha_key
            }, {
                headers: { 'Content-Type': 'application/json' }
            })
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                })
        });
    },

    updateComments: function (commentId, statusIsRejected) {
        return new Promise((resolve, reject) => {
            cerKimdisApiAxiosInstance.put(
                urlPath2 + "/updateComment" + "/" + commentId + "/" + statusIsRejected
            )
                .then((res) => {
                    const mappedResponse = res.data;
                    resolve(mappedResponse);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },

    /*
    *   
    interface Paginatin{
        page,
        size
    }

    interface SearchFormData{
        referenceNumber,
        dateFrom,
        dateTill,
        title
    }
    
    */
    DeliberationList: function (searchFormData, pageNumber, pageSize) {
        deliberationService.paginationStorage.save(pageNumber, pageSize, searchFormData.title, searchFormData.referenceNumber, searchFormData.dateTill, searchFormData.dateFrom);
        if (this.deliberationListStorage.isCached(searchFormData, pageNumber, pageSize) !== false)
            return new Promise((resolve, reject) => {
                resolve(this.deliberationListStorage.cache.data);
            });
        return new Promise((resolve, reject) => {
            cerKimdisApiAxiosInstance.post("/deliberation/search", {
                page: pageNumber || 0,
                size: pageSize,
                referenceNumber: searchFormData?.referenceNumber,
                dateFrom: searchFormData?.dateFrom,
                dateTill: searchFormData?.dateTill,
                title: searchFormData?.title,
            }, {
                headers: { "Content-Type": "application/json;" }
            })
                .then((response) => {
                    deliberationService.deliberationListStorage.cacheData(searchFormData, pageNumber, pageSize, response);
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);

                })
        });
    },
    DescriptionFormDeliberation: function (descriptionFormData) {
        return new Promise((resolve, reject) => {
            cerKimdisApiAxiosInstance.post('/deliberation/create', {
                title: descriptionFormData.title,
                endDate: descriptionFormData.endDate,
                description: descriptionFormData.description
            }, {
                headers: { 'Content-Type': 'application/json' }
            })
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                })
        });
    },
    uploadFile: function (formData) {
        return new Promise((resolve, reject) => {
            cerKimdisApiAxiosInstance.post('/file/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            })
                .then((response) => {
                    resolve(response);

                })
                .catch((error) => {
                    reject(error);
                })
        });
    },


    paginationStorage: {
        cache: null,
        getReturning() {
            if (deliberationService.paginationStorage.cache == null)
                return false;
            return deliberationService.paginationStorage.cache.isReturing;
        },
        setReturning(isReturing) {
            if (deliberationService.paginationStorage.cache == null)
                deliberationService.paginationStorage.cache = {};
            deliberationService.paginationStorage.cache.isReturing = isReturing;
            localStorage.setItem("paginationStorage", JSON.stringify(deliberationService.paginationStorage.cache));
        },
        save: function (page, size, title, rf, dateTill, dateFrom, isReturning = false) {
            deliberationService.paginationStorage.cache = {};
            deliberationService.paginationStorage.cache.page = page;
            deliberationService.paginationStorage.cache.size = size;
            deliberationService.paginationStorage.cache.title = title;
            deliberationService.paginationStorage.cache.rf = rf;
            deliberationService.paginationStorage.cache.dateTill = dateTill;
            deliberationService.paginationStorage.cache.dateFrom = dateFrom;
            deliberationService.paginationStorage.cache.isReturing = isReturning;
            localStorage.setItem("paginationStorage", JSON.stringify(deliberationService.paginationStorage.cache));
        },
        load: function () {
            const paginationStorage = localStorage.getItem("paginationStorage");
            if (paginationStorage)
                deliberationService.paginationStorage.cache = JSON.parse(paginationStorage);
            else
                deliberationService.paginationStorage.save(0, 10);
            return deliberationService.paginationStorage.cache;
        },
        get: function () {
            if (deliberationService.paginationStorage.cache == null)
                deliberationService.paginationStorage.load();
            return deliberationService.paginationStorage.cache;
        }

    },

    deliberationListStorage: {
        cache: null,

        isCached: function (searchFormData, pageNumber, pageSize) {
            if (deliberationService.deliberationListStorage.cache == null)
                return false;
            if (deliberationService.deliberationListStorage.cache.searchFormData.referenceNumber != searchFormData.referenceNumber)
                return false;
            if (deliberationService.deliberationListStorage.cache.searchFormData.dateFrom != searchFormData.dateFrom)
                return false;
            if (deliberationService.deliberationListStorage.cache.searchFormData.dateTill != searchFormData.dateTill)
                return false;
            if (deliberationService.deliberationListStorage.cache.searchFormData.title != searchFormData.title)
                return false;
            if (deliberationService.deliberationListStorage.cache.pageNumber != pageNumber)
                return false;
            if (deliberationService.deliberationListStorage.cache.pageSize != pageSize)
                return false;
            return deliberationService.deliberationListStorage.cache.data;

        },
        cacheData: function (searchFormData, pageNumber, pageSize, data) {
            deliberationService.deliberationListStorage.cache = {};
            deliberationService.deliberationListStorage.cache.searchFormData = searchFormData;
            deliberationService.deliberationListStorage.cache.pageNumber = pageNumber;
            deliberationService.deliberationListStorage.cache.pageSize = pageSize;
            deliberationService.deliberationListStorage.cache.data = data;
        }
    }

}

export default deliberationService;
