import {
    UPDATE_PAGINATED_DATA_DELIBERATION,
    RESET_PAGINATED_DATA_DELIBERATION,
} from "./paginatedDataActionsTypes";

export function updateDeliberationPaginatedData(paginatedData) {
    return {
        type: UPDATE_PAGINATED_DATA_DELIBERATION,
        payload: paginatedData
    }
}

export function resetDeliberationPaginatedData() {
    return {
        type: RESET_PAGINATED_DATA_DELIBERATION
    }
}