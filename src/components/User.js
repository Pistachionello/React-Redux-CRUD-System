import React from "react";

export function User(props) {
    const {name, surname} = props.user;
    return (
        <div>
            {name} {surname}
        </div>
    );
}