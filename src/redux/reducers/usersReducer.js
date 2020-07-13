import * as actionTypes from "../types.js";
import User from "../../Objects/User"

let initialState = [
    new User("Henry", "Kavill"),
    new User("John", "Licro")
];

const usersList = JSON.parse(localStorage.getItem("usersList"));
if (usersList) {
    initialState = usersList;
}

export const usersReducer = (state = initialState, action) => {
    let newState;

    switch (action.type) {
        case actionTypes.DELETE_ALL_USERS:
            newState = [];
            localStorage.removeItem("usersList");
            return newState;

        case actionTypes.ADD_USER:
            const newUser = action.payload;
            newState = [...state, newUser];
            localStorage.setItem("usersList", JSON.stringify(newState));
            return newState;

        default:
            return state;
    }
}