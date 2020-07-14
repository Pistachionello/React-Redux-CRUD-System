import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {editCarById} from "../redux/actions";
import Car, {carDependencies} from "../Objects/Car";
import {isEqual} from "lodash";

export default function EditableCar(props) {
    const dispatch = useDispatch();
    const {name, brand, mileage} = props.car
    const labels = Object.entries(carDependencies);
    const [formData, setFormData] = useState({
        name,
        brand,
        mileage
    });

    function handleDataChanges(event) {
        const fieldToChange = event.target.name;
        const textToChange = event.target.value;
        setFormData((prev) => {
            return (
                {...prev, [fieldToChange]: textToChange}
            )
        })
    }

    function handleConfirmButton() {
        const isValid = Object.values(formData).every((value) => {
            return !!value.trim();
        });

        const initialCar = {name, brand, mileage}

        if (isValid && !isEqual(initialCar, formData)) {
            const {name, brand, mileage} = formData;
            const car = new Car(name, brand, mileage);
            props.onEditCancel();
            dispatch(editCarById(props.id, car));
        } else if (isEqual(initialCar, formData)) {
            props.onEditCancel();
        }
    }

    return (
        <div className="car_editing_form border-secondary border-left border-bottom pl-3 pb-3 mb-3">
            {Object.entries(props.car).map(([key, value], i) => {
                return (
                    <div className="user_field mb-2" key={key + i}>
                        <div className="label mb-1">
                            {labels[i][1]}
                        </div>
                        <div className="value">
                            <input type="text"
                                   value={formData[key]}
                                   name={key}
                                   onChange={handleDataChanges}
                            />
                        </div>
                    </div>
                );
            })}
            <div className="buttons_container d-flex">
                <button className="btn btn-outline-success mr-2" onClick={handleConfirmButton}>Confirm</button>
                <button className="btn btn-outline-danger" onClick={() => props.onEditCancel()}>Cancel</button>
            </div>
        </div>
    );
}