import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {editCarById} from "../redux/actions";
import Car, {carBinder} from "../Objects/Car";
import {isEqual} from "lodash";

export default function CarEditingForm(props) {
    const dispatch = useDispatch();
    const {name, brand, mileage} = props.car
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
            {Object.entries(carBinder.inputFields).map(([key, value], i) => {
                const {label, inputType} = value;
                return (
                    <div key={key + i} className="form_item_container mb-2">
                        <div className="label mb-1">
                            {label}
                        </div>
                        <div className="input_container">
                            <input
                                type={inputType}
                                name={key}
                                value={formData[key]}
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