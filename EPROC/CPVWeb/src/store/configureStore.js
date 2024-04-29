import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from "./combineReducers";

const rootStore = createStore(rootReducer, applyMiddleware(thunk));
export default rootStore;
