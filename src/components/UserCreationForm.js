import React from "react";
import {useDispatch} from "react-redux";
import {addUser} from "../redux/actions";
import User, {userBinder, validationSchema} from "../Objects/User"
import FormikInputs from "./FormikInputs";
import FormikForm from "./FormikForm";

export default function UserCreationForm({onFormSubmit = null, onFormCancel = null}) {
    const dispatch = useDispatch();

    const initialValues = {
        name: "",
        surname: "",
        age: ""
    }
    const onSubmit = (values, {resetForm}) => {
        if (onFormSubmit) {
            onFormSubmit();
        }
        const {name, surname, age} = values;
        const user = new User(name, surname, age);
        resetForm();
        dispatch(addUser(user));
    }

    return (
        <div className="user_creating_form pl-3 pb-3 mb-2">
            <div className="form_title font-weight-bold col-12">
                User creation form
            </div>
            <FormikForm
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                <div className="d-flex">
                    <FormikInputs binder={userBinder.inputFields}/>
                </div>
                <div className="buttons_container mt-2 d-flex justify-content-end">
                    <button type={"submit"} className="btn btn-outline-primary mr-3">
                        Create user
                    </button>
                    <button type={"button"} className="btn btn-outline-danger" onClick={() => onFormCancel()}>
                        Close
                    </button>
                </div>
            </FormikForm>
        </div>
    );
}