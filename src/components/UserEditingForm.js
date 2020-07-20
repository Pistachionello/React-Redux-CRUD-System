import React from "react";
import {useDispatch} from "react-redux";
import {editUserById} from "../redux/actions";
import User, {userBinder, validationSchema} from "../Objects/User";
import {isEqual} from "lodash";
import FormikForm from "./FormikForm"
import FormikInputs from "./FormikInputs";

export default function UserEditingForm({id, onEditCancel, user}) {
    const dispatch = useDispatch();

    const {name, surname, age} = user;

    const initialValues = {
        name,
        surname,
        age
    };
    const onSubmit = values => {
        const initialUser = {name, surname, age};
        if (!isEqual(initialUser, values)) {
            const {name, surname, age} = values;
            const user = new User(name, surname, age);
            onEditCancel();
            dispatch(editUserById(id, user));
        } else if (isEqual(initialUser, values)) {
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
                <FormikInputs binder={userBinder.inputFields}/>
                <div className="buttons_container d-flex">
                    <button type={"submit"} className="btn btn-outline-success mr-2">Confirm</button>
                    <button type={"button"} className="btn btn-outline-danger" onClick={() => onEditCancel()}>Cancel</button>
                </div>
            </FormikForm>
        </div>
    );
}