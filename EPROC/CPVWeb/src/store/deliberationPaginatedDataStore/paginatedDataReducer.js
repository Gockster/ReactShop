import {
    UPDATE_PAGINATED_DATA_DELIBERATION,
    RESET_PAGINATED_DATA_DELIBERATION,
} from "./paginatedDataActionsTypes";

const initialState = {
    recordsData: {
        elements: null,
        currentPage: 0,
        totalPages: null,
        totalElements: null
    },
    pendingGettingRecords: false,
    errorGettingRecords: false,
    totalItemsPerPage: 10,
};

/**
 * help found here: https://dev.to/markusclaus/fetching-data-from-an-api-using-reactredux-55ao
 *
 * @param state
 * @param action
 * @return {{type: null, message: string}}
 */
const deliberationPaginatedDataReducer = (state = initialState, action) => {

    switch(action.type) {
        case UPDATE_PAGINATED_DATA_DELIBERATION: {
            return {
                ...state,
                ...action.payload,
            };
        }
        case RESET_PAGINATED_DATA_DELIBERATION:
            return initialState;
        default:
            return state;
    }
};

/**
 *  Those are called selectors.
 *  Selectors are used to get defined parts of the state.
 *  In small applications they are overkill.
 *  But if you scale your app and it gets more and more complex,
 *  it gets really messy if you change something within your state.
 *  With selectors you need to change the selector and everything works fine.
 */
export const getDeliberationPaginatedData = state => {
    return state.deliberationPaginatedDataReducer.recordsData;
};

export const getDeliberationPaginatedDataPending = state => {
    return state.deliberationPaginatedDataReducer.pendingGettingRecords;
};

export const getDeliberationPaginatedDataError = state => {
    return state.deliberationPaginatedDataReducer.errorGettingRecords;
};

export const getDeliberationPaginatedDataTotalItemsPerPage = state => {
    return state.deliberationPaginatedDataReducer.totalItemsPerPage;
};

export default deliberationPaginatedDataReducer;
