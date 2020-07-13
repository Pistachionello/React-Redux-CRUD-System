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
    switch (action.type) {
        case actionTypes.ADD_CAR:
        {
            const newCar = action.payload;
            const newState = [...state, newCar];
            localStorage.setItem("carsList", JSON.stringify(newState));
            return newState;
        }

        case actionTypes.DELETE_CAR_BY_ID:
        {
            const carIdToDelete = action.payload;
            const newState = state.filter((car, id) => id !== carIdToDelete);
            localStorage.setItem("carsList", JSON.stringify(newState));
            return newState;
        }

        case actionTypes.DELETE_ALL_CARS:
        {
            localStorage.removeItem("carsList");
            return [];
        }

        default:
            return state;
    }
}