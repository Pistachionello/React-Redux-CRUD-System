import * as actionTypes from "./types";

export function addUser(name) {
    return {
        type: actionTypes.ADD_USER,
        payload: name
    };
}