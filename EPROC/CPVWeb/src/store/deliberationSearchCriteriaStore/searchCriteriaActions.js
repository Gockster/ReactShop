import {
    UPDATE_DELIBERATION_SEARCH_FILTER,
    RESET_DELIBERATION_SEARCH_FILTER,
} from "./searchCriteriaActionsTypes";

export function updateContractsSearchFilter(deliberationSearchFilter) {
    return {
        type: UPDATE_DELIBERATION_SEARCH_FILTER,
        payload: deliberationSearchFilter
    }
}

export function resetDeliberationSearchFilter() {
    return {
        type: RESET_DELIBERATION_SEARCH_FILTER,
    }
}
