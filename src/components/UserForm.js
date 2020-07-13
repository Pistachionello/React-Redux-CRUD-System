import React, {useState} from "react";
import User, {userDependencies} from "../Objects/User"
import {useDispatch} from "react-redux";
import {addUser} from "../redux/actions";

export function UserForm() {
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        name: "",
        surname: ""
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
            const {name, surname} = formData;
            const user = new User(name, surname)
            setFormData({name: "", surname: ""})
            dispatch(addUser(user));
        }
    }

    const labels = Object.values(userDependencies);
    return (
        <div className="user_creating_form">
            {Object.entries(formData).map(([key, value], i) => {
                return (
                    <div key={key + i} className="form_item_container">
                        {labels[i]}
                        <div className="input_container">
                            <input
                                type="text"
                                name={key}
                                value={value}
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