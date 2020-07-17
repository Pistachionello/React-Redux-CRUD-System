import React from "react";
import {useDispatch} from "react-redux";
import {editCarById} from "../redux/actions";
import Car, {carBinder, validationSchema} from "../Objects/Car";
import {isEqual} from "lodash";
import {useFormik} from "formik";
import FormikInputs from "./FormikInputs";

export default function CarEditingForm(props) {
    const dispatch = useDispatch();
    const {name, brand, mileage} = props.car
    const formik = useFormik({
        initialValues: {
            name,
            brand,
            mileage
        },
        validationSchema,
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
            <FormikInputs formik={formik} binder={carBinder.inputFields}/>
            <div className="buttons_container d-flex">
                <button type={"submit"} className="btn btn-outline-success mr-2" onClick={formik.handleSubmit}>Confirm</button>
                <button className="btn btn-outline-danger" onClick={() => props.onEditCancel()}>Cancel</button>
            </div>
        </div>
    );
}