import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";
import { authReducer } from "./Auth/Reducer";
import { requestReducer } from "./Request/Reducer";

const rootReducers = combineReducers({
    auth :  authReducer,
    request : requestReducer


});

export const store = legacy_createStore(rootReducers , applyMiddleware(thunk))