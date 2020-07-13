import React, {useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {deleteAllUsers} from "../redux/actions";
import User from "./User";
import {UserForm} from "./UserForm";

export function UsersList() {
    const dispatch = useDispatch();
    const users = useSelector(state => state.users);
    const [inCreate, setInCreate] = useState(false);

    return (
        <div className={"users_list mt-3"}>
            <div className="users_nav_bar d-flex">
                <button className="btn btn-outline-primary" onClick={() => setInCreate(!inCreate)}>
                    Add user to list
                </button>
                <button className="btn btn-outline-danger ml-auto" onClick={() => dispatch(deleteAllUsers())}>
                    Delete all users
                </button>
            </div>
            {inCreate && <UserForm/>}
            <div className="user_list_container">
                {users.length ? users.map((user, id) => {
                    return (
                        <User key={user + id} user={user}/>
                    )
                }) : (
                    <div>
                        There is no users. Create some mb? :)
                    </div>
                )}
            </div>
        </div>
    );
}