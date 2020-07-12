import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import {ROUTES} from "./routes";
import {UsersList} from "../components/UsersList";
import {CarsList} from "../components/CarsList";

export function useRoutes() {
    return (
        <Switch>
            <Route path={ROUTES.usersList}>
                <UsersList/>
            </Route>
            <Route path={ROUTES.carsList}>
                <CarsList/>
            </Route>
            <Redirect to={"/"}/>
        </Switch>
    );
}