import React, {useState} from "react";
import Car, {carDependencies} from "../Objects/Car";
import {useDispatch} from "react-redux";
import {addCar} from "../redux/actions";

export function CarForm() {
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

    const labels = Object.values(carDependencies);
    return (
        <div className="car_creating_form border-secondary border-left border-bottom pl-3 pb-3 mb-2">
            {Object.entries(formData).map(([key, value], i) => {
                return (
                    <div key={key + i} className="form_item_container">
                        {labels[i]}
                        <div className="input_container">
                            <input
                                type="text"
                                name={key}
                                value={value}
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