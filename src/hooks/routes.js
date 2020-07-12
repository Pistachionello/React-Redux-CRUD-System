import React from "react";
import {Switch, Route, Redirect} from "react-router-dom"
import {UserList} from "../components/UserList";
import {CarsList} from "../components/CarsList";

export const ROUTES = {
    USERSLIST: "/userslist",
    CARSLIST: "/carslist",
    DEFAULT: "/",
}

export function useRoutes() {
    return (
        <Switch>
            <Route path={ROUTES.USERSLIST} exact>
                <UserList/>
            </Route>
            <Route path={ROUTES.CARSLIST} exact>
                <CarsList/>
            </Route>
            <Redirect to={ROUTES.DEFAULT}/>
        </Switch>
    );
}