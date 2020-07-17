import React from "react";
import {useDispatch} from "react-redux";
import {addUser} from "../redux/actions";
import User, {userBinder, validationSchema} from "../Objects/User"
import {useFormik} from "formik";
import FormikInputs from "./FormikInputs";

export default function UserCreationForm() {
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            name: "",
            surname: "",
            age: ""
        },
        validationSchema,
        onSubmit: values => {
            const {name, surname, age} = values;
            const user = new User(name, surname, age);
            formik.setValues({name: "", surname: "", age: ""});
            dispatch(addUser(user));
        }
    })

    return (
        <div className="user_creating_form border-secondary border-left border-bottom pl-3 pb-3 mb-2">
            <FormikInputs formik={formik} binder={userBinder.inputFields}/>
            <button type={"submit"} className="btn btn-outline-primary mt-2" onClick={formik.handleSubmit}>
                Create user
            </button>
        </div>
    );
}