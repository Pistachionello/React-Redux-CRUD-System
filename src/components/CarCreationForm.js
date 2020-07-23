import React from "react";
import {useDispatch} from "react-redux";
import Car, {carBinder, validationSchema} from "../Objects/Car";
import {addCar} from "../redux/actions";
import FormikInputs from "./FormikInputs";
import FormikForm from "./FormikForm";

export default function CarCreationForm({onFormSubmit = null, onFormCancel = null}) {
    const dispatch = useDispatch();

    const initialValues = {
        name: "",
        brand: "",
        mileage: ""
    }
    const onSubmit = (values, {resetForm}) => {
        if (onFormSubmit) {
            onFormSubmit();
        }
        const {name, brand, mileage} = values;
        const car = new Car(name, brand, mileage)
        resetForm();
        dispatch(addCar(car));
    };

    return (
        <div className="car_creating_form pl-3 pb-3 mb-2">
            <div className="form_title font-weight-bold col-12">
                Car creation form
            </div>
            <FormikForm
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                <div className="d-flex">
                    <FormikInputs binder={carBinder.inputFields}/>
                </div>
                <div className="buttons_container mt-2 d-flex justify-content-end">
                    <button type={"submit"} className="btn btn-outline-primary mr-3">
                        Add car
                    </button>
                    <button type={"button"} className="btn btn-outline-danger" onClick={() => onFormCancel()}>
                        Close
                    </button>
                </div>
            </FormikForm>
        </div>
    );
}