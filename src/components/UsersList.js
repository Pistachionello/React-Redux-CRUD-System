import React, {useState} from "react";

export function UsersList() {
    const [inCreate, setInCreate] = useState(false);

    const handleInCreate = () => {
        setInCreate(!inCreate);
    }

    const UserCreatingForm = () => {
        return (
            <div>
                Test FORM
            </div>
        );
    }
    return (
        <div className={"users_list mt-3"}>
            <div className="users_nav_bar d-flex">
                <button className="list_button" onClick={handleInCreate}>
                    Create user
                </button>
            </div>
            {inCreate ? <UserCreatingForm/> : ""}
            <div className="user_list_container">
                User List
            </div>
        </div>
    );
}