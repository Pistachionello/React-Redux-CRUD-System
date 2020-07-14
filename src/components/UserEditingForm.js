import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {editUserById} from "../redux/actions";
import User, {userBinder} from "../Objects/User";
import {isEqual} from "lodash";

export default function UserEditingForm(props) {
    const dispatch = useDispatch();
    const {name, surname, age} = props.user
    const [formData, setFormData] = useState({
        name,
        surname,
        age
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

        const initialUser = {name, surname, age};

        if (isValid && !isEqual(initialUser, formData)) {
            const {name, surname, age} = formData;
            const user = new User(name, surname, age);
            props.onEditCancel();
            dispatch(editUserById(props.id, user));
        } else if (isEqual(initialUser, formData)) {
            props.onEditCancel();
        }
    }

    return (
        <div className="user_editing_form border-secondary border-left border-bottom pl-3 pb-3 mb-3">
            {Object.entries(userBinder.inputFields).map(([key, value], i) => {
                const {label, inputType} = value;
                return (
                    <div className="form_item_container mb-2" key={key + i}>
                        <div className="label mb-1">
                            {label}
                        </div>
                        <div className="input_container">
                            <input
                                type={inputType}
                                name={key}
                                value={formData[key]}
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