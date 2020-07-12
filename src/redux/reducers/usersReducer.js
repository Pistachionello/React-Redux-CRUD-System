import * as actionTypes from "../types.js";

let initialState = [
    {name: "John"},
    {name: "Killer"}
];
const usersList = JSON.parse(localStorage.getItem("usersList"));
if (usersList) {
    initialState = usersList;
}

export const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_USER:
            const newState = [...state, {name: action.payload}];
            localStorage.setItem("usersList", JSON.stringify(newState));
            return newState;
        default:
            return state;
    }
}