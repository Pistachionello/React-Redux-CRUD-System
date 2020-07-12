import React, {useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {addUser} from "../redux/actions";

export function UsersList() {
    const dispatch = useDispatch();
    const users = useSelector(state => state.users);

    const [inCreate, setInCreate] = useState(false);
    const [inputText, setInputText] = useState("");

    function handleEnterPress(event) {
        if (event.key === 'Enter') {
            return true;
        }
    }

    function addUserToList(event) {
        if (handleEnterPress(event) && inputText) {
            dispatch(addUser(inputText));
            setInputText("");
        }
    }

    return (
        <div className={"users_list mt-3"}>
            <div className="users_nav_bar d-flex">
                <button className="list_button" onClick={() => setInCreate(!inCreate)}>
                    Create user
                </button>
            </div>
            {inCreate &&
            (
                <div>
                    <input
                        type="text"
                        name={"user_name"}
                        value={inputText}
                        onChange={event => setInputText(event.target.value)}
                        onKeyPress={addUserToList}
                    />
                </div>
            )
            }
            <div className="user_list_container">
                {users.map((user, id) => {
                    return (
                        <div key={user + id}>
                            {user.name}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}