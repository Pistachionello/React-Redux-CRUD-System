import React from "react";
import {useDispatch} from "react-redux";
import Car, {carBinder, validationSchema} from "../Objects/Car";
import {addCar} from "../redux/actions";
import {useFormik} from "formik";
import FormikInputs from "./FormikInputs";

export default function CarCreationForm() {
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            name: "",
            brand: "",
            mileage: ""
        },
        validationSchema,
        onSubmit: values => {
            const {name, brand, mileage} = values;
            const car = new Car(name, brand, mileage)
            formik.setValues({name: "", brand: "", mileage: ""});
            dispatch(addCar(car));
        }
    })

    return (
        <div className="car_creating_form border-secondary border-left border-bottom pl-3 pb-3 mb-2">
            <FormikInputs formik={formik} binder={carBinder.inputFields}/>
            <button type={"submit"} className="btn btn-outline-primary mt-2" onClick={formik.handleSubmit}>
                Add car
            </button>
        </div>
    );
}