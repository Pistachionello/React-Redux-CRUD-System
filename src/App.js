import React from 'react';
import {BrowserRouter as Router, Link} from 'react-router-dom';
import {ROUTES} from "./routes/routes";
import {useRoutes} from "./routes/appRoutes";

export function App() {
    const routes = useRoutes();

    return (
        <Router>
            <div className="app container">
                <div className="title p-4 text-center text-white font-weight-bold bg-primary">
                    React-Redux-CRUD-System
                </div>
                <div className="app_buttons_container d-flex">
                    <Link className="list_button mr-3" to={ROUTES.usersList}>Users list</Link>
                    <Link className="list_button" to={ROUTES.carsList}>Cars list</Link>
                    <Link className="list_button ml-auto" to={ROUTES.DEFAULT}>Close</Link>
                </div>
                <div className="current_list">
                    {routes}
                </div>
            </div>
        </Router>
    );
}
