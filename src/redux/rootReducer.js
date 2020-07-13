import {combineReducers} from "redux";
import {usersReducer} from "./reducers/usersReducer";
import {carsReducer} from "./reducers/carsReducer";

export const rootReducer = combineReducers({
    users: usersReducer,
    cars: carsReducer,
});
