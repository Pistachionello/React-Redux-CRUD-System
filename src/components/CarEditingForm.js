import React from "react";
import {useDispatch} from "react-redux";
import {editCarById} from "../redux/actions";
import Car, {carBinder, validationSchema} from "../Objects/Car";
import {isEqual} from "lodash";
import FormikInputs from "./FormikInputs";
import FormikForm from "./FormikForm";

export default function CarEditingForm({car, id, onEditCancel}) {
    const dispatch = useDispatch();

    const {name, brand, mileage} = car
    const initialValues = {
        name,
        brand,
        mileage
    };
    const onSubmit = values => {
        const initialCar = {name, brand, mileage};

        if (!isEqual(initialCar, values)) {
            const {name, brand, mileage} = values;
            const car = new Car(name, brand, mileage);
            onEditCancel();
            dispatch(editCarById(id, car));
        } else if (isEqual(initialCar, values)) {
            onEditCancel();
        }
    }

    return (
        <div className="user_editing_form border-secondary border-left border-bottom pl-3 pb-3 mb-2">
            <FormikForm
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                <FormikInputs binder={carBinder.inputFields}/>
                <div className="buttons_container d-flex">
                    <button type={"submit"} className="btn btn-outline-success mr-2">Confirm</button>
                    <button type={"button"} className="btn btn-outline-danger" onClick={() => onEditCancel()}>Cancel</button>
                </div>
            </FormikForm>

        </div>
    );
}