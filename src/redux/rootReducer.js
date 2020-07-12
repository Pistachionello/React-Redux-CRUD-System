import {combineReducers} from "redux";
import {usersReducer} from "./reducers/usersReducer";

export const rootReducer = combineReducers({
    users: usersReducer,
});
