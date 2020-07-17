import React from "react";
import {useDispatch} from "react-redux";
import {editCarById} from "../redux/actions";
import Car, {carBinder} from "../Objects/Car";
import {isEqual} from "lodash";
import {useFormik} from "formik";
import * as Yup from "yup";


export default function CarEditingForm(props) {
    const dispatch = useDispatch();
    const {name, brand, mileage} = props.car
    const formik = useFormik({
        initialValues: {
            name,
            brand,
            mileage
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
            const initialCar = {name, brand, mileage};

            if (!isEqual(initialCar, values)) {
                const {name, brand, mileage} = values;
                const car = new Car(name, brand, mileage);
                props.onEditCancel();
                dispatch(editCarById(props.id, car));
            } else if (isEqual(initialCar, values)) {
                props.onEditCancel();
            }
        }
    })

    return (
        <div className="user_editing_form border-secondary border-left border-bottom pl-3 pb-3 mb-2">
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
            <div className="buttons_container d-flex">
                <button type={"submit"} className="btn btn-outline-success mr-2" onClick={formik.handleSubmit}>Confirm</button>
                <button className="btn btn-outline-danger" onClick={() => props.onEditCancel()}>Cancel</button>
            </div>
        </div>
    );
}