import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk, {ThunkMiddleware} from "redux-thunk";
import { allActionTypes } from "./consts";
import { moviesReducer } from "./redusers";

const rootReducer = combineReducers({
  moviesReducer
});

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer, applyMiddleware(thunk as ThunkMiddleware<RootState, allActionTypes>));

export default store;