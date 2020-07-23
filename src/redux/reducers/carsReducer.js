import * as actionTypes from "../types.js";
import Car from "../../Objects/Car";

let initialState = [
    new Car("Some car name 1", "Some car brand 1", "400"),
    new Car("Some car name 2", "Some car brand 2", "200"),
];

const carsList = JSON.parse(localStorage.getItem("carsList"));
if (carsList.length) {
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
                    car.name = name;
                    car.brand = brand;
                    car.mileage = mileage;
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

        case actionTypes.DELETE_CAR_OWNER: {
            const {carId} = action.payload;
            const newState = state.map((car) => {
                if (car.idNumber === carId) {
                    car.userOwnerId = undefined;
                }
                return car;
            })
            localStorage.setItem("carsList", JSON.stringify(newState));

            return newState;
        }

        default:
            if (state.length) {
                localStorage.setItem("carsList", JSON.stringify(state));
            }
            return state;
    }
}