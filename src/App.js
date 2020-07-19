import React from 'react';
import {useHistory} from 'react-router-dom';
import {ROUTES} from "./routes/routes";
import {useRoutes} from "./routes/appRoutes";
import Button from '@material-ui/core/Button';

export function App() {
    const routes = useRoutes();
    const history = useHistory();

    function handleClick(url) {
        history.push(url);
    }

    return (
        <div className="app">
            <div className="title-bg p-2 bg-primary">
                <div className="title container text-white font-weight-bold">
                    React-Redux-CRUD-System
                </div>
            </div>
            <div className="container">
                <div className="app_buttons_tab">

                </div>
                <div className="app_buttons_container d-flex">
                    <Button className="list_button mr-3" variant="outlined" color="primary"
                            onClick={() => handleClick(ROUTES.usersList)}
                    >
                        Users list
                    </Button>
                    <Button className="list_button" variant="outlined" color="primary"
                            onClick={() => handleClick(ROUTES.carsList)}
                    >
                        Cars list
                    </Button>
                    <Button className="list_button ml-auto" variant="outlined" color="secondary"
                            onClick={() => handleClick(ROUTES.DEFAULT)}
                    >
                        Close
                    </Button>
                </div>
                <div className="current_list">
                    {routes}
                </div>
            </div>
        </div>
    );
}
