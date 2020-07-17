import React from "react";
import {useDispatch} from "react-redux";
import Car, {carBinder} from "../Objects/Car";
import {addCar} from "../redux/actions";
import {useFormik} from "formik";
import * as Yup from "yup";
export default function CarCreationForm() {
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            name: "",
            brand: "",
            mileage: ""
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .max(15, "Must be 15 characters or less")
                .min(2, "Must be 2 characters or more")
                .required('Required'),
            brand: Yup.string()
                .max(20, "Must be 20 characters or less")
                .min(3, "Must be 3 characters or more")
                .required('Required'),
            mileage: Yup.number()
                .positive("Your mileage is negative? Wow?!? Tell your secrets")
                .required('Required'),
        }),
        onSubmit: values => {
            const {name, brand, mileage} = values;
            const car = new Car(name, brand, mileage)
            formik.setValues({name: "", brand: "", mileage: ""});
            dispatch(addCar(car));
        }
    })

    return (
        <div className="car_creating_form border-secondary border-left border-bottom pl-3 pb-3 mb-2">
            {Object.keys(formik.initialValues).map((key, i) => {
                const binder = carBinder.inputFields;
                return (
                    <div className={"formik_input_container mb-2"} key={key + i}>
                        <div className="label_container">
                            {binder[key]["label"]}
                        </div>
                        <div className="input_container">
                            <input id={key} type={binder[key]["inputType"]}{...formik.getFieldProps(key)}/>
                        </div>
                        <div className="errors_container">
                            {formik.touched[key] && formik.errors[key] ? <div>{formik.errors[key]}</div> : null}
                        </div>
                    </div>
                );
            })}
            <button type={"submit"} className="btn btn-outline-primary mt-2" onClick={formik.handleSubmit}>
                Add car
            </button>
        </div>
    );
}