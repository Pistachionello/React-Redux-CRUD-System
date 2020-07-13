import * as actionTypes from "../types.js";
import Car from "../../Objects/Car";

let initialState = [
    new Car("Some car name 1", "Some car brand 1", "Some car mileage 1"),
    new Car("Some car name 2", "Some car brand 2", "Some car mileage 2"),
];

const carsList = JSON.parse(localStorage.getItem("carsList"));
if (carsList) {
    initialState = carsList;
}

export const carsReducer = (state = initialState, action) => {
    let newState;

    switch (action.type) {
        case actionTypes.DELETE_ALL_CARS:
            newState = [];
            localStorage.removeItem("carsList");
            return newState;

        case actionTypes.ADD_CAR:
            const newCar = action.payload;
            newState = [...state, newCar];
            localStorage.setItem("carsList", JSON.stringify(newState));
            return newState;

        default:
            return state;
    }
}