import * as actionTypes from "./types";

//--------------------------------------------------

export function addUser(user) {
    return {
        type: actionTypes.ADD_USER,
        payload: user
    };
}

export function removeUserById(id) {
    return {
        type: actionTypes.DELETE_USER_BY_ID,
        payload: id
    };
}

export function editUserById(id, changes) {
    return {
        type: actionTypes.EDIT_USER_BY_ID,
        payload: {id, changes}
    };
}

export function deleteAllUsers() {
    return {
        type: actionTypes.DELETE_ALL_USERS,
    };
}

function addCarToUser(userId, carId) {
    return {
        type: actionTypes.ADD_CAR_TO_USER,
        payload: {userId, carId}
    };
}

//--------------------------------------------------

export function addCar(car) {
    return {
        type: actionTypes.ADD_CAR,
        payload: car
    };
}

export function removeCarById(id) {
    return {
        type: actionTypes.DELETE_CAR_BY_ID,
        payload: id
    };
}

export function editCarById(id, changes) {
    return {
        type: actionTypes.EDIT_CAR_BY_ID,
        payload: {id, changes}
    };
}

export function deleteAllCars() {
    return {
        type: actionTypes.DELETE_ALL_CARS,
    };
}

function addCarOwner(carId, userId) {
    return {
        type: actionTypes.ADD_CAR_OWNER,
        payload: {carId, userId}
    };
}

//--------------------------------------------------

export function addCarAndOwner(userId, carId) {
    return (dispatch) => {
        dispatch(addCarToUser(userId, carId));
        dispatch(addCarOwner(carId, userId));
    }
}