import * as actionTypes from "./types";

/**
 * @param user{User}
 * @returns {{payload: User, type: string}}
 */
export function addUser(user) {
    return {
        type: actionTypes.ADD_USER,
        payload: user
    };
}

export function deleteAllUsers() {
    return {
        type: actionTypes.DELETE_ALL_USERS,
    };
}