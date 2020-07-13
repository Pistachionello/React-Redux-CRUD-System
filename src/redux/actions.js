import * as actionTypes from "./types";

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

export function addCar(car) {
    return {
        type: actionTypes.ADD_CAR,
        payload: car
    };
}

export function deleteAllCars() {
    return {
        type: actionTypes.DELETE_ALL_CARS,
    };
}