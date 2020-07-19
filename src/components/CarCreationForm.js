import React from "react";
import {useDispatch} from "react-redux";
import Car, {carBinder, validationSchema} from "../Objects/Car";
import {addCar} from "../redux/actions";
import FormikInputs from "./FormikInputs";
import FormikForm from "./FormikForm";

export default function CarCreationForm() {
    const dispatch = useDispatch();

    const initialValues = {
        name: "",
        brand: "",
        mileage: ""
    }
    const onSubmit = (values, {resetForm}) => {
        const {name, brand, mileage} = values;
        const car = new Car(name, brand, mileage)
        resetForm();
        dispatch(addCar(car));
    };

    return (
        <div className="car_creating_form border-secondary border-left border-bottom pl-3 pb-3 mb-2">
            <FormikForm
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                <FormikInputs binder={carBinder.inputFields}/>
                <button type={"submit"} className="btn btn-outline-primary mt-2">Add car</button>
            </FormikForm>
        </div>
    );
}