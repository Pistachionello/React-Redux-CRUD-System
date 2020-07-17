import React from "react";
import {useDispatch} from "react-redux";
import {editUserById} from "../redux/actions";
import User, {userBinder, validationSchema} from "../Objects/User";
import {isEqual} from "lodash";
import {useFormik} from "formik";
import FormikInputs from "./FormikInputs";

export default function UserEditingForm(props) {
    const dispatch = useDispatch();
    const {name, surname, age} = props.user;
    const formik = useFormik({
        initialValues: {
            name,
            surname,
            age
        },
        validationSchema,
        onSubmit: values => {
            const initialUser = {name, surname, age};

            if (!isEqual(initialUser, values)) {
                const {name, surname, age} = values;
                const user = new User(name, surname, age);
                props.onEditCancel();
                dispatch(editUserById(props.id, user));
            } else if (isEqual(initialUser, values)) {
                props.onEditCancel();
            }
        }
    })

    return (
        <div className="user_editing_form border-secondary border-left border-bottom pl-3 pb-3 mb-2">
            <FormikInputs formik={formik} binder={userBinder.inputFields}/>
            <div className="buttons_container d-flex">
                <button type={"submit"} className="btn btn-outline-success mr-2" onClick={formik.handleSubmit}>Confirm</button>
                <button className="btn btn-outline-danger" onClick={() => props.onEditCancel()}>Cancel</button>
            </div>
        </div>
    );
}