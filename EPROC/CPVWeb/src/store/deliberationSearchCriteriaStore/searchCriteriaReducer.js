import {
    UPDATE_DELIBERATION_SEARCH_FILTER,
    RESET_DELIBERATION_SEARCH_FILTER,
} from "./searchCriteriaActionsTypes";

const initialState = {
    title: '',
    descriptionInCPVSTerms: null,
    uniquePublicationId: '',
    organization: null,
    signatory: null,
    publicationDateFrom: null,
    publicationDateTo: null,
    totalCostWithoutVatFrom: null,
    totalCostWithoutVatTo: null,
    companyVatNumber: '',
    companyName: ''
};

/**
 * help found here: https://dev.to/markusclaus/fetching-data-from-an-api-using-reactredux-55ao
 *
 * @param state
 * @param action
 * @return {{type: null, message: string}}
 */
const deliberationSearchCriteriaReducer = (state = initialState, action) => {
    switch(action.type) {
        case UPDATE_DELIBERATION_SEARCH_FILTER:
            return action.payload;
        case RESET_DELIBERATION_SEARCH_FILTER:
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
export const getDeliberationSearchFilters = state => {
    return state.deliberationSearchCriteriaReducer;
};

export default deliberationSearchCriteriaReducer;
