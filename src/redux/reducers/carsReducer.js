import * as actionTypes from "../types.js";
import Car from "../../Objects/Car";

let initialState = [
    new Car("Some car name 1", "Some car brand 1", "400"),
    new Car("Some car name 2", "Some car brand 2", "200"),
];

const carsList = JSON.parse(localStorage.getItem("carsList"));
if (carsList) {
    initialState = carsList;
}

export const carsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_CAR: {
            const newCar = action.payload;
            const newState = [...state, newCar];
            localStorage.setItem("carsList", JSON.stringify(newState));
            return newState;
        }

        case actionTypes.DELETE_CAR_BY_ID: {
            const carIdToDelete = action.payload;
            const newState = state.filter((car, id) => id !== carIdToDelete);
            localStorage.setItem("carsList", JSON.stringify(newState));
            return newState;
        }

        case actionTypes.EDIT_CAR_BY_ID: {
            const {id, changes: {name, brand, mileage}} = action.payload;
            const newState = state.map((car, i) => {
                if (id === i) {
                    return new Car(name, brand, mileage);
                }
                return car;
            })
            localStorage.setItem("carsList", JSON.stringify(newState));
            return newState;
        }

        case actionTypes.DELETE_ALL_CARS: {
            localStorage.removeItem("carsList");
            return [];
        }

        case actionTypes.ADD_CAR_OWNER: {
            const {carId, userId} = action.payload;
            const newState = state.map((car) => {
                if (car.idNumber === carId) {
                    car.userOwnerId = userId;
                }
                return car;
            })
            localStorage.setItem("carsList", JSON.stringify(newState));

            return newState;
        }

        default:
            if (state) {
                localStorage.setItem("carsList", JSON.stringify(state));
            }
            return state;
    }
}