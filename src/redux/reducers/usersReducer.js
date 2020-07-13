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
    switch (action.type) {
        case actionTypes.ADD_USER:
        {
            const newUser = action.payload;
            const newState = [...state, newUser];
            localStorage.setItem("usersList", JSON.stringify(newState));
            return newState;
        }

        case actionTypes.DELETE_USER_BY_ID:
        {
            const userIdToDelete = action.payload;
            const newState = state.filter((user, id) => id !== userIdToDelete);
            localStorage.setItem("usersList", JSON.stringify(newState));
            return newState;
        }

        case actionTypes.DELETE_ALL_USERS:
        {
            localStorage.removeItem("usersList");
            return [];
        }

        default:
            return state;
    }
}