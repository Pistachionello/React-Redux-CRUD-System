import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {editUserById} from "../redux/actions";
import User, {userDependencies} from "../Objects/User";
import {isEqual} from "lodash";

export default function EditableUser(props) {
    const dispatch = useDispatch();
    const {name, surname} = props.user
    const labels = Object.entries(userDependencies);
    const [formData, setFormData] = useState({
        name,
        surname
    });

    function handleDataChanges(event) {
        const fieldToChange = event.target.name;
        const textToChange = event.target.value;
        setFormData((prev) => {
            return (
                {...prev, [fieldToChange]: textToChange}
            )
        })
    }

    function handleConfirmButton() {
        const isValid = Object.values(formData).every((value) => {
            return !!value.trim();
        });

        const initialUser = {name, surname}

        if (isValid && !isEqual(initialUser, formData)) {
            const {name, surname} = formData;
            const user = new User(name, surname);
            props.onEditCancel();
            dispatch(editUserById(props.id, user));
        } else if (isEqual(initialUser, formData)) {
            props.onEditCancel();
        }
    }

    return (
        <div className="user_editing_form border-secondary border-left border-bottom pl-3 pb-3 mb-2">
            {Object.entries(props.user).map(([key, value], i) => {
                return (
                    <div className="user_field mb-2" key={key + i}>
                        <div className="label mb-1">
                            {labels[i][1]}
                        </div>
                        <div className="value">
                            <input type="text"
                                   value={formData[key]}
                                   name={key}
                                   onChange={handleDataChanges}
                            />
                        </div>
                    </div>
                );
            })}
            <div className="buttons_container d-flex">
                <button className="btn btn-outline-success mr-2" onClick={handleConfirmButton}>Confirm</button>
                <button className="btn btn-outline-danger" onClick={() => props.onEditCancel()}>Cancel</button>
            </div>
        </div>
    );
}