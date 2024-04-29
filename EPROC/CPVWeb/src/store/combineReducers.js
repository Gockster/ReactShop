import { combineReducers } from "redux";
import deliberationSearchCriteriaReducer from "./deliberationSearchCriteriaStore/searchCriteriaReducer";
import deliberationPaginatedDataReducer from "./deliberationPaginatedDataStore/paginatedDataReducer";


/**
 * combining multiple reducers into a single reducer
 */
const rootReducer = combineReducers({

    deliberationSearchCriteriaReducer: deliberationSearchCriteriaReducer,
    deliberationPaginatedDataReducer: deliberationPaginatedDataReducer
});

export default rootReducer;
