import React from 'react';
// import {UserList} from "./components/UserList";

export function App() {
    return (
        <div className="container">
            <div className="title p-4 text-center text-white font-weight-bold bg-primary">
                React-Redux-CRUD-System
            </div>
            <div className="buttons_container">
                <button className="list_button mr-3">Users list</button>
                <button className="list_button list_button--colored">Cars list</button>
            </div>
        </div>
    );
}
