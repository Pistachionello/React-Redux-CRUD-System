import React from "react";
import {useDispatch} from "react-redux";
import {addUser} from "../redux/actions";
import User, {userBinder, validationSchema} from "../Objects/User"
import FormikInputs from "./FormikInputs";
import FormikForm from "./FormikForm";

export default function UserCreationForm() {
    const dispatch = useDispatch();

    const initialValues = {
        name: "",
        surname: "",
        age: ""
    }
    const onSubmit = (values, {resetForm}) => {
        const {name, surname, age} = values;
        const user = new User(name, surname, age);
        resetForm();
        dispatch(addUser(user));
    }

    return (
        <div className="user_creating_form border-secondary border-left border-bottom pl-3 pb-3 mb-2">
            <FormikForm
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                <FormikInputs binder={userBinder.inputFields}/>
                <button type={"submit"} className="btn btn-outline-primary mt-2">
                    Create user
                </button>
            </FormikForm>
        </div>
    );
}