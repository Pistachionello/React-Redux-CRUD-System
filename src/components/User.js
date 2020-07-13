import React from "react";

export default function User(props) {
    const {name, surname} = props.user;

    return (
        <div className="user_container">
            {name} {surname}
        </div>
    );
}