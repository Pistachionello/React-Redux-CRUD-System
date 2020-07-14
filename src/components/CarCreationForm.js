import React, {useState} from "react";
import {useDispatch} from "react-redux";
import Car, {carBinder} from "../Objects/Car";
import {addCar} from "../redux/actions";

export default function CarCreationForm() {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        name: "",
        brand: "",
        mileage: ""
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

    function addCarToList() {
        const isValid = Object.values(formData).every((value) => {
            return !!value.trim();
        });

        if (isValid) {
            const {name, brand, mileage} = formData;
            const car = new Car(name, brand, mileage)
            setFormData({name: "", brand: "", mileage: ""})
            dispatch(addCar(car));
        }
    }

    return (
        <div className="car_creating_form border-secondary border-left border-bottom pl-3 pb-3 mb-2">
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
            <button className="btn btn-outline-primary mt-2" onClick={addCarToList}>Add car</button>
        </div>
    );
}