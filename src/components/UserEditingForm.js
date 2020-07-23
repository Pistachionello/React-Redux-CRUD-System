import React from "react";
import {useDispatch} from "react-redux";
import {editUserById} from "../redux/actions";
import User, {userBinder, validationSchema} from "../Objects/User";
import {isEqual} from "lodash";
import FormikForm from "./FormikForm"
import FormikInputs from "./FormikInputs";

export default function UserEditingForm({user, id, onEditCancel = null, onEditConfirm = null}) {
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
            if (onEditConfirm) {
                onEditConfirm();
            }
            const {name, surname, age} = values;
            const user = new User(name, surname, age);
            onEditCancel();
            dispatch(editUserById(id, user));
        } else if (isEqual(initialUser, values)) {
            onEditCancel();
        }
    }

    return (
        <div className="user_editing_form pl-3 pb-3">
            <FormikForm
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                <div className="d-flex">
                    <FormikInputs binder={userBinder.inputFields}/>
                </div>
                <div className="buttons_container d-flex justify-content-end">
                    <button type={"submit"} className="btn btn-outline-success mr-2">
                        Confirm
                    </button>
                    <button type={"button"} className="btn btn-outline-danger mr-3" onClick={() => onEditCancel()}>
                        Cancel
                    </button>
                </div>
            </FormikForm>
        </div>
    );
}