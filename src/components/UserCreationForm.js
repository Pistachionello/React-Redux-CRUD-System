import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {addUser} from "../redux/actions";
import User, {userBinder} from "../Objects/User"

export default function UserCreationForm() {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        age: ""
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

    function addUserToList() {
        const isValid = Object.values(formData).every((value) => {
            return !!value.trim();
        });

        if (isValid) {
            const {name, surname, age} = formData;
            const user = new User(name, surname, age)
            setFormData({name: "", surname: "", age: ""})
            dispatch(addUser(user));
        }
    }

    return (
        <div className="user_creating_form border-secondary border-left border-bottom pl-3 pb-3 mb-2">
            {Object.entries(userBinder.inputFields).map(([key, value], i) => {
                const {label, inputType} = value;
                return (
                    <div key={key + i} className="form_item_container mb-2">
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
            <button className="btn btn-outline-primary mt-2" onClick={addUserToList}>Create user</button>
        </div>
    );
}